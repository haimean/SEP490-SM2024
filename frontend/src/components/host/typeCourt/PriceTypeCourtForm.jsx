/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
import DialogInfo from "../../common/DialogInfo";

const PriceTypeCourtForm = ({ listTime = [], open, onClose, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [times, setTimes] = useState(listTime.length === 0 ? 1 : "");
  const [milestones, setMilestones] = useState([
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  ]);
  const [titleDialog, setTitleDialog] = useState("");
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);

  const [priceDetails, setPriceDetails] = useState([]);
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  const {
    control,
    formState: { errors },
  } = useForm();

  const steps = [
    "Bước 1: Nhập số ca/lần",
    "Bước 2: Chọn các mốc thời gian",
    "Bước 3: Nhập chi tiết giá",
  ];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!times) {
        handleOpenDialogInfo("Vui lòng nhập số lần");
        return;
      }
      if (listTime?.length > 0) {
        if (listTime?.includes(Number(times))) {
          handleOpenDialogInfo("Vui lòng nhập số lần khác");
          return;
        }
      }
    }
    if (activeStep === 1) {
      // Check to see if there are any overlapping timelines
      if (hasDuplicateMilestones(milestones)) {
        handleOpenDialogInfo("Có mốc thời gian bị trùng. Vui lòng nhập lại!");
        return;
      }
      // Sắp xếp các mốc thời gian theo thứ tự từ thấp đến cao (bỏ qua 2 mốc đầu)
      const sortedMilestones = milestones.sort((a, b) =>
        a.isBefore(b) ? -1 : 1
      );

      // Tạo chi tiết giá dựa trên các mốc thời gian đã sắp xếp
      const calculatedPriceDetails = [];
      console.log("sortedMilestones", sortedMilestones);
      for (let index = 0; index < sortedMilestones.length - 1; index++) {
        calculatedPriceDetails.push({
          times,
          startTime: sortedMilestones[index].format("HH:mm"),
          endTime: sortedMilestones[index + 1].format("HH:mm"),
          price: "",
        });
      }
      setPriceDetails(calculatedPriceDetails);
    }
    let isErrorPrice = false;
    if (activeStep === 2) {
      priceDetails.forEach((priceDetail) => {
        if (priceDetail.price == "") {
          isErrorPrice = true;
        }
      });
      if (!isErrorPrice) {
        onSubmit(priceDetails);
      } else {
        handleOpenDialogInfo("Bạn phải nhập đầy đủ giá");
      }
    }
    if (activeStep !== 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, dayjs()]);
  };

  const handleRemoveMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const hasDuplicateMilestones = (milestones) => {
    const uniqueValues = new Set();

    for (let milestone of milestones) {
      const timeString = milestone.format("HH:mm");
      if (uniqueValues.has(timeString)) {
        return true;
      }
      uniqueValues.add(timeString);
    }

    return false;
  };

  const handleMilestoneChange = (newValue, index) => {
    const newMilestones = [...milestones];
    newMilestones[index] = newValue;
    setMilestones(newMilestones);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center">
            <TextField
              label="Nhập số lần"
              type="number"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
              disabled={listTime.length === 0}
              className="w-1/2"
              inputProps={{ className: "text-center" }}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center">
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                className="mb-2 mt-3"
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <Controller
                    control={control}
                    name={`milestone_${index}`}
                    defaultValue={milestone}
                    render={({ field }) => (
                      <TimePicker
                        label={`Mốc thời gian ${index + 1}`}
                        value={milestones[index]}
                        onChange={(newValue) =>
                          handleMilestoneChange(newValue, index)
                        }
                        disabled={index === 0 || index === 1} // Vô hiệu hóa hai mốc thời gian đầu
                        slots={{ textField: TextField }}
                        slotProps={{
                          textField: {
                            error: !!errors[`milestone_${index}`],
                            helperText: errors[`milestone_${index}`]?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
                {index > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      marginLeft: "1rem",
                    }}
                    onClick={() => handleRemoveMilestone(index)}
                  >
                    Xóa
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMilestone}
            >
              Thêm mốc thời gian
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            {priceDetails.map((detail, index) => (
              <Grid container spacing={2} key={index} className="mb-2">
                <Grid item xs={3}>
                  <TextField
                    label="Giờ bắt đầu"
                    value={detail.startTime}
                    disabled
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Giờ kết thúc"
                    value={detail.endTime}
                    disabled
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Giá"
                    type="number"
                    value={detail.price}
                    required={true}
                    onChange={(e) => {
                      const newPriceDetails = [...priceDetails];
                      newPriceDetails[index].price = e.target.value;
                      setPriceDetails(newPriceDetails);
                    }}
                    className="w-full"
                  />
                </Grid>
              </Grid>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          maxWidth: 800,
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
            Thiết lập bảng giá
          </Typography>
          <IconButton
            onClick={onClose}
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
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className="mt-3">{renderStepContent(activeStep)}</Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Quay lại
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
          </Button>
        </Box>
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

export default PriceTypeCourtForm;
