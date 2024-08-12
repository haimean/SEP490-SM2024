/* eslint-disable react/prop-types */
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TimeLinePrice = ({ step = [] }) => {
  const [times, setTimes] = useState(null);
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    setTimes(step[0].times);
    const dataStep = [];
    step.forEach((element) => {
      dataStep.push({ time: element?.startTime });
      dataStep.push({ price: element?.price });
    });
    dataStep.push({ time: step[step.length - 1]?.endTime });
    setSteps(dataStep);
  }, [step]);
  return (
    <Box>
      <Typography variant="h" component="h2" fontWeight={600} className="mt-5">
        Giá cho {times} đặt lần trở lên
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Stepper alternativeLabel>
          {steps.map((data, index) => {
            if (index % 2 === 0) {
              return (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={() => {
                      return <span>{data.time}</span>;
                    }}
                  ></StepLabel>
                </Step>
              );
            } else {
              return (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={() => {
                      return <span>Giá</span>;
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data.price)}
                  </StepLabel>
                </Step>
              );
            }
          })}
        </Stepper>
      </Box>
    </Box>
  );
};
export default TimeLinePrice;
