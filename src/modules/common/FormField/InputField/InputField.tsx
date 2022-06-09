import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'reactstrap';
import './styles.scss';

interface Props {
  id: string;
  name: string;
  errors: string | undefined;
  isTouched: boolean | undefined;
}

const InputField = (props: Props) => {
  const { id, errors, name, isTouched } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id="email" />
      </label>
      <Field id={name} type="text" name={name} isTouched={isTouched} />
      {errors && isTouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default InputField;
