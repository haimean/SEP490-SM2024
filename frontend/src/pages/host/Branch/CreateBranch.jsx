import React from "react";
import Form from "../../../components/host/Form";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

const CreateBranch = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formConfig = [
    {
      name: "branchInfo",
      label: "Thông tin chi nhánh",
      type: "section",
      required: true,
    },
    {
      name: "branchName",
      label: "Tên chi nhánh",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "branchCode",
      label: "Mã nhận diện chi nhánh",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "branchLocation",
      label: "Địa chỉ chi nhánh",
      type: "section",
      required: true,
    },
    {
      name: "location",
      label: "Địa chỉ",
      type: "text",
      required: true,
      gridWidth: 12,
    },
    {
      name: "branchContact",
      label: "Thông tin liên hệ chi nhánh",
      type: "section",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Số điện thoại liên hệ",
      type: "tel",
      required: true,
      gridWidth: 6,
    },
    {
      name: "email",
      label: "Địa chỉ email",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "fax",
      label: "Fax",
      type: "tel",
      required: false,
    },
    {
      name: "branchWork",
      label: "Thông tin hoạt động",
      type: "section",
      required: true,
    },
    {
      name: "managerName",
      label: "Tên quản lý chi nhánh",
      type: "text",
      required: true,
      gridWidth: 12,
    },
    {
      name: "managerPhone",
      label: "Số điện thoại quản lý chi nhánh",
      type: "tel",
      required: true,
      gridWidth: 6,
    },
    {
      name: "openingHours",
      label: "Giờ mở cửa",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "service",
      label: "Dịch vụ cung cấp",
      type: "text",
      required: true,
      gridWidth: 12,
    },
    {
      name: "legalInfo",
      label: "Thông tin pháp lý",
      type: "section",
      required: true,
    },
    {
      name: "businessLicense",
      label: "Giấy phép kinh doanh",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "taxId",
      label: "Mã số thuế",
      type: "text",
      required: true,
      gridWidth: 6,
    },
    {
      name: "businessLicensePicture",
      type: "image",
      label: "Ảnh giấy phép kinh doanh",
      required: true,
      gridWidth: 12,
    },
    {
      name: "additionalInfo",
      label: "Thông tin bổ sung",
      type: "section",
      required: true,
    },
    {
      name: "branchDescription",
      label: "Mô tả",
      type: "text",
      required: false,
      gridWidth: 12,
    },
  ];

  const handleCancel = () => {
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar sx={{ flexShrink: 0 }} />
      <Box
        sx={{
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
        <Form
          formConfig={formConfig}
          onFormSubmit={handleSubmit}
          handleCancel={handleCancel}
          control={control}
          errors={errors}
        />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default CreateBranch;
