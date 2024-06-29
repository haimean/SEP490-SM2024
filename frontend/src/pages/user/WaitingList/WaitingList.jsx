import React, {useState} from "react";
import WaitingListTable from "../../../components/user/WaitingList/WaitingListTable.jsx";
import Navbar from "../../../layouts/player/Navbar.jsx";
import Footer from "../../../layouts/player/Footer.jsx";
import { Button, Container } from "@mui/material";

const WaitingList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Navbar />
      <Container>
      <Button onClick={handleOpen}>Open modal</Button>
        <WaitingListTable open={open} onClose={handleClose}/>
      </Container>
      <Footer />
    </div>
  );
};

export default WaitingList;
