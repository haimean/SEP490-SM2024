/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CallApi from "../../../service/CallAPI";
import { Close } from "@mui/icons-material";
import CustomSelectCp from "../FormInput/CustomSelectCp";
import DialogInfo from "../../common/DialogInfo";
import PriceTypeCourtForm from "./PriceTypeCourtForm";
import SectionCp from "../FormInput/SectionCp";
import TimeLinePrice from "./TimeLinePrice";
import TutorialUsing from "./TutorialUsing";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const NewTypeCourtModal = ({ isOpen, onClose, onSave, typeCourt }) => {
  const {
    control,
    handleSubmit,
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
  //list giá
  const [priceTypeCourt, setPriceTypeCourt] = useState([]);
  //list
  const [getListTime, setGetListTime] = useState([]);
  const [isTutorial, setIsTutorial] = useState(true);
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
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
    if (typeCourt) {
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
    }
  }, [branchAtbList]);

  useEffect(() => {
    fetchBranchAtbList();
    if (typeCourt) {
      setValue("name", typeCourt.name);
      setValue("description", typeCourt.description);
      const dataSet = Object.values(typeCourt?.priceTypeCourt);
      const result = dataSet?.reduce((acc, item) => {
        const key = item.times;
        if (!acc[key]) {
          acc[key] = [];
        }
        if (item) {
          console.log(typeof dayjs(new Date(item?.startTime)).format("HH:mm"));
          console.log(dayjs(new Date(item?.startTime)).format("HH:mm"));
          // acc[key].push(item);
          acc[key].push({
            price: item.price,
            times: item.times,
            startTime: dayjs(new Date(item?.startTime)).format("HH:mm"),
            endTime: dayjs(new Date(item?.endTime)).format("HH:mm"),
          });
        }
        return acc;
      }, []);
      const list = result?.map((item, index) => index);
      setGetListTime(list);
      setPriceTypeCourt(result);
      console.log("typeCourt?.image", typeCourt?.image);
      setCurrentImage(typeCourt?.image);
      // setSelectedImage(typeCourt?.image);
    } else {
      setSelectedImage(null);
      setCurrentImage(null);
    }
  }, [typeCourt]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      if (selectedImage) {
        formData.append("image", selectedImage);
      } else {
        if (!typeCourt) {
          handleOpenDialogInfo("Ảnh là bắt buộc");
          return;
        }
      }

      data.attributeCourt.map(
        (item) => item != "" && formData.append("attributeCourtIds", item)
      );
      console.log("priceTypeCourt", priceTypeCourt);

      if (priceTypeCourt[1]) {
        const valuePriceTypeCourt = priceTypeCourt
          .filter((item) => item !== null)
          .flat();
        console.log("priceTypeCourt", valuePriceTypeCourt);
        valuePriceTypeCourt.forEach((item) => {
          formData.append("priceTypeCourt", JSON.stringify(item));
        });
      } else {
        handleOpenDialogInfo("Giá là bắt buộc");
        return;
      }

      // await onSave(formData, !!typeCourt, typeCourt?.id);

      try {
        if (typeCourt) {
          await CallApi(
            `/api/host/type-court/${typeCourt?.id}`,
            "put",
            formData
          );
        } else {
          await CallApi("/api/host/type-court", "post", formData);
        }
        toast.success(
          typeCourt ? "Cập nhật kiểu sân thành công" : "Tạo kiểu sân thành công"
        );
        await onSave();
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } catch (error) {
      toast.error("Tạo/Cập nhật kiểu sân thất bại");
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
    setSelectedImage(null);
    setCurrentImage(null);
    setPriceTypeCourt([]);
    setGetListTime([]);
    onClose();
  };

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
  const additionInfoSection = {
    name: "additionInfo",
    label: "Thông tin thêm",
    type: "section",
    required: true,
  };

  const additionInfo = [...serviceOptions];
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
  const handleOpenTutorial = () => {
    setIsTutorial(true);
  };
  const handleCloseTutorial = () => {
    setIsTutorial(false);
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
          height: "600px", // Set the desired height
          overflowY: "auto", // Enable vertical scrolling
          overflowX: "hidden", // Hide horizontal scrolling (if needed)
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
            {typeCourt ? "Cập nhật kiểu sân" : "Tạo kiểu sân"}
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
                      if (file && file.size <= 1 * 1024 * 1024) {
                        handleImageChange(event);
                      } else {
                        handleOpenDialogInfo(
                          "Kích thước ảnh phải nhỏ hơn hoặc bằng 1MB."
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
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Tên kiểu sân không được để trống",
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Tên không thể chỉ chứa khoảng trắng",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Tên kiểu sân"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Mô tả là bắt buộc",
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Tên không thể chỉ chứa khoảng trắng",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Mô tả"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mt: 2 }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            sx={{
              border: "1px solid #ccc", // Optional: Add a border around the grid
            }}
          >
            <Grid
              sx={{
                marginLeft: "2rem",
                marginTop: "1rem",
              }}
              sm={12}
              md={12}
            >
              {renderField(additionInfoSection)}
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              container
              spacing={2}
              sx={{
                width: "auto", // Set the desired width
                height: "200px", // Set the desired height
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "hidden", // Hide horizontal scrolling (if needed)
                padding: "8px", // Optional: Add some padding inside the box
                margin: "8px",
              }}
            >
              {additionInfo?.map((business) => (
                <Grid
                  container
                  item
                  sm={4}
                  md={4}
                  key={`${business.name}-${JSON.stringify(business.options)}`}
                >
                  {renderField(business)}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            container
            sx={{
              border: "1px solid #ccc",
              marginTop: "1rem", // Optional: Add a border around the grid
            }}
          >
            <Grid
              sx={{
                marginLeft: "2rem",
                marginTop: "1rem",
              }}
              sm={12}
              md={12}
            >
              {renderField({
                name: "price",
                label: "Giá cho kiểu sân",
                type: "section",
                required: true,
              })}
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              container
              spacing={2}
              sx={{
                width: "auto", // Set the desired width
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "hidden", // Hide horizontal scrolling (if needed)
                padding: "8px", // Optional: Add some padding inside the box
                margin: "8px",
              }}
            >
              {priceTypeCourt?.map((item, indexItem) => (
                <Grid
                  item
                  sm={12}
                  md={12}
                  key={indexItem}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    margin: "0 12px",
                    border: "1px solid #ccc",
                    padding: "1rem",
                  }}
                >
                  <TimeLinePrice step={item} />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setPriceTypeCourt((prev) => {
                        const data = prev.filter(
                          (item, index) => index !== indexItem
                        );
                        const list = data?.map((item, index) => index);
                        setGetListTime(list);
                      });
                    }}
                  >
                    Xóa bảng giá
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem",
              }}
            >
              <Button onClick={handleOpenTutorial}>Hướng dẫn</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setIsOpenPriceTypeCourtForm(true);
                }}
              >
                Thêm mới bảng giá
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
          >
            <Button type="submit" variant="contained" color="primary">
              {typeCourt ? "Cập nhật" : "Tạo"}
            </Button>
          </Box>
        </form>

        {isOpenPriceTypeCourtForm && (
          <PriceTypeCourtForm
            listTime={getListTime}
            open={isOpenPriceTypeCourtForm}
            onClose={() => {
              setIsOpenPriceTypeCourtForm(false);
            }}
            onSubmit={(data) => {
              setIsOpenPriceTypeCourtForm(false);
              let prev = priceTypeCourt;
              if (data[0]?.times) {
                const key = data[0].times;
                prev[key] = data;
                console.log("prev", prev);
              }
              if (prev.length > 0) {
                const list = prev?.map((item, index) => index);
                setGetListTime(list);
              } else {
                setGetListTime([]);
              }
              setPriceTypeCourt(prev);
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
        {isTutorial && (
          <TutorialUsing open={isTutorial} handleClose={handleCloseTutorial} />
        )}
      </Box>
    </Modal>
  );
};

export default NewTypeCourtModal;
