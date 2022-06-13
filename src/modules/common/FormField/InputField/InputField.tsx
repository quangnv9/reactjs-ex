import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'reactstrap';
import './styles.scss';

interface Props {
  name: string;
  label: string;
  errors: string | undefined;
  placeholder: string;
  istouched: boolean | undefined;
  field: any;
}

const InputField = (props: Props) => {
  const { label, errors, istouched, placeholder, field } = props;
  const { name, value, onChange, onBlur } = field;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id={label} />
      </label>
      <Input id={name} type="text" {...field} istouched={istouched} placeholder={placeholder} />
      {errors && istouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default InputField;
