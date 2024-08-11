import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TextFieldCp from "../../../components/host/FormInput/TextFieldCp";
import SelectCp from "../../../components/host/FormInput/SelectCp";
import CustomSelectCp from "../../../components/host/FormInput/CustomSelectCp";
import FileUploadCp from "../../../components/host/FormInput/FileUploadCp";
import SectionCp from "../../../components/host/FormInput/SectionCp";

import CallApi from "../../../service/CallAPI";
import TimePickerCp from "../../../components/host/FormInput/TimePickerCp";
import TimePickerPreviewCp from "./../../../components/host/FormInput/TimePickerPreviewCp";
import TelCp from "../../../components/host/FormInput/TelCp";
import EmailCp from "../../../components/host/FormInput/EmailCp";

const UpdateBranch = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [branchAtbList, setBranchAtbList] = useState([]);
  const [branch, setBranch] = useState({});

  useEffect(() => {
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

    fetchBranchAtbList();
  }, []);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await CallApi(`/api/host/branches/${id}`, "get");
        setBranch(response?.data);
        setValue("branchName", response?.data?.name);
        setValue("description", response?.data?.description);
        setValue("phone", response?.data?.phone);
        setValue("email", response?.data?.email);
        setValue("image", response?.data?.image);
        setValue("managerName", response?.data?.account?.user?.fullName);
        setValue("provinces", response?.data?.address?.provinces);
        setValue("districts", response?.data?.address?.districts);
        setValue("wards", response?.data?.address?.wards);
        setValue("detail", response?.data?.address?.detail);
        setValue("businessLicense", response?.data?.businessLicense);
        setValue("openingHours", response?.data?.openingHours);
        setValue("closingHours", response?.data?.closingHours);
        response?.data?.attributeBranches.forEach((atb) => {
          const matchingAttribute = branchAtbList.find(
            (item) => item.id === atb.attributeKeyBranchesId
          );
          if (matchingAttribute) {
            const matchingValue = matchingAttribute.attributeBranches.find(
              (attr) => attr.value === atb.value
            );
            if (matchingValue) {
              setValue(
                `attributeBranches[${atb.attributeKeyBranchesId}]`,
                matchingValue.id
              );
            }
          }
        });
      } catch (error) {
        console.log(
          "=============== fetch branch attribute ERROR: " +
            error.response?.data?.error
        );
      }
    };
    fetchBranch();
  }, [id, setValue, branchAtbList]);

  const addNewAttributeValue = useCallback(async (data) => {
    const requestData = {
      value: data.value,
      attributeKeyBranchesId: data.id,
    };
    try {
      const response = await CallApi(
        "/api/host/attribute-branches",
        "post",
        requestData
      );
      toast.success(`Tạo ${response?.data?.value} thành công!`);

      setBranchAtbList((prevList) =>
        prevList.map((item) =>
          item.id === data.id
            ? {
                ...item,
                attributeBranches: [
                  ...item.attributeBranches,
                  { id: response.data.id, value: response.data.value },
                ],
              }
            : item
        )
      );

      return { id: response.data.id, value: response.data.value };
    } catch (error) {
      toast.error(error.response?.data?.error);
      return null;
    }
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    try {
      formData.append("name", data.branchName);
      formData.append("description", data.description);
      formData.append("phone", data.phone);
      formData.append("openingHours", data.openingHours);
      formData.append("closingHours", data.closingHours);

      data.attributeBranches.forEach((item, index) => {
        if (item !== "") {
          formData.append(`attributeBranches`, item);
        }
      });

      if (typeof data.image !== "string") {
        formData.append("image", data.image);
      }

      await CallApi(`/api/host/branches/${id}`, "put", formData);
      navigate(`/host/branch/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success(`Cập nhật cơ sở ${data.branchName} thành công!`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Có lỗi xảy ra khi cập nhật cơ sở"
      );
    }
  };

  const serviceOptions = useMemo(
    () =>
      branchAtbList.map((item) => ({
        name: `attributeBranches[${item.id}]`,
        key: item.id,
        label: item.name,
        type: "select-custom",
        required: true,
        options: [
          { key: "", label: "Chọn giá trị" },
          ...item.attributeBranches.map((itemChildren) => ({
            key: itemChildren.id,
            label: itemChildren.value,
          })),
          { key: "custom", label: "Thêm mới" },
        ],
        gridWidth: 6,
        onCustomInput: (data) => addNewAttributeValue({ ...data, id: item.id }),
      })),
    [branchAtbList, addNewAttributeValue]
  );

  const formConfig = useMemo(
    () => [
      {
        name: "branchInfo",
        label: "Thông tin cơ sở",
        type: "section",
        required: true,
      },
      {
        name: "image",
        type: "image",
        label: "Ảnh cơ sở",
        required: true,
        gridWidth: 12,
      },
      {
        name: "branchName",
        label: "Tên cơ sở",
        type: "text",
        required: true,
        gridWidth: 6,
      },
      {
        name: "phone",
        label: "Số điện thoại liên hệ",
        type: "tel",
        required: true,
        gridWidth: 6,
      },
      {
        name: "description",
        label: "Mô tả",
        type: "text",
        required: true,
        gridWidth: 12,
      },
      {
        name: "openingHours",
        label: "Giờ mở cửa",
        type: "timepickerpreview",
        required: true,
        gridWidth: 6,
      },
      {
        name: "closingHours",
        label: "Giờ đóng cửa",
        type: "timepickerpreview",
        required: true,
        gridWidth: 6,
      },
      ...serviceOptions,
    ],
    [serviceOptions]
  );

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return <TextFieldCp field={field} control={control} errors={errors} />;
      case "tel":
        return <TelCp field={field} control={control} errors={errors} />;
      case "email":
        return <EmailCp field={field} control={control} errors={errors} />;
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
      case "image":
        return <FileUploadCp field={field} control={control} errors={errors} />;
      case "section":
        return <SectionCp field={field} />;
      case "timepicker":
        return <TimePickerCp field={field} control={control} errors={errors} />;
      case "timepickerpreview":
        return (
          <TimePickerPreviewCp
            field={field}
            control={control}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

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
      <Box
        sx={{
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
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
      </Box>
    </Box>
  );
};

export default UpdateBranch;
