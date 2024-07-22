import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import CalendarComponent from "../../../components/host/Booking/BookingCalendar.jsx";

const WaitingList = () => {
  return (
    <div>
      <Container className="mt-24">
      <CalendarComponent />
      </Container>
    </div>
  );
};

export default WaitingList;
