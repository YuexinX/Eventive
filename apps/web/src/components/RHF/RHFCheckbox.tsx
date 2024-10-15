import type { CheckboxProps} from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import type {
  FieldPath,
  FieldValues} from 'react-hook-form';
import {
  Controller,
  useFormContext,
} from 'react-hook-form';

type RHFCheckboxProps<TFieldValues extends FieldValues = FieldValues> =
  CheckboxProps & {
    label?: string;
    name: FieldPath<TFieldValues>;
  };

const RHFCheckbox = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  ...props
}: RHFCheckboxProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} {...props} />}
          label={label}
        />
      )}
    />
  );
};

export default RHFCheckbox;
