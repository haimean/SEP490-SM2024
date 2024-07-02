import React from 'react';
import AvailableCourt from '../../../components/user/AvailableCourt/AvailableCourt.jsx';
import Navbar from "../../../layouts/player/Navbar.jsx";
import Footer from "../../../layouts/player/Footer.jsx";

const AvailableCourtPage = () => {

  return (
    <div>
      <Navbar />
      <AvailableCourt/>
      <Footer />
    </div>
  );
};

export default AvailableCourtPage;
