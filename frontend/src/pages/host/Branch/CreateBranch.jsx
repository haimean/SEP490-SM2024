import { useEffect, useState, useMemo, useCallback } from "react";
import Form from "../../../components/host/Form";
import Navbar from "../../../layouts/player/Navbar";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const CreateBranch = () => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [branchAtbList, setBranchAtbList] = useState([]);

  useEffect(() => {
    fetchBranchAtbList();
  }, []);

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

      // Trả về giá trị mới để CustomSelectCp có thể sử dụng
      return { id: response.data.id, value: response.data.value };
    } catch (error) {
      toast.error(error.response?.data?.error);
      return null;
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("🚀 ========= data:", data);
    const formData = new FormData();
    try {
      formData.append("name", data.branchName);
      formData.append("description", data.description);
      formData.append("phone", data.phone);
      formData.append("openingHours", "10:10");
      formData.append("closingHours", "20:10");
      formData.append("longitude", "107.09848786676099");
      formData.append("latitude", "20.962297338909874");
      formData.append("provinces", data.provinces);
      formData.append("districts", data.districts);
      formData.append("wards", data.wards);
      formData.append("detail", data.detail);
      formData.append("email", data.email);
      data.attributeBranches.map((item) => {
        if (item != "") {
          formData.append("attributeBranches", item);
        }
      });
      if (data.businessLicensePicture) {
        formData.append("businessLicense", data.businessLicensePicture);
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      await CallApi("/api/host/branches", "post", formData);
      toast.success(`Tạo chi nhánh ${data.branchName} thành công!`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Có lỗi xảy ra khi tạo chi nhánh"
      );
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
  const serviceOptions = useMemo(
    () =>
      branchAtbList.map((item, index) => ({
        name: `attributeBranches[${index}]`,
        key: item.id,
        label: item.name,
        type: "select-custom",
        required: true,
        options: item.attributeBranches.map((itemChildren) => ({
          key: itemChildren.id,
          label: itemChildren.value,
        })),
        gridWidth: 6,
        onCustomInput: (data) => addNewAttributeValue({ ...data, id: item.id }),
      })),
    [branchAtbList, addNewAttributeValue]
  );

  const formConfig = useMemo(
    () => [
      {
        name: "branchInfo",
        label: "Thông tin chi nhánh",
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
        label: "Tên chi nhánh",
        type: "text",
        required: true,
        gridWidth: 12,
      },
      {
        name: "description",
        label: "Mô tả",
        type: "text",
        required: true,
        gridWidth: 12,
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
        name: "provinces",
        label: "Tỉnh",
        type: "text",
        required: true,
      },
      {
        name: "districts",
        label: "Huyện",
        type: "text",
        required: true,
      },
      {
        name: "wards",
        label: "Xã",
        type: "text",
        required: true,
      },
      {
        name: "branchContact",
        label: "Thông tin liên hệ chi nhánh",
        type: "section",
        required: true,
      },
      {
        name: "phone",
        label: "Số điện thoại liên hệ",
        type: "tel",
        required: true,
        gridWidth: 6,
      },
      {
        name: "email",
        label: "Địa chỉ email liên hệ",
        type: "text",
        required: true,
        gridWidth: 6,
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
        name: "openingHours",
        label: "Giờ mở cửa",
        type: "text",
        required: true,
        gridWidth: 6,
      },
      {
        name: "closingHours",
        label: "Giờ đóng cửa",
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
        required: false,
        gridWidth: 6,
      },
      {
        name: "taxId",
        label: "Mã số thuế",
        type: "text",
        required: false,
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
    ],
    [serviceOptions]
  );

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
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          handleCancel={handleCancel}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </Box>
    </Box>
  );
};

export default CreateBranch;
