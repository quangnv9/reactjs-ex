import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

interface Props {
  id: string;
  label: string;
  name: string;
  errors: string | undefined;
  istouched: boolean | undefined;
}

const PasswordField = (props: Props) => {
  const { id, label, errors, name, istouched } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id={label} />
      </label>
      <Field id={name} type="password" name={name} istouched={istouched} />
      {errors && istouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default PasswordField;
