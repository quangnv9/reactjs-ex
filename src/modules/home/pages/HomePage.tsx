import { ROUTES } from 'configs/routes';
import TodoModule from 'modules/photos';
import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <Link to={ROUTES.photo}>
        <FormattedMessage id="photo" />
      </Link>
    </div>
  );
};

export default HomePage;
