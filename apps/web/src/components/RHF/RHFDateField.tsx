import type { DateFieldProps } from '@mui/x-date-pickers';
import { DateField } from '@mui/x-date-pickers';
import type { Moment } from 'moment-timezone';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDateFieldProps<TFieldValues extends FieldValues = FieldValues> =
  DateFieldProps<Moment> & {
    name: FieldPathByValue<TFieldValues, Moment>;
  };

const RHFDateField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  ...props
}: RHFDateFieldProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateField
          InputLabelProps={{ shrink: true, error: Boolean(error) }}
          format='YYYY-MM'
          margin='none'
          onChange={onChange}
          value={value}
          {...props}
        />
      )}
    />
  );
};

export default RHFDateField;
