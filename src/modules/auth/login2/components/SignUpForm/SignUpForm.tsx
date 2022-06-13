import { Form, Formik } from 'formik';
import { ILocationParams, ISignUpParams } from 'models/auth';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { GENDER_OPTIONS, STATE_OPTIONS } from 'utils/constants';
import * as yup from 'yup';

import InputField from 'modules/common/FormField/InputField/InputField';
import PasswordField from 'modules/common/FormField/PasswordField/PasswordField';
import './styles.scss';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import SelectField from 'modules/common/FormField/SelectField/SelectField';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  location: ILocationParams[];
  getLocation: any;
}

const SignUpForm = (props: Props) => {
  const { onSignUp, loading, errorMessage, location, getLocation } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [province, setProvince] = useState([]);

  const LoginValidation = yup.object().shape({
    email: yup.string().email('emailInvalid').required('emailRequire'),
    password: yup
      .string()
      .min(6, 'minPasswordInvalid')
      .max(50, 'maxPasswordInvalid')
      .required('passwordRequire'),
    repeatPassword: yup
      .string()
      .required('repeatPasswordRequire')
      .oneOf([yup.ref('password')], 'repeatPasswordInvalid'),
    name: yup.string().required('nameRequire'),
    gender: yup.string().required('genderRequire'),
    region: yup.number().required('regionRequire'),
    state: yup.number().required('stateRequire'),
  });

  const getProvince = useCallback(async (pid: number) => {
    const json = await dispatch(fetchThunk(`${API_PATHS.getLocation}/?pid=${pid}`, 'get'));
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setProvince(json.data);
    }
  }, []);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: '',
      }}
      validationSchema={LoginValidation}
      onSubmit={(values) => {
        onSignUp(values);
      }}
    >
      {({ errors, touched, values, handleChange }) => {
        useEffect(() => {
          getProvince(Number.parseInt(values.region));
        }, [values.region]);
        return (
          <Form className="signup-form">
            {!!errorMessage && (
              <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                {errorMessage}
              </div>
            )}
            <div className="form-field">
              <InputField
                placeholder="Nhập email ..."
                id="email"
                label="email"
                name="email"
                istouched={touched.email}
                errors={errors.email}
              />
            </div>
            <div className="form-field">
              <PasswordField
                placeholder="Nhập mật khẩu ..."
                id="password"
                label="password"
                name="password"
                istouched={touched.password}
                errors={errors.password}
              />
            </div>
            <div className="form-field">
              <PasswordField
                placeholder="Nhập lại mật khẩu ..."
                id="repeatPassword"
                label="repeatPassword"
                name="repeatPassword"
                istouched={touched.repeatPassword}
                errors={errors.repeatPassword}
              />
            </div>
            <div className="form-field">
              <InputField
                placeholder="Nhập họ tên ..."
                id="name"
                label="name"
                name="name"
                istouched={touched.name}
                errors={errors.name}
              />
            </div>
            <div className="form-field">
              <SelectField
                id="gender"
                label="gender"
                name="gender"
                placeholder="-- Chọn giới tính --"
                options={GENDER_OPTIONS}
                istouched={touched.gender}
                errors={errors.gender}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <SelectField
                id="region"
                label="region"
                name="region"
                placeholder="-- Chọn quốc gia --"
                options={location}
                istouched={touched.region}
                errors={errors.region}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <SelectField
                id="state"
                label="state"
                name="state"
                placeholder="-- Chọn thành phố --"
                options={province}
                istouched={touched.state}
                errors={errors.state}
                onChange={handleChange}
              />
            </div>

            <Button color="primary" className="btn btn-primary" type="submit" disabled={loading}>
              {loading && (
                <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />
              )}
              <FormattedMessage id="register" />
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
