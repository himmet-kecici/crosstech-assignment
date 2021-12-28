import { Field } from "formik";
import { TextField, Select } from "formik-mui";

const customInputProps = {
  sx: {
    color: (theme) => `${theme.palette.text.primary} !important`,
    WebkitTextFillColor: (theme) => `${theme.palette.text.primary} !important`,
  },
};

export const FormTextField = ({
  minRows,
  sx,
  required,
  disabled,
  ...props
}) => (
  <Field
    component={TextField}
    margin="normal"
    inputProps={disabled ? customInputProps : undefined}
    variant={disabled ? "standard" : undefined}
    minRows={disabled ? undefined : minRows}
    fullWidth
    {...props}
    {...(disabled ? { InputProps: { disableUnderline: true } } : {})}
    required={!disabled && required}
    disabled={disabled}
  />
);

export const FormSelectField = ({ required, disabled, readOnly, ...props }) => (
  <Field
    component={Select}
    formControl={{
      sx: {
        width: "100%",
        minWidth: (theme) => theme.spacing(25),
        boxShadow: "none",
        ...(disabled || readOnly
          ? {
              "& .MuiSelect-icon": { display: "none" },
            }
          : {}),
      },
      margin: "normal",
      fullWidth: true,
      required: !(disabled || readOnly) && required,
      variant: disabled ? "standard" : undefined,
    }}
    inputProps={{ ...(disabled || readOnly ? customInputProps : {}), readOnly }}
    {...props}
    {...(disabled ? { disableUnderline: true } : {})}
    disabled={disabled || readOnly}
  />
);
