import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const FileUploadCp = ({ field, control, errors }) => (
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
                    const newValue = value.filter((item) => item !== file);
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

export default FileUploadCp;
