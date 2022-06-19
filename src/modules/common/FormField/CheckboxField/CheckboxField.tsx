import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'reactstrap';

interface Props {
  label: string;
  name: string;
  field: any;
}

const CheckboxField = (props: Props) => {
  const { label, field } = props;
  const { name, value, onChange, onBlur } = field;
  return (
    <div className="checkbox-field">
      <Input id={name} type="checkbox" {...field} name={name} />
      <label htmlFor={name}>
        <FormattedMessage id={label} />
      </label>
    </div>
  );
};

export default CheckboxField;
