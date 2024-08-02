import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import MapComponent from "../../../components/common/MapAutoComplate";
import TextFieldCp from "../../../components/host/FormInput/TextFieldCp";
import SelectCp from "../../../components/host/FormInput/SelectCp";
import CustomSelectCp from "../../../components/host/FormInput/CustomSelectCp";
import DatePickerCp from "../../../components/host/FormInput/DatePickerCp";
import CheckboxCp from "../../../components/host/FormInput/CheckboxCp";
import FileUploadCp from "../../../components/host/FormInput/FileUploadCp";
import SectionCp from "../../../components/host/FormInput/SectionCp";
import TimePickerCp from "../../../components/host/FormInput/TimePickerCp";
import ProvinceSelect from "../../../components/host/FormInput/ProvinceSelect";
import DistrictSelect from "../../../components/host/FormInput/DistrictSelect";
import WardSelect from "../../../components/host/FormInput/WardSelect";

import CallApi from "../../../service/CallAPI";
import PaymentCreateBranch from "../../../components/host/Branch/PaymentCreateBranch";
import axios from "axios";
import TelCp from "../../../components/host/FormInput/TelCp";
import EmailCp from "../../../components/host/FormInput/EmailCp";

const CreateBranch = () => {
  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [branchAtbList, setBranchAtbList] = useState([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchBranchAtbList();
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (getValues().provinces?.id) {
      fetchDistricts(getValues().provinces.id);
    }
  }, [getValues().provinces]);

  useEffect(() => {
    if (getValues().districts?.id) {
      fetchWards(getValues().districts.id);
    }
  }, [getValues().districts]);

  const handleOpenPaymentModal = () => setOpenPaymentModal(true);
  const handleClosePaymentModal = () => setOpenPaymentModal(false);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://esgoo.net/api-tinhthanh/1/0.htm"
      );
      if (response.status === 200) {
        setProvinces(response.data?.data || []);
      } else {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu tỉnh thành");
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu tỉnh:", error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu tỉnh thành");
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
      );
      if (response.status === 200) {
        setDistricts(response.data?.data || []);
      } else {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu quận huyện");
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu quận huyện:", error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu quận huyện");
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
      );
      if (response.status === 200) {
        setWards(response.data?.data || []);
      } else {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu xã phường");
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu xã phường:", error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu xã phường");
    }
  };

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

  const checkBranchCount = async () => {
    try {
      const response = await CallApi("/api/host/branches/total", "get");
      return response.data.total;
    } catch (error) {
      console.error("Error fetching branch count:", error);
      return 0;
    }
  };

  const onSubmit = async (data) => {
    const branchCount = await checkBranchCount();

    if (branchCount >= 2) {
      setFormData(data);
      handleOpenPaymentModal();
      return;
    }

    await createBranch(data);
  };

  const createBranch = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.branchName);
    formData.append("description", data?.description);
    formData.append("phone", data?.phone);
    formData.append("openingHours", dayjs(data?.openingHours).format("HH:mm"));
    formData.append("closingHours", dayjs(data?.closingHours).format("HH:mm"));
    formData.append("longitude", "107.09848786676099");
    formData.append("latitude", "20.962297338909874");
    formData.append("provinces", data?.provinces?.name || "");
    formData.append("districts", data?.districts?.name || "");
    formData.append("wards", data?.wards?.name || "");
    formData.append("detail", data?.detail);
    formData.append("email", data?.email);
    Object.keys(data?.attributeBranches || {}).forEach((key) => {
      const value = data.attributeBranches[key];
      if (value !== "") {
        const arrayValue = Array.isArray(value) ? value : [value];
        arrayValue.forEach((item) => {
          formData.append("attributeBranches", item);
        });
      }
    });
    if (data?.businessLicensePicture) {
      formData.append("businessLicense", data?.businessLicensePicture);
    }
    if (data?.image) {
      formData.append("image", data?.image);
    }

    try {
      await CallApi("/api/host/branches", "post", formData);
      navigate("/host/list-branch");
      toast.success(`Tạo chi nhánh ${data?.branchName} thành công!`);
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
      console.error("Lỗi khi lấy danh sách thuộc tính chi nhánh:", error);
    }
  };

  const handleConfirmPayment = () => {
    if (formData) {
      createBranch(formData);
    }
  };

  const serviceOptions = useMemo(
    () =>
      branchAtbList.map((item, index) => ({
        name: `attributeBranches[${index}]`,
        key: item.id,
        label: item.name,
        type: "select-custom",
        required: false,
        options: item.attributeBranches.map((itemChildren) => ({
          key: itemChildren.id,
          label: itemChildren.value,
        })),
        gridWidth: 6,
        onCustomInput: (data) => addNewAttributeValue({ ...data, id: item.id }),
        multiple: true,
      })),
    [branchAtbList, addNewAttributeValue]
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
      case "datetime":
        return <DatePickerCp field={field} control={control} errors={errors} />;
      case "checkbox":
        return <CheckboxCp field={field} control={control} errors={errors} />;
      case "file":
      case "image":
        return <FileUploadCp field={field} control={control} errors={errors} />;
      case "section":
        return <SectionCp field={field} />;
      case "province-select":
        return (
          <ProvinceSelect
            field={field}
            control={control}
            errors={errors}
            provinces={provinces}
          />
        );
      case "district-select":
        return (
          <DistrictSelect
            field={field}
            control={control}
            errors={errors}
            districts={districts}
          />
        );
      case "ward-select":
        return (
          <WardSelect
            field={field}
            control={control}
            errors={errors}
            wards={wards}
          />
        );
      case "timepicker":
        return <TimePickerCp field={field} control={control} errors={errors} />;
      default:
        return null;
    }
  };

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
        name: "detail",
        label: "Địa chỉ",
        type: "text",
        required: true,
        gridWidth: 12,
      },
      {
        name: "provinces",
        label: "Tỉnh",
        type: "province-select",
        required: true,
        onProvinceChange: (value) => {
          setValue("districts", "");
          setValue("wards", "");
          fetchDistricts(value);
        },
        provinces: provinces,
        gridWidth: 4,
      },
      {
        name: "districts",
        label: "Huyện",
        type: "district-select",
        required: true,
        provinceId: getValues().provinces?.id,
        onDistrictChange: (value) => {
          setValue("wards", "");
          fetchWards(value);
        },
        districts: districts,
        gridWidth: 4,
      },
      {
        name: "wards",
        label: "Xã",
        type: "ward-select",
        required: true,
        districtId: getValues().districts?.id,
        wards: wards,
        gridWidth: 4,
      },
      {
        name: "branchContact",
        label: "Thông tin liên hệ chi nhánh",
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
        name: "phone",
        label: "Số điện thoại liên hệ",
        type: "tel",
        required: true,
        gridWidth: 6,
      },
      {
        name: "email",
        label: "Địa chỉ email liên hệ",
        type: "email",
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
        name: "openingHours",
        label: "Giờ mở cửa",
        type: "timepicker",
        required: true,
        gridWidth: 6,
      },
      {
        name: "closingHours",
        label: "Giờ đóng cửa",
        type: "timepicker",
        required: true,
        gridWidth: 6,
      },
      ...serviceOptions,
      {
        name: "legalInfo",
        label: "Giấy phép kinh doanh",
        type: "section",
        required: true,
      },
      {
        name: "businessLicensePicture",
        type: "image",
        label: "Ảnh giấy phép kinh doanh",
        required: true,
        gridWidth: 12,
      },
    ],
    [serviceOptions, getValues, setValue]
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
        <Box
          component={Link}
          to="/host/list-branch"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            cursor: "pointer",
            color: "gray",
          }}
        >
          <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="h6">QUAY LẠI</Typography>
        </Box>
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
        <PaymentCreateBranch
          open={openPaymentModal}
          handleClose={handleClosePaymentModal}
          branchName={getValues().branchName || "mới"}
          onConfirmPayment={handleConfirmPayment}
        />
      </Box>
      <MapComponent />
    </Box>
  );
};

export default CreateBranch;
