import { Form, Formik, FormikProps, useFormik } from 'formik';
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
      initialValues={{ email: '', password: '', rememberMe: false }}
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
            <InputField id="email" name="email" isTouched={touched.email} errors={errors.email} />
          </div>
          <div className="form-field">
            <PasswordField
              id="password"
              name="password"
              isTouched={touched.password}
              errors={errors.password}
            />
          </div>
          <div className="form-field link">
            <CheckboxField
              id="checkbox"
              name="checkbox"
              isTouched={touched.rememberMe}
              errors={errors.rememberMe}
            />
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

    //    <div className="col-md-12 input-field">
    //     <label htmlFor="inputEmail" className="form-label">
    //       <FormattedMessage id="email" />
    //     </label>
    //     <Input
    //       className="input-text"
    //       name="email"
    //       type="text"
    //       id="inputEmail"
    //       value={formik.values.email}
    //       onChange={formik.handleChange}
    //     />
    //     {formik.errors.email && formik.touched.email && (
    //       <small className="text-danger">
    //         <FormattedMessage id={formik.errors.email} />
    //       </small>
    //     )}
    //   </div>
    //   <div className="col-md-12 input-field">
    //     <label htmlFor="inputPassword" className="form-label">
    //       <FormattedMessage id="password" />
    //     </label>
    //     <Input
    //       className="input-text"
    //       name="password"
    //       type="password"
    //       id="inputPassword"
    //       value={formik.values.password}
    //       onChange={formik.handleChange}
    //     />
    //     {formik.errors.password && formik.touched.password && (
    //       <small className="text-danger">
    //         <FormattedMessage id={formik.errors.password} />
    //       </small>
    //     )}
    //   </div>
    //   <div className="col-md-12 input-field link">
    //     <div className="">
    //       <Input
    //         className="form-check-input"
    //         id="checkboxRemember"
    //         name="rememberMe"
    //         type="checkbox"
    //         onChange={formik.handleChange}
    //       />
    //       <label htmlFor="checkboxRemember" className="form-check-label">
    //         <FormattedMessage id="rememberMe" />
    //       </label>
    //     </div>
    //     <Link to={ROUTES.register} className="form-check-label">
    //       <FormattedMessage id="register" />
    //     </Link>
    //   </div>
    //   <Button
    //     color="primary"
    //     className="btn btn-primary"
    //     type="submit"
    //     style={{
    //       minWidth: '160px',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //     disabled={loading}
    //   >
    //     {loading && (
    //       <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />
    //     )}
    //     <FormattedMessage id="login" />
    //   </Button>
    // </form>
  );
};

export default LoginForm2;
