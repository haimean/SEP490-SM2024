import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid, Card } from "@mui/material";
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
import EditorInput from "../../../components/host/FormInput/Editor";
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
  const [mapData, setMapData] = useState();
  console.log("🚀 ========= mapData:", mapData);
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
    formData.append("longitude", mapData?.longitude || "107.09848786676099");
    formData.append("latitude", mapData?.latitude || "20.962297338909874");
    formData.append("provinces", mapData?.address?.city || "");
    formData.append(
      "districts",
      mapData?.address?.city_district.replace("Huyện ", "") || ""
    );
    formData.append("wards", mapData?.address.suburb || "");
    formData.append("detail", mapData?.addressDetail || "");
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
      toast.success(`Tạo cơ sở ${data?.branchName} thành công!`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Có lỗi xảy ra khi tạo cơ sở");
    }
  };

  const fetchBranchAtbList = async () => {
    try {
      const response = await CallApi(`/api/host/attribute-branches`, "get");
      setBranchAtbList(response?.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thuộc tính cơ sở:", error);
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
      case "map":
        return (
          <MapComponent
            onSubmit={(data) => {
              setMapData(data);
              console.log(data);
            }}
          />
        );
      case "editor":
        return <EditorInput field={field} control={control} errors={errors} />;
      default:
        return null;
    }
  };

  //avt, thông tin liên hê
  const avt = {
    name: "image",
    type: "image",
    label: "Ảnh cơ sở",
    required: true,
    gridWidth: 12,
  };
  const branchName = {
    name: "branchName",
    label: "Tên cơ sở",
    type: "text",
    required: true,
    gridWidth: 12,
  };
  const description = {
    name: "description",
    label: "Mô tả",
    type: "editor",
    required: true,
    gridWidth: 12,
  };
  const descriptionTitle = {
    name: "descriptionTitle",
    label: "Mô tả thêm",
    type: "section",
    required: true,
    gridWidth: 12,
  };
  const contactInfo = [
    {
      name: "branchContact",
      label: "Thông tin liên hệ cơ sở",
      type: "section",
      required: true,
    },
    {
      name: "managerName",
      label: "Tên quản lý cơ sở",
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
  ];
  const activityInfo = [
    {
      name: "branchWork",
      label: "Giờ hoạt động",
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
  ];
  //giấy phép kinh doanh
  const businessLicense = [
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
  ];
  //Địa chỉ
  const branchAddress = [
    {
      name: "branchLocation",
      label: "Địa chỉ cơ sở",
      type: "section",
      required: true,
    },
    {
      name: "map",
      label: "Map",
      type: "map",
      required: true,
      gridWidth: 12,
    },
  ];
  //Thông tin thêm
  const additionInfo = [
    {
      name: "additionInfo",
      label: "Thông tin thêm",
      type: "section",
      required: true,
    },
    ...serviceOptions,
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
        <Typography variant="h4" component="h3" className="text-center">
          Tạo cơ sở mới
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={6} justifyContent={"center"}>
              <Grid
                item
                sm={12}
                md={12}
                key={`${avt.name}-${JSON.stringify(avt.options)}`}
              >
                {renderField(avt)}
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={2}>
              <Grid
                item
                sm={12}
                md={12}
                key={`${branchName.name}-${JSON.stringify(branchName.options)}`}
              >
                {renderField(branchName)}
              </Grid>
              <Grid item>
                <Card variant="outlined" className="w-full p-3 pt-0">
                  <Grid
                    container
                    item
                    sm={12}
                    md={12}
                    spacing={2}
                    className="p-2"
                  >
                    {contactInfo.map((contact) => (
                      <Grid
                        container
                        item
                        sm={12}
                        md={12}
                        key={`${contact.name}-${JSON.stringify(
                          contact.options
                        )}`}
                      >
                        {renderField(contact)}
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
              <Grid item>
                <Card variant="outlined" className="w-full p-3 pt-0">
                  <Grid
                    container
                    item
                    sm={12}
                    md={12}
                    spacing={2}
                    className="p-2"
                  >
                    {activityInfo.map((activity) =>
                      activity.name == "branchWork" ? (
                        <Grid
                          container
                          item
                          sm={12}
                          md={12}
                          key={`${activity.name}-${JSON.stringify(
                            activity.options
                          )}`}
                        >
                          {renderField(activity)}
                        </Grid>
                      ) : (
                        <Grid
                          container
                          item
                          sm={6}
                          md={6}
                          key={`${activity.name}-${JSON.stringify(
                            activity.options
                          )}`}
                        >
                          {renderField(activity)}
                        </Grid>
                      )
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2} className="w-full pt-3">
            <Grid item sm={6} md={6} container>
              <Card variant="outlined" className="w-full p-3 pt-1">
                {businessLicense.map((business) => (
                  <Grid
                    container
                    item
                    sm={12}
                    md={12}
                    key={`${business.name}-${JSON.stringify(business.options)}`}
                  >
                    {renderField(business)}
                  </Grid>
                ))}
              </Card>
            </Grid>
            <Grid item sm={6} md={6} container>
              <Card variant="outlined" className="w-full p-3 pt-0">
                {branchAddress.map((business) => (
                  <Grid
                    container
                    item
                    sm={12}
                    md={12}
                    key={`${business.name}-${JSON.stringify(business.options)}`}
                  >
                    {renderField(business)}
                  </Grid>
                ))}
              </Card>
            </Grid>
          </Grid>
          <Grid item container className="w-full pt-3">
            <Card variant="outlined" className="w-full p-3 pt-1">
              <Grid item sm={12} md={12} container spacing={2}>
                {additionInfo.map((business) =>
                  business.name == "additionInfo" ? (
                    <Grid
                      container
                      item
                      sm={12}
                      md={12}
                      key={`${business.name}-${JSON.stringify(
                        business.options
                      )}`}
                    >
                      {renderField(business)}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      item
                      sm={4}
                      md={4}
                      key={`${business.name}-${JSON.stringify(
                        business.options
                      )}`}
                    >
                      {renderField(business)}
                    </Grid>
                  )
                )}
              </Grid>
            </Card>
          </Grid>
          <Grid item container spacing={2}>
            <Grid
              container
              item
              sm={12}
              md={12}
              key={`${descriptionTitle.name}-${JSON.stringify(
                descriptionTitle.options
              )}`}
            >
              {renderField(descriptionTitle)}
            </Grid>
            <Grid
              container
              item
              sm={12}
              md={12}
              key={`${description.name}-${JSON.stringify(description.options)}`}
            >
              {renderField(description)}
            </Grid>
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
              Tạo cơ sở
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
    </Box>
  );
};

export default CreateBranch;
