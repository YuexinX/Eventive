import type { TextFieldProps } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type RHFAutocompleteProps<TFieldValues extends FieldValues = FieldValues> =
  TextFieldProps & {
    options: string[];
    freeSolo?: boolean;
    name: FieldPath<TFieldValues>;
  };

const RHFAutocomplete = <TFieldValues extends FieldValues = FieldValues>({
  name,
  options,
  label,
  freeSolo,
  ...props
}: RHFAutocompleteProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          clearIcon={null}
          clearOnEscape={false}
          filterOptions={(x) => x}
          freeSolo={freeSolo}
          onInputChange={(_, v) => {
            onChange(v);
          }}
          options={options}
          renderInput={(params) => (
            <TextField
              margin='none'
              {...params}
              InputLabelProps={{ shrink: true }}
              {...props}
              error={Boolean(error)}
              helperText={error ? error.message : null}
              label={label}
            />
          )}
          value={value}
        />
      )}
    />
  );
};

export default RHFAutocomplete;
