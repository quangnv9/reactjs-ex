import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearData,
  fromChange,
  invoiceChange,
  statusChange,
  toChange,
} from '../redux/payrollReducer';
import './styles.scss';

interface Props {}

const Filters = (props: Props) => {
  const dispatch = useDispatch();

  const [statusSelect, setStatusSelect] = useState('');
  const [searchText, setSearchText] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleStatusChange = (value: string) => {
    dispatch(statusChange(value));
    setStatusSelect(value);
  };

  const handleInvoiceChange = (invoice: string) => {
    dispatch(invoiceChange(invoice));
    setSearchText(invoice);
  };
  const handleFromChange = (from: string) => {
    dispatch(fromChange(from));
    setFromTime(from);
  };
  const handleToChange = (to: string) => {
    dispatch(toChange(to));
    setToTime(to);
  };
  const handleClickClear = () => {
    dispatch(
      clearData({
        status: 'default',
        from: '',
        to: '',
        invoice: '',
      })
    );
    setStatusSelect('default');
    setSearchText('');
    setFromTime('');
    setToTime('');
  };

  return (
    <div className="filters">
      <select value={statusSelect} onChange={(e: any) => handleStatusChange(e.target.value)}>
        <option value="default">Status</option>
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
        <option value="None">None</option>
        <option value="fail">Fail</option>
      </select>
      <input
        value={fromTime}
        type="date"
        onChange={(e: any) => {
          handleFromChange(e.target.value);
        }}
      />
      <input
        value={toTime}
        type="date"
        onChange={(e: any) => {
          handleToChange(e.target.value);
        }}
      />
      <input
        value={searchText}
        type="text"
        placeholder="Invoice"
        onChange={(e: any) => handleInvoiceChange(e.target.value)}
      />
      <button>Apply</button>
      <button onClick={handleClickClear}>Clear</button>
    </div>
  );
};

export default Filters;
