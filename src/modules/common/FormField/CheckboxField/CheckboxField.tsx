import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  id: string;
  name: string;
  errors: string | undefined;
  isTouched: boolean | undefined;
}

const CheckboxField = (props: Props) => {
  const { id, errors, name, isTouched } = props;
  return (
    <div className="checkbox-field">
      <Field id={name} type="checkbox" name={name} isTouched={isTouched} />
      <label htmlFor={name}>
        <FormattedMessage id="rememberMe" />
      </label>
    </div>
  );
};

export default CheckboxField;
