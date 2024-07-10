import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const FileUploadCp = ({ field, control, errors }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue=""
    errors={errors}
    rules={{ required: field.required }}
    render={({ field: { onChange, value } }) => (
      <Box>
        {value ? (
          <Box
            sx={{
              border: "2px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              position: "relative",
              width: "200px", // Điều chỉnh kích thước theo nhu cầu
            }}
          >
            <img
              src={URL.createObjectURL(value)}
              alt={`Preview ${value.name}`}
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
                onChange("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              width: "200px", // Điều chỉnh kích thước theo nhu cầu
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id={`upload-${field.name}`}
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onChange(e.target.files[0]);
                }
              }}
            />
            <label htmlFor={`upload-${field.name}`}>
              <Box>
                <Box component="span" sx={{ fontSize: "48px", color: "#999" }}>
                  +
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {field.label}
                </Typography>
              </Box>
            </label>
          </Box>
        )}
      </Box>
    )}
  />
);

export default FileUploadCp;
