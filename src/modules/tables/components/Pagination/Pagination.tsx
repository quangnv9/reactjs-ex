import React, { useRef } from 'react';
import { LIMIT } from 'utils/constants';
import './styles.scss';

interface Props {
  totalItem: number;
  onChange: any;
}

const Pagination = (props: Props) => {
  const { totalItem, onChange } = props;

  const totalPage = Math.ceil(totalItem / LIMIT);
  const numbers = [];
  const liElement = document.querySelectorAll('li');

  for (let i = 1; i <= totalPage; i++) {
    numbers.push(i);
  }
  const handleClickPage = (e: any, page: number) => {
    for (let i = 0; i <= numbers.length; i++) {
      liElement[i].classList.remove('active');
    }
    e.target.classList.add('active');
    if (onChange) onChange(page);
  };

  return (
    <div>
      <ul className="pagination">
        <li>&laquo;</li>
        {numbers.map((number) => {
          return (
            <li key={number} onClick={(e) => handleClickPage(e, number)}>
              {number}
            </li>
          );
        })}
        <li>&raquo;</li>
      </ul>
    </div>
  );
};

export default Pagination;
