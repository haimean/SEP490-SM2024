import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import "dayjs/locale/vi";
const TimePickerCp = ({ field, control, errors }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={null}
    rules={{ required: field.required }}
    render={({ field: { onChange, value, ref } }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        {" "}
        <TimePicker
          value={value}
          onChange={onChange}
          slots={{ textField: TextField }}
          required={field.required}
          slotProps={{
            textField: {
              label: field.label,
              fullWidth: true,
              error: !!errors[field.name],
              helperText: errors[field.name]?.message,
            },
          }}
          inputRef={ref}
        />{" "}
      </LocalizationProvider>
    )}
  />
);
export default TimePickerCp;
