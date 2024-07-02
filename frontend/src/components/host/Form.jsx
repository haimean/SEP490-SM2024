import React from "react";
import { Box, Button, Grid } from "@mui/material";
import TextFieldCp from "./FormInput/TextFieldCp";
import SelectCp from "./FormInput/SelectCp";
import CustomSelectCp from "./FormInput/CustomSelectCp";
import DatePickerCp from "./FormInput/DatePickerCp";
import CheckboxCp from "./FormInput/CheckboxCp";
import FileUploadCp from "./FormInput/FileUploadCp";
import SectionCp from "./FormInput/SectionCp";

const Form = ({ formConfig, control, handleCancel, onFormSubmit, errors }) => {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "tel":
      case "number":
        return <TextFieldCp field={field} control={control} errors={errors} />;
      case "select":
        return <SelectCp field={field} control={control} errors={errors} />;
      case "select-custom":
        return (
          <CustomSelectCp
            field={{
              ...field,
              key: field.id,
              options: field.options,
            }}
            control={control}
            errors={errors}
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
