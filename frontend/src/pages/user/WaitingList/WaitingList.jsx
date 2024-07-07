import React, { useState } from "react";
import WaitingListTable from "../../../components/user/WaitingList/WaitingListTable.jsx";
import RequestListTable from "../../../components/user/ResponseToRequest/RequestListTable.jsx";
import Navbar from "../../../layouts/player/Navbar.jsx";
import Footer from "../../../layouts/player/Footer.jsx";
import { Button, Container } from "@mui/material";

const WaitingList = () => {
  const [openWaitingList, setOpenWaitingList] = useState(false);
  const [openRequestList, setOpenRequestList] = useState(false);

  const handleOpenWaitingList = () => setOpenWaitingList(true);
  const handleCloseWaitingList = () => setOpenWaitingList(false);

  const handleOpenRequestList = () => setOpenRequestList(true);
  const handleCloseRequestList = () => setOpenRequestList(false);
  return (
    <div>
      <Navbar />
      <Container className="mt-24">
        <Button onClick={handleOpenWaitingList}>Open Waiting modal</Button>
        <WaitingListTable open={openWaitingList} onClose={handleCloseWaitingList} />
        <Button onClick={handleOpenRequestList}>Open Request modal</Button>
        <RequestListTable open={openRequestList} onClose={handleCloseRequestList} />
      </Container>
      <Footer />
    </div>
  );
};

export default WaitingList;
