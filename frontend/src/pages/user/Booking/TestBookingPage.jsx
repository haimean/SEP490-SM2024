import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingLeftCP from '../../../components/user/BookingTable/BookingLeftCP';
import BookingRightCP from '../../../components/user/BookingTable/BookingRightCP';
import BookingTable from '../../../components/user/BookingTable/BookingTable';

const TestBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);

  const [bookModal, setBookModal] = useState(false);
  const handleOpenBook = () => setBookModal(true);
  const handleCloseBook = () => setBookModal(false);

  const [date, setDate] = useState('');
  const [startHour, setStartHour] = useState('');
  const [otherInfo, setOtherInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleCheckAvailability = () => {
    // Handle check availability logic here
  };

  const map = (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238341.61060617006!2d105.53860539453123!3d21.029177999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4caf655555%3A0x4debb020d93041f0!2sFpt%20Software!5e0!3m2!1svi!2s!4v1719668441308!5m2!1svi!2s"
      width={705}
      height={400}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BookingLeftCP map={map}/>
        </Grid>
        <Grid item xs={6}>
          <BookingRightCP
            date={date}
            setDate={setDate}
            startHour={startHour}
            setStartHour={setStartHour}
            handleOpenBook={handleOpenBook}
            handleCheckAvailability={handleCheckAvailability}
            otherInfo={otherInfo}
            setOtherInfo={setOtherInfo}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
      <BookingTable open={bookModal} onClose={handleCloseBook} />
    </Box>
  );
};

export default TestBookingPage;
