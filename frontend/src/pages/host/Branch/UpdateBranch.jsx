import { useEffect, useState, useMemo, useCallback } from "react";
import Form from "../../../components/host/Form";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateBranch = () => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
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
          // Tìm giá trị phù hợp trong branchAtbList
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

      // Trả về giá trị mới để CustomSelectCp có thể sử dụng
      return { id: response.data.id, value: response.data.value };
    } catch (error) {
      toast.error(error.response?.data?.error);
      return null;
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
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

      if (data.image) {
        formData.append("image", data.image);
      }

      await CallApi(`/api/host/branches/${id}`, "put", formData);
      toast.success(`Cập nhật chi nhánh ${data.branchName} thành công!`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Có lỗi xảy ra khi cập nhật chi nhánh"
      );
    }
  };

  //hàm này để lọc theo atbName và render ra option value theo atb key
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
        name: "phone",
        label: "Số điện thoại liên hệ",
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
        name: "closingHours",
        label: "Giờ đóng cửa",
        type: "text",
        required: true,
        gridWidth: 6,
      },
      ...serviceOptions,
      // {
      //   name: "court",
      //   label: "Sân",
      //   type: "select-custom",
      //   required: false,
      //   options: [],
      //   gridWidth: 6,
      //   multiple: true,
      // },
      {
        name: "email",
        label: "Địa chỉ email liên hệ",
        type: "text",
        readOnly: true,
        gridWidth: 6,
      },
      {
        name: "provinces",
        label: "Tỉnh",
        type: "text",
        readOnly: true,
      },
      {
        name: "districts",
        label: "Huyện",
        type: "text",
        readOnly: true,
      },
      {
        name: "wards",
        label: "Xã",
        type: "text",
        readOnly: true,
      },
      {
        name: "detail",
        label: "Địa chỉ chi tiết",
        type: "text",
        readOnly: true,
      },
      {
        name: "managerName",
        label: "Tên quản lý chi nhánh",
        type: "text",
        readOnly: true,
        gridWidth: 12,
      },
      {
        name: "businessLicenseName",
        label: "Giấy phép kinh doanh",
        type: "text",
        readOnly: true,
        gridWidth: 6,
      },
      {
        name: "taxId",
        label: "Mã số thuế",
        type: "text",
        readOnly: true,
        gridWidth: 6,
      },
      {
        name: "businessLicense",
        type: "image",
        label: "Ảnh giấy phép kinh doanh",
        readOnly: true,
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

export default UpdateBranch;
