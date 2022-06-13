import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './styles.scss';
import React from 'react';
import { Field } from 'formik';
import { ISignUpParams } from 'models/auth';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  options: any[];
  istouched: boolean | undefined;
  errors: string | undefined;
  onChange: any;
}

const SelectField = (props: Props) => {
  const { id, options, placeholder, label, name, istouched, errors } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <FormattedMessage id={label} />
      </label>

      <Field as="select" id={id} name={name} placeholder={placeholder} options={options}>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Field>

      {errors && istouched && (
        <small className="text-danger">
          <FormattedMessage id={errors} />
        </small>
      )}
    </div>
  );
};

export default SelectField;
