import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const Form = ({ formConfig, control, handleCancel, onFormSubmit, errors }) => {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "tel":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            errors={errors}
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        );
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              errors={errors}
              rules={{ required: field.required }}
              render={({ field: { onChange, value } }) => (
                <Select value={value} onChange={onChange} label={field.label}>
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        );
      case "select-custom":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => {
              const [isCustom, setIsCustom] = useState(false);
              const [customValue, setCustomValue] = useState("");
              useEffect(()=>{
                setCustomValue('')
              },[isCustom])

              const handleSelectChange = (event) => {
                const selectedValue = event.target.value;
                if (selectedValue === "custom") {
                  setIsCustom(true);
                  onChange("");
                } else {
                  setIsCustom(false);
                  onChange(selectedValue);
                }
              };

              const handleCustomInputChange = (event) => {
                setCustomValue(event.target.value);
              };

              const handleCustomInputBlur = async () => {
                if (customValue && field.onCustomInput) {
                  console.log(field);
                  await field.onCustomInput({ value: customValue, id:field.key  });
                  // Sau khi thêm thành công, cập nhật options và chọn giá trị mới
                  field.options.push({
                    value: customValue,
                    label: customValue,
                  });
                  onChange(customValue);
                  setIsCustom(false);
                }
              };

              return (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={isCustom ? "custom" : value}
                    onChange={handleSelectChange}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.label}
                      </MenuItem>
                    ))}
                    <MenuItem value="custom">Khác</MenuItem>
                  </Select>
                  {isCustom && (
                    <TextField
                      fullWidth
                      label="Nhập giá trị tùy chỉnh"
                      value={customValue}
                      onChange={handleCustomInputChange}
                      onBlur={handleCustomInputBlur}
                      style={{ marginTop: 16 }}
                    />
                  )}
                </FormControl>
              );
            }}
          />
        );
      case "datetime":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={null}
            errors={errors}
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                showDateSelect
                dateFormat="dd/MM/yyyy"
                customInput={<TextField fullWidth label={field.label} />}
              />
            )}
          />
        );
      case "checkbox":
        return (
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
      case "file":
      case "image":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={[]}
            errors={errors}
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => (
              <Box>
                <Grid container spacing={2}>
                  {value.map((file) => (
                    <Grid item xs={3} key={file.name}>
                      <Box
                        sx={{
                          border: "2px solid #ccc",
                          borderRadius: "4px",
                          padding: "10px",
                          position: "relative",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${file.name}`}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            bgcolor: "rgba(255,255,255,0.7)",
                          }}
                          onClick={() => {
                            const newValue = value.filter(
                              (item) => item !== file
                            );
                            onChange(newValue);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: "4px",
                        padding: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                        },
                      }}
                    >
                      <input
                        accept={field.type === "image" ? "image/*" : undefined}
                        style={{ display: "none" }}
                        id={`upload-${field.name}`}
                        type="file"
                        multiple
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files);
                          onChange([...value, ...newFiles]);
                        }}
                      />
                      <label htmlFor={`upload-${field.name}`}>
                        <Box>
                          <Box
                            component="span"
                            sx={{ fontSize: "48px", color: "#999" }}
                          >
                            +
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {field.label}
                          </Typography>
                        </Box>
                      </label>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          />
        );
      case "section":
        return (
          <Box sx={{ width: "100%", mt: 1 }}>
            <Typography variant="h6" component="h2">
              {field.label}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onFormSubmit(onFormSubmit)}
      sx={{ mt: 3, border: 3, p: 3, borderRadius: 3, borderColor: "#f0f0f0" }}
    >
      <Grid container spacing={2}>
        {formConfig.map((field) => (
          <Grid
            item
            sm={12}
            md={field.type === "section" ? 12 : field.gridWidth || 6}
            key={field.name}
          >
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleCancel}
          type="button"
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Hủy
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Đăng tin
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
