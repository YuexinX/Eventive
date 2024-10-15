import type { TextFieldProps } from '@mui/material';
import { InputAdornment, TextField } from '@mui/material';
import { forwardRef } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface CurrencyMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CurrencyMask = forwardRef<HTMLInputElement, CurrencyMaskProps>(
  function CurrencyMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        mapToRadix={[',']}
        mask={Number}
        max={Number.MAX_SAFE_INTEGER}
        min={0}
        normalizeZeros
        onAccept={(value) => {
          onChange({
            target: { name: props.name, value },
          });
        }}
        padFractionalZeros
        radix='.'
        scale={2}
        thousandsSeparator=','
      />
    );
  },
);

type RHFInputProps<TFieldValues extends FieldValues = FieldValues> =
  TextFieldProps & {
    name: FieldPath<TFieldValues>;
    mask?: 'currency' | 'phone';
  };

const RHFInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  mask,
  ...props
}: RHFInputProps<TFieldValues>) => {
  let maskProps: TextFieldProps;

  const { control } = useFormContext<TFieldValues>();

  switch (mask) {
    case 'currency':
      maskProps = {
        InputProps: {
          // eslint-disable-next-line -- ignore
          inputComponent: CurrencyMask as any,
          startAdornment: <InputAdornment position='start'>¥</InputAdornment>,
        },
      };
      break;
    default:
      maskProps = {};
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          InputLabelProps={{ shrink: true }}
          autoComplete='off'
          error={Boolean(error)}
          helperText={error ? error.message : null}
          label={label}
          margin='none'
          onChange={onChange}
          value={value}
          {...props}
          {...maskProps}
        />
      )}
    />
  );
};

export default RHFInput;
