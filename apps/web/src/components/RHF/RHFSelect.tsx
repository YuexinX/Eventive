import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  type MenuItemProps,
  type SelectProps,
} from '@mui/material';
import {
  Controller,
  useFormContext,
  type FieldPathByValue,
  type FieldValues,
} from 'react-hook-form';

interface Option<Value> extends Omit<MenuItemProps, 'value'> {
  id: string;
  label: string;
  value: Value;
}

interface GroupingOption<Value> {
  id: string;
  groupName: string;
  groupOptions: Option<Value>[];
}

export type RHFSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  Value = string,
> = SelectProps & {
  options: (Option<Value> | GroupingOption<Value>)[];
  name: FieldPathByValue<TFieldValues, Value>;
};

const RHFSelect = <
  TFieldValues extends FieldValues = FieldValues,
  Value = string,
>({
  name,
  options,
  ...props
}: RHFSelectProps<TFieldValues, Value>) => {
  const { control } = useFormContext<TFieldValues>();

  function isGroupingOption<T>(
    option: Option<T> | GroupingOption<T>,
  ): option is GroupingOption<T> {
    return 'groupName' in option && Array.isArray(option.groupOptions);
  }

  function isOption<T>(
    option: Option<T> | GroupingOption<T>,
  ): option is Option<T> {
    return 'label' in option && 'value' in option;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth={Boolean(props.fullWidth)}>
          <InputLabel id='select-label' shrink>
            {props.label}
          </InputLabel>
          <Select
            displayEmpty
            labelId='select-label'
            notched
            onChange={onChange}
            value={value}
            {...props}
            error={Boolean(error)}>
            {options.map((option) => {
              if (isOption(option)) {
                const { id, value: optionValue, label, ...rest } = option;
                return (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
                  // @ts-expect-error
                  <MenuItem key={id} value={optionValue} {...rest}>
                    {label}
                  </MenuItem>
                );
              }
              if (isGroupingOption(option)) {
                const result: React.ReactNode[] = [];

                result.push(
                  <ListSubheader key={result.length + 1}>
                    {option.groupName}
                  </ListSubheader>,
                );
                for (const groupOption of option.groupOptions) {
                  const {
                    id,
                    value: groupOptionValue,
                    label,
                    ...rest
                  } = groupOption;
                  result.push(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
                    // @ts-expect-error
                    <MenuItem key={id} value={groupOptionValue} {...rest}>
                      {label}
                    </MenuItem>,
                  );
                }
                return result;
              }
              return null;
            })}
          </Select>

          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RHFSelect;
