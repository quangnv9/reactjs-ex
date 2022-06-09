import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  id: string;
  label: string;
  name: string;
}

const CheckboxField = (props: Props) => {
  const { id, label, name } = props;
  return (
    <div className="checkbox-field">
      <Field id={name} type="checkbox" name={name} />
      <label htmlFor={name}>
        <FormattedMessage id={label} />
      </label>
    </div>
  );
};

export default CheckboxField;
