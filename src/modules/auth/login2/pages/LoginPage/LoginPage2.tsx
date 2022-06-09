import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../configs/api';
import { ROUTES } from '../../../../../configs/routes';
import logo from '../../../../../logo-420-x-108.png';
import { ILoginParams } from '../../../../../models/auth';
import { AppState } from '../../../../../redux/reducer';
import { getErrorMessageResponse } from '../../../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../utils/httpResponseCode';
import { fetchThunk } from '../../../../common/redux/thunk';
import { setUserInfo } from '../../../redux/authReducer';
import LoginForm2 from '../../components/LoginForm2/LoginForm2';
import './styles.scss';

const LoginPage2 = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password })
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {
          expires: values.rememberMe ? 7 : undefined,
        });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch]
  );

  return (
    <div className="container">
      <img src={logo} alt="" />

      <LoginForm2 onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage2;
