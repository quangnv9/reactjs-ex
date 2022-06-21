import fakeApi from 'configs/fakeApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './components/Filters/Filters';
import { getPayrollList } from './components/redux/payrollReducer';
import { InfoPayroll } from 'models/payroll';
import './styles.scss';
import { AppState } from 'redux/reducer';
import Payroll from './components/Payroll/Payroll';
import moment from 'moment';
import Pagination from './components/Pagination/Pagination';
import { CURRENPAGE, LIMIT, START } from 'utils/constants';

interface Props {}

const TableModule = (props: Props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const getPayroll = async () => {
    try {
      const response = await fakeApi.getAll();
      if (Array.isArray(response)) {
        dispatch(getPayrollList(response as InfoPayroll[]));
        setPage(1);
      }
    } catch (error) {
      console.log('Faild to fetch api: ', error);
    }
  };

  useEffect(() => {
    getPayroll();
  }, []);

  const statusChange = useSelector((state: AppState) => {
    return state.payroll.filters.status;
  });
  const invoiceChange = useSelector((state: AppState) => {
    return state.payroll.filters.invoice;
  });
  const fromTime = useSelector((state: AppState) => {
    return moment(state.payroll.filters.from).unix();
  });
  const toTime = useSelector((state: AppState) => {
    return moment(state.payroll.filters.to).unix();
  });

  const payrollList = useSelector((state: AppState) => {
    const payrollFilters = state.payroll.payrollList.filter((filter) => {
      const time = moment(filter.time_created).unix();
      if (fromTime && toTime) {
        if (state.payroll.filters.status !== 'default') {
          return (
            filter.async_status === statusChange &&
            filter.payroll_id.includes(invoiceChange) &&
            time >= fromTime &&
            time <= toTime
          );
        } else {
          return (
            state.payroll.payrollList &&
            filter.payroll_id.includes(invoiceChange) &&
            time >= fromTime &&
            time <= toTime
          );
        }
      } else {
        if (state.payroll.filters.status !== 'default') {
          return filter.async_status === statusChange && filter.payroll_id.includes(invoiceChange);
        } else {
          return state.payroll.payrollList && filter.payroll_id.includes(invoiceChange);
        }
      }
    });
    return payrollFilters;
    // return state.payroll.payrollList;
  });

  console.log(payrollList);

  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };
  const totalItem = payrollList.length;

  return (
    <div className="container">
      <div className="table">
        <Filters />
        <div className="table-header">
          <div className="header__item">Status</div>
          <div className="header__item">Date</div>
          <div className="header__item">Currency</div>
          <div className="header__item">Tatal</div>
          <div className="header__item">Invoice#</div>
          <div className="header__item"></div>
          <div className="header__item"></div>
        </div>
        <div className="table-content">
          {payrollList.map((payroll, index) => {
            if (index >= (page - 1) * LIMIT && index < page * LIMIT) {
              return (
                <div className="table-row" key={index}>
                  <Payroll payroll={payroll} />
                </div>
              );
            }
          })}
        </div>
        <Pagination totalItem={totalItem} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default TableModule;
