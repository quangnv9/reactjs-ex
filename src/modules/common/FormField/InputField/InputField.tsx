import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'reactstrap';
import './styles.scss';

interface Props {
  id: string;
  name: string;
  label: string;
  errors: string | undefined;
  placeholder: string;
  istouched: boolean | undefined;
}

const InputField = (props: Props) => {
  const { id, label, errors, name, istouched, placeholder } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id={label} />
      </label>
      <Input id={name} type="text" name={name} istouched={istouched} placeholder={placeholder} />
      {errors && istouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default InputField;
