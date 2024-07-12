import React from 'react';
import BookedCourtsTable from '../../../components/user/ViewListBooked/BookedCourtsTable.jsx';
import Navbar from "../../../layouts/player/Navbar.jsx";
import Footer from "../../../layouts/player/Footer.jsx";
import { Container } from '@mui/material';

const BookedCourts = () => {

  return (
    <div>
      <Navbar />
      <Container className="my-24">
        <BookedCourtsTable />
      </Container>
      <Footer />
    </div>
  );
};

export default BookedCourts;
