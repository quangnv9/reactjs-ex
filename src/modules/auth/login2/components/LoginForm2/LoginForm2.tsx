import { Field, Form, Formik, FormikProps, useFormik } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import * as Yup from 'yup';
import { ROUTES } from '../../../../../configs/routes';
import { ILoginParams } from '../../../../../models/auth';
import CheckboxField from '../../../../common/FormField/CheckboxField/CheckboxField';
import InputField from '../../../../common/FormField/InputField/InputField';
import PasswordField from '../../../../common/FormField/PasswordField/PasswordField';
import './styles.scss';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm2 = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const LoginValidation = Yup.object().shape({
    email: Yup.string().email('emailInvalid').required('emailRequire'),
    password: Yup.string()
      .min(4, 'minPasswordInvalid')
      .max(50, 'maxPasswordInvalid')
      .required('passwordRequire'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '', city: '', rememberMe: false }}
      validationSchema={LoginValidation}
      onSubmit={(values, actions) => {
        onLogin(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
          {!!errorMessage && (
            <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
              {errorMessage}
            </div>
          )}
          <div className="form-field">
            <Field
              name="email"
              component={InputField}
              field
              placeholder="Nhập email ..."
              id="email"
              label="email"
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
          <div className="form-field link">
            <CheckboxField id="checkbox" label="rememberMe" name="rememberMe" />
            <Link to={ROUTES.register} className="form-check-label">
              <FormattedMessage id="register" />
            </Link>
          </div>

          <Button color="primary" className="btn btn-primary" type="submit" disabled={loading}>
            {loading && (
              <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />
            )}
            <FormattedMessage id="login" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm2;
