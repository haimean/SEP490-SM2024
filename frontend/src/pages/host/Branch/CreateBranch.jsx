import React, { Children, useEffect, useState } from "react";
import Form from "../../../components/host/Form";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const CreateBranch = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [branchAtbList, setBranchAtbList] = useState([]);

  useEffect(() => {
    fetchBranchAtbList();
  }, []);

  const addNewServiceValue = async (data) => {
    const requestData = {
      value: data.value,
      attributeKeyBranchesId: data.id, //cái này kbt lấy dynamic kiểu gì vì có rất nhiều atb key trong này
    };
    console.log(requestData);
    try {
      const response = await CallApi(
        "/api/host/attribute-branches",
        "post",
        requestData
      );
      toast.success(`Tạo ${response?.data?.value} thành công!`);
      fetchBranchAtbList();
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const fetchBranchAtbList = async () => {
    try {
      const response = await CallApi(`/api/host/attribute-branches`, "get");
      setBranchAtbList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch branch attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  //hàm này để lọc theo atbName và render ra option value theo atb key
  const serviceOptions = branchAtbList.map((item) => {
    return {
      name: item.name,
      key: item.id,
      label: item.name,
      type: "select-custom",
      required: true,
      options: item.attributeBranches.map((itemChildren) => ({
        key: itemChildren.id,
        label: itemChildren.value,
      })),
      gridWidth: 12,
      onCustomInput: addNewServiceValue,
    };
  });

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
    ...serviceOptions,
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
