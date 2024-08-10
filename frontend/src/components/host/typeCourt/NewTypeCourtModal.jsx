import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import DialogInfo from "../../common/DialogInfo";
import AddIcon from "@mui/icons-material/Add";
import CallApi from "../../../service/CallAPI";
import CustomSelectCp from "../FormInput/CustomSelectCp";
import SectionCp from "../FormInput/SectionCp";
import PriceTypeCourtForm from "./PriceTypeCourtForm";
const NewTypeCourtModal = ({ isOpen, onClose, onSave, typeCourt }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [isOpenPriceTypeCourtForm, setIsOpenPriceTypeCourtForm] =
    useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const [branchAtbList, setBranchAtbList] = useState([]);

  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  useEffect(() => {
    if (typeCourt) {
      setValue("name", typeCourt.name);
      setValue("description", typeCourt.description);
      typeCourt?.attributes?.forEach((atb) => {
        const matchingAttribute = branchAtbList.find(
          (item) => item.id === atb.attributeKey.id
        );
        if (matchingAttribute) {
          const matchingValue = matchingAttribute.attributeCourt.find(
            (attr) => attr.value === atb.value.name
          );
          if (matchingValue) {
            setValue(
              `attributeCourt[${matchingValue.attributeKeyCourtId}]`,
              matchingValue.id
            );
          }
        }
      });
      setCurrentImage(typeCourt.image || null);
      setSelectedImage(null);
    } else {
      reset();
      setSelectedImage(null);
      setCurrentImage(null);
    }
  }, [typeCourt, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      data.attributeCourt.map(
        (item) => item != "" && formData.append("attributeCourtIds", item)
      );
      await onSave(formData, !!typeCourt, typeCourt?.id);
      handleCancel();
    } catch (error) {
      toast.error("Tạo/Cập nhật loại sân thất bại");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedImage(null);
    setCurrentImage(null);
    onClose();
  };
  const fetchBranchAtbList = async () => {
    try {
      const response = await CallApi(
        `/api/host/attribute-key-court/account`,
        "get"
      );
      setBranchAtbList(response?.data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách thuộc tính cơ sở");
      console.error("Lỗi khi lấy danh sách thuộc tính cơ sở:", error);
    }
  };
  useEffect(() => {
    fetchBranchAtbList();
  }, []);

  const addNewAttributeValue = useCallback(async (data) => {
    const requestData = {
      value: data.value,
      attributeKeyCourtId: data.id,
    };
    try {
      const response = await CallApi(
        "/api/host/attribute-court",
        "post",
        requestData
      );
      toast.success(`Tạo ${response?.data?.value} thành công!`);

      setBranchAtbList((prevList) =>
        prevList?.map((item) =>
          item.id === data.id
            ? {
                ...item,
                attributeCourt: [
                  ...item.attributeCourt,
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

  const serviceOptions = useMemo(
    () =>
      branchAtbList?.map((item) => {
        return {
          name: `attributeCourt[${item.id}]`,
          key: item.id,
          label: item.name,
          type: "select-custom",
          required: false,
          options: item?.attributeCourt?.map((itemChildren) => ({
            key: itemChildren.id,
            label: itemChildren.value,
          })),
          gridWidth: 6,
          onCustomInput: (data) =>
            addNewAttributeValue({ ...data, id: item.id }),
          multiple: true,
        };
      }),
    [branchAtbList, addNewAttributeValue]
  );
  const additionInfo = [
    {
      name: "additionInfo",
      label: "Thông tin thêm",
      type: "section",
      required: true,
    },
    ...serviceOptions,
  ];
  const renderField = (field) => {
    switch (field.type) {
      case "section":
        return <SectionCp field={field} />;
      case "select-custom":
        return (
          <CustomSelectCp
            field={field}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "90%",
            sm: "75%",
            md: "60%",
          },
          maxWidth: 1200,
          bgcolor: "background.paper",
          boxShadow: 24,
          pt: 2,
          pb: 3,
          px: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h6">
            {typeCourt ? "Cập nhật loại sân" : "Tạo loại sân"}
          </Typography>
          <IconButton
            onClick={handleCancel}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container item justifyItems={"center"}>
            <Grid item xs={6}>
              {currentImage && (
                <Box>
                  <img
                    src={currentImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/**dang anh */}
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.size <= 10 * 1024 * 1024) {
                        handleImageChange(event);
                      } else {
                        handleOpenDialogInfo(
                          "Kích thước ảnh phải nhỏ hơn hoặc bằng 10MB."
                        );
                        event.target.value = null;
                      }
                    }}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="text" component="span">
                      {selectedImage || currentImage ? (
                        "Thay đổi ảnh"
                      ) : (
                        <Box
                          sx={{
                            width: "200px", // Adjust the width as needed
                            height: "200px", // Ensures the box is square
                            border: "1px dashed #ccc", // Dashed border to match the design
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#f9f9f9", // Optional: subtle hover effect
                            },
                          }}
                        >
                          <IconButton>
                            <AddIcon fontSize="large" sx={{ color: "#aaa" }} />
                          </IconButton>
                          <Typography variant="body2" sx={{ color: "#aaa" }}>
                            Ảnh cơ sở
                          </Typography>
                        </Box>
                      )}
                    </Button>
                  </label>

                  {/**dang anh copy*/}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Tên loại sân không được để trống",
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Tên không thể chỉ chứa khoảng trắng",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    placeholder="Tên loại sân"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Mô tả"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mt: 2 }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid
            item
            sm={12}
            md={12}
            container
            spacing={2}
            sx={{
              // width: "300px", // Set the desired width
              height: "200px", // Set the desired height
              overflowY: "auto", // Enable vertical scrolling
              overflowX: "hidden", // Hide horizontal scrolling (if needed)
              border: "1px solid #ccc", // Optional: Add a border around the grid
              padding: "8px", // Optional: Add some padding inside the box
              margin: "8px",
            }}
          >
            {additionInfo?.map((business) =>
              business.name == "additionInfo" ? (
                <Grid
                  sm={12}
                  md={12}
                  key={`${business.name}-${JSON.stringify(business.options)}`}
                >
                  {renderField(business)}
                </Grid>
              ) : (
                <Grid
                  container
                  item
                  sm={4}
                  md={4}
                  key={`${business.name}-${JSON.stringify(business.options)}`}
                >
                  {renderField(business)}
                </Grid>
              )
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {typeCourt ? "Cập nhật" : "Tạo"}
          </Button>
        </form>
        <Button
          onClick={() => {
            setIsOpenPriceTypeCourtForm(true);
          }}
        >
          open pritile codsf
        </Button>
        {isOpenPriceTypeCourtForm && (
          <PriceTypeCourtForm
            listTime={[]}
            open={isOpenPriceTypeCourtForm}
            onClose={() => {
              setIsOpenPriceTypeCourtForm(false);
            }}
            onSubmit={(data) => {
              setIsOpenPriceTypeCourtForm(false);
              console.log("data giá", data);
            }}
          />
        )}
        {isOpenDialogInfo && (
          <DialogInfo
            handleClose={handleCloseDialogInfo}
            open={isOpenDialogInfo}
            title={titleDialog}
          />
        )}
      </Box>
    </Modal>
  );
};

NewTypeCourtModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  typeCourt: PropTypes.object,
};

export default NewTypeCourtModal;
