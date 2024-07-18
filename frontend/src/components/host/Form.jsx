import React from "react";
import { Box, Button, Grid } from "@mui/material";
import TextFieldCp from "./FormInput/TextFieldCp";
import SelectCp from "./FormInput/SelectCp";
import CustomSelectCp from "./FormInput/CustomSelectCp";
import DatePickerCp from "./FormInput/DatePickerCp";
import CheckboxCp from "./FormInput/CheckboxCp";
import FileUploadCp from "./FormInput/FileUploadCp";
import SectionCp from "./FormInput/SectionCp";

const Form = ({
  formConfig,
  handleSubmit,
  control,
  handleCancel,
  onSubmit,
  errors,
  setValue,
  children,
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "tel":
      case "number":
        return (
          <TextFieldCp
            field={field}
            control={control}
            errors={errors}
            readOnly={field.readOnly}
          />
        );
      case "select":
        return <SelectCp field={field} control={control} errors={errors} />;
      case "select-custom":
        return (
          <CustomSelectCp
            field={field}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        );
      case "datetime":
        return <DatePickerCp field={field} control={control} errors={errors} />;
      case "checkbox":
        return <CheckboxCp field={field} control={control} errors={errors} />;
      case "file":
      case "image":
        return <FileUploadCp field={field} control={control} errors={errors} />;
      case "section":
        return <SectionCp field={field} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {formConfig.map((field) => (
          <Grid
            item
            sm={12}
            md={field.type === "section" ? 12 : field.gridWidth || 6}
            key={`${field.name}-${JSON.stringify(field.options)}`}
          >
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      {children}
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
          Xác nhận
        </Button>
      </Box>
    </form>
  );
};

export default Form;
