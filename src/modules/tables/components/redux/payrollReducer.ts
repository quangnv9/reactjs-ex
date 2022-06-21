import { InfoPayroll } from 'models/payroll';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface PayrollState {
  payrollList: InfoPayroll[];
  filters: {
    status: string;
    from: string;
    to: string;
    invoice: string;
  };
}

export const getPayrollList = createCustomAction(
  'payroll/getPayrollList',
  (data: InfoPayroll[]) => ({
    data,
  })
);
export const statusChange = createCustomAction('payroll/statusChange', (data: string) => ({
  data,
}));
export const invoiceChange = createCustomAction('payroll/invoiceChange', (data: string) => ({
  data,
}));
export const fromChange = createCustomAction('payroll/fromChange', (data: string) => ({
  data,
}));
export const toChange = createCustomAction('payroll/toChange', (data: string) => ({
  data,
}));
export const clearData = createCustomAction('payroll/clearData', (data: {}) => ({
  data,
}));
export const removeItem = createCustomAction('payroll/removeItem', (data: string) => ({
  data,
}));

const actions = {
  getPayrollList,
  statusChange,
  invoiceChange,
  fromChange,
  toChange,
  clearData,
  removeItem,
};

type Action = ActionType<typeof actions>;

export default function payrollReducer(
  state: PayrollState = {
    payrollList: [],
    filters: {
      status: '',
      from: '',
      to: '',
      invoice: '',
    },
  },

  action: Action
) {
  switch (action.type) {
    case getType(getPayrollList): {
      return {
        ...state,
        payrollList: action.data,
        filters: {
          status: 'default',
          from: '',
          to: '',
          invoice: '',
        },
      };
    }
    case getType(statusChange): {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.data,
        },
      };
    }
    case getType(invoiceChange): {
      return {
        ...state,
        filters: {
          ...state.filters,
          invoice: action.data,
        },
      };
    }
    case getType(fromChange): {
      if (action.data) {
        return {
          ...state,
          filters: {
            ...state.filters,
            from: action.data,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case getType(toChange): {
      if (action.data) {
        return {
          ...state,
          filters: {
            ...state.filters,
            to: action.data,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case getType(clearData): {
      return {
        ...state,
        filters: {
          ...action.data,
          status: 'default',
        },
      };
    }
    case getType(removeItem): {
      const newPayrollList = state.payrollList.filter((item) => {
        return item.payroll_id !== action.data;
      });
      return {
        ...state,
        payrollList: newPayrollList,
      };
    }
    default:
      return state;
  }
}
