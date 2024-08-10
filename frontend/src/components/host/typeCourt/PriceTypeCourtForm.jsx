import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Grid, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import TimePickerCp from "../FormInput/TimePickerCp.jsx";
import dayjs from "dayjs";

const PriceTypeCourtForm = ({ listTime = [] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [times, setTimes] = useState(listTime.length === 0 ? 1 : '');
  const [milestones, setMilestones] = useState([]);
  const [priceDetails, setPriceDetails] = useState([]);
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const steps = ['Step 1: Number of Times', 'Step 2: Time Milestones', 'Step 3: Price Details'];

  const defaultStartTime = dayjs('05:00', 'HH:mm').format("HH:mm");
  const defaultEndTime = dayjs('22:00', 'HH:mm').format("HH:mm");
  console.log(defaultStartTime, defaultEndTime);
  
  const onSubmit=(data) => {
    if(data){

      const times = Object.keys(data).map((key) =>    dayjs(data[key]).format("HH:mm") );
      console.log('gio',data  );
      console.log('gio',times  );
    }
  }
  const handleNext = () => {
    if (activeStep === 1) {
      console.log('gio');
      handleSubmit(onSubmit)();

      const calculatedPriceDetails = [];
      let lastTime = defaultStartTime;
      const formatMilestones = milestones.map((key) =>    dayjs(milestones[key]).format("HH:mm") );
// console.log(formatMilestones);
console.log(formatMilestones);

formatMilestones.forEach((milestone, index) => {
        calculatedPriceDetails.push({
          start: lastTime,
          end: milestone,
          // end: milestone.format('HH:mm'),
          price: '',
        });
        lastTime = milestone;
      });
console.log(lastTime);

      calculatedPriceDetails.push({
        start: lastTime,
        // start: lastTime.format('HH:mm'),
        end: defaultEndTime,
        price: '',
      });

      setPriceDetails(calculatedPriceDetails);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  const handleMilestoneChange = (value, index) => {
    const newMilestones = [...milestones];
    newMilestones[index] = dayjs(value);
    setMilestones(newMilestones);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center">
            <TextField
              label="Number of Times"
              type="number"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
              disabled={listTime.length === 0}
              helperText="Enter the number of times"
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
                  <TimePickerCp
                    field={{ name: 'Gio ' + index, required: true, label: `Time Milestone ${index + 1}` }}
                    control={control}
                    errors={errors}
                  />
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveMilestone(index)}>Remove</Button>
                </Box>
              ))}
            <Button variant="contained" color="primary" onClick={handleAddMilestone}>Add Milestone</Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            {priceDetails.map((detail, index) => (
              <Grid container spacing={2} key={index} className="mb-2">
                <Grid item xs={3}>
                  <TextField
                    label="Start Time"
                    value={detail.start}
                    disabled
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="End Time"
                    value={detail.end}
                    disabled
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Price"
                    type="number"
                    value={detail.price}
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
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{renderStepContent(activeStep)}</Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default PriceTypeCourtForm;
