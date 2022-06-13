import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './styles.scss';
import React from 'react';
import { Field } from 'formik';
import { ISignUpParams } from 'models/auth';
import { Input } from 'reactstrap';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  options: any[];
  istouched: boolean | undefined;
  errors: string | undefined;
  onChange: any;
  field: any;
}

const SelectField = (props: Props) => {
  const { id, options, placeholder, label, istouched, errors, field } = props;
  const { name, value, onChange, onBlur } = field;

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id={label} />
      </label>

      <Input type="select" name={name} {...field} placeholder={placeholder} options={options}>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Input>

      {errors && istouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default SelectField;
