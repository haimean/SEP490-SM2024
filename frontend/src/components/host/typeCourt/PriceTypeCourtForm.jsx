import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Grid, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PriceTypeCourtForm = ({ listTime = [], open, onClose  }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [times, setTimes] = useState(listTime.length === 0 ? 1 : '');
  const defaultStartTime = dayjs().startOf('day');
  const defaultEndTime = dayjs().endOf('day');
  const [milestones, setMilestones] = useState([defaultStartTime, defaultEndTime]);
  const [priceDetails, setPriceDetails] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const steps = ['Bước 1: Nhập số lần', 'Bước 2: Chọn các mốc thời gian', 'Bước 3: Nhập chi tiết giá'];

  const handleNext = () => {
    if (activeStep === 1) {
      // Kiểm tra xem có mốc thời gian nào bị trùng không
      if (hasDuplicateMilestones(milestones)) {
        alert('Có mốc thời gian bị trùng. Vui lòng nhập lại!');
        return;
      }

      // Sắp xếp các mốc thời gian theo thứ tự từ thấp đến cao (bỏ qua 2 mốc đầu)
      const sortedMilestones = [...milestones.slice(2)].sort((a, b) => a.isBefore(b) ? -1 : 1);

      // Tạo chi tiết giá dựa trên các mốc thời gian đã sắp xếp
      const calculatedPriceDetails = [];
      let lastTime = defaultStartTime;

      sortedMilestones.forEach((milestone) => {
        calculatedPriceDetails.push({
          start: lastTime.format('HH:mm'),
          end: milestone.format('HH:mm'),
          price: '',
        });
        lastTime = milestone;
      });

      calculatedPriceDetails.push({
        start: lastTime.format('HH:mm'),
        end: defaultEndTime.format('HH:mm'),
        price: '',
      });

      setMilestones([defaultStartTime, defaultEndTime, ...sortedMilestones]);
      setPriceDetails(calculatedPriceDetails);
    }
    let isErrorPrice = false;
    if (activeStep === 2) {
      console.log(priceDetails);
      priceDetails.forEach((priceDetail) => {
        if (priceDetail.price == '') {
          isErrorPrice = true;
        }
      })
    }
    if (!isErrorPrice) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      alert('Bạn phải nhập đầy đủ giá')
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, defaultStartTime]);
  };

  const handleRemoveMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const hasDuplicateMilestones = (milestones) => {
    const uniqueValues = new Set();

    for (let milestone of milestones) {
      const timeString = milestone.format('HH:mm');
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
              label="Số lần"
              type="number"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
              disabled={listTime.length === 0}
              helperText="Nhập số lần"
              className="w-1/2"
              inputProps={{ className: "text-center" }}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center">
            {milestones.map((milestone, index) => (
              <Box key={index} display="flex" alignItems="center" className="mb-2">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                  <Controller
                    control={control}
                    name={`milestone_${index}`}
                    defaultValue={milestone}
                    render={({ field }) => (
                      <TimePicker
                        label={`Mốc thời gian ${index + 1}`}
                        value={milestones[index]}
                        onChange={(newValue) => handleMilestoneChange(newValue, index)}
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
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveMilestone(index)}>Xóa</Button>
                )}
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={handleAddMilestone}>Thêm mốc thời gian</Button>
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
                    value={detail.start}
                    disabled
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Giờ kết thúc"
                    value={detail.end}
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
      <Stepper sx={{ mt: '4rem' }} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{renderStepContent(activeStep)}</Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Quay lại
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
        </Button>
      </Box>
    </Modal>
  );
};

export default PriceTypeCourtForm;
