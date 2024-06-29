import React from 'react';
import BookingTable from '../../../components/user/BookingTable/BookingTable';
import Navbar from "../../../layouts/player/Navbar.jsx";
import Footer from "../../../layouts/player/Footer.jsx";

const BookingTablePage = () => {

  return (
    <div>
      <Navbar />
      <BookingTable/>
      <Footer />
    </div>
  );
};

export default BookingTablePage;
