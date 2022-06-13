import { API_PATHS } from 'configs/api';
import { ROUTES } from 'configs/routes';
import { replace } from 'connected-react-router';
import logo from 'logo-420-x-108.png';
import { ISignUpParams } from 'models/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { fetchThunk } from '../../../../common/redux/thunk';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './styles.scss';

interface Props {}

const SignUpPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [location, setLocation] = useState([]);

  const getLocation = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));
    setLoading(false);
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocation(json.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const onSignUp = React.useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        alert('Chúc mừng bạn đã đăng ký thành công');
        dispatch(replace(ROUTES.login));
      }
      setErrorMessage(json.message);
    },

    [dispatch]
  );
  return (
    <div className="container">
      <img src={logo} alt="" />

      <SignUpForm
        getLocation={getLocation}
        location={location}
        onSignUp={onSignUp}
        loading={loading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default SignUpPage;
