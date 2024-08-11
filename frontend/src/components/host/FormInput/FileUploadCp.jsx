/* eslint-disable react/prop-types */
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import DialogInfo from "../../common/DialogInfo";

const FileUploadCp = ({ field, control, errors }) => {
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ""}
      rules={{ required: field.required }}
      render={({ field: { onChange, value } }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value ? (
            <Box
              sx={{
                border: "2px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                position: "relative",
                width: "400px",
              }}
            >
              <img
                src={
                  typeof value === "string" ? value : URL.createObjectURL(value)
                }
                alt={`Preview ${
                  typeof value === "string" ? "Current Image" : value.name
                }`}
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
                border: errors[field.name]
                  ? "2px dashed #f44336"
                  : "2px dashed #ccc",
                borderRadius: "4px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                width: "500px",
                height: "500px",
                minWidth: "100px",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column",
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
                  const file = event?.target?.files[0];
                  if (file && file.size <= 1024 * 1024) {
                    onChange(e.target.files[0]);
                  } else {
                    handleOpenDialogInfo(
                      "Kích thước ảnh phải nhỏ hơn hoặc bằng 1MB."
                    );
                    event.target.value = null;
                  }
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
          )}
          {errors[field.name] && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {field.label} là bắt buộc
            </Typography>
          )}
          {isOpenDialogInfo && (
            <DialogInfo
              handleClose={handleCloseDialogInfo}
              open={isOpenDialogInfo}
              title={titleDialog}
            />
          )}
        </Box>
      )}
    />
  );
};

export default FileUploadCp;
