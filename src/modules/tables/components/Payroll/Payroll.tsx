import { InfoPayroll } from 'models/payroll';
import moment from 'moment';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/payrollReducer';
import './styles.scss';

interface Props {
  payroll: InfoPayroll;
}

const Payroll = (props: Props) => {
  const { payroll } = props;

  const dispatch = useDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <div className="table-data">{payroll.async_status}</div>
      <div className="table-data">{moment(payroll.time_created).format('ll')}</div>
      <div className="table-data">{payroll.currency}</div>
      <div className="table-data">{payroll.volume_input_in_input_currency}</div>
      <div className="table-data">{payroll.payroll_id}</div>
      <div className="table-data">
        <button>Show detail</button>
      </div>
      <div className="table-data" onClick={() => handleRemoveItem(payroll.payroll_id)}>
        <FiTrash2 />
      </div>
    </>
  );
};

export default Payroll;
