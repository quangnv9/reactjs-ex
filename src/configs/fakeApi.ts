import { DATA } from 'utils/constants';

const getAll = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DATA);
    }, 500);
  });
};

export default {
  getAll,
};
