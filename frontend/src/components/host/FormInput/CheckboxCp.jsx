import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const CheckboxCp = ({ field, control, errors }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={false}
    errors={errors}
    render={({ field: { onChange, value } }) => (
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} />}
        label={field.label}
      />
    )}
  />
);

export default CheckboxCp;
