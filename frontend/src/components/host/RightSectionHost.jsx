/* eslint-disable react/prop-types */

import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";

import BookingHostModal from "./Booking/BookingHostModal";
import CallApi from "../../service/CallAPI";
import { Link } from "react-router-dom";
import UpdateCourt from "../../pages/host/Court/UpdateCourt";
import DialogInfo from "../common/DialogInfo";

const RightSectionHost = ({ id, type, court1 }) => {
  const [court, setCourt] = useState([]);
  const [courts, setCourts] = useState([]);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };

  useEffect(() => {
    const getAllCourt = async () => {
      try {
        if (type === "Branch") {
          const result = await CallApi(`/api/host/court/branch/${id}`, "get");
          setCourts(result?.data);
          setCourt(result?.data[0]);
        } else {
          const result = await CallApi(`/api/host/court/${court1?.id}`, "get");
          setCourt(result?.data);
        }
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getAllCourt();
  }, [id, court1, type]);

  const [updateCourtModal, setUpdateCourtModal] = useState(false);
  const handleOpenModalUpdateCourt = () => {
    setUpdateCourtModal(true);
  };
  const handleCloseModalUpdateCourt = async () => {
    setUpdateCourtModal(false);
  };

  const CustomTooltip = ({ title, children }) => {
    return (
      <Tooltip
        title={<span dangerouslySetInnerHTML={{ __html: title }} />}
        TransitionComponent={Zoom}
        placement="right"
        className="flex gap-2"
      >
        {children}
      </Tooltip>
    );
  };

  const handleBookingHistoryBranch = () => {
    if (courts?.length === 0) {
      handleOpenDialogInfo(
        "Cơ sở này chưa có sân"
      );
      return;
    }
    handleOpenCalendarModal();
  }

  const handleOpenCalendarModal = () => {
    // TODO: check xem là type nào nếu branch thì sửa
    setIsCalendarModalOpen(true);
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarModalOpen(false);
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, px: 2, py: 1 }}>
        {type === "Branch" && (
          <>
            <Link
              to={`/host/update-branch/${id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Sửa cơ sở
              </Button>
            </Link>
            <Link to={`/host/court/${id}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Danh sách sân đấu
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBookingHistoryBranch}
              sx={{ mb: 2 }}
              // disabled={courts?.length === 0}
            >
              Lịch sử đặt sân
            </Button>
          </>
        )}
        {type === "courtDetail" && (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenModalUpdateCourt}
              sx={{ mb: 2 }}
            >
              Sửa thông tin sân
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleOpenCalendarModal} // Open Calendar Modal
            >
              Xem lịch đặt sân
            </Button>
          </>
        )}
        {type === "Branch" ? (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Danh sách sân
              </ListSubheader>
            }
          >
            {courts?.map((item) => (
              <Link key={item?.id} to={`/host/branch/${id}/court/${item?.id}`}>
                <CustomTooltip title={item?.TypeCourt?.name}>
                  <ListItemButton>
                    <img
                      src="https://bizweb.dktcdn.net/100/352/498/products/sancaulong105langha1.jpg?v=1716193376243"
                      width={50}
                      height={50}
                      alt={item?.name}
                    />
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                </CustomTooltip>
              </Link>
            ))}
          </List>
        ) : (
          ""
        )}
      </Paper>
      <BookingHostModal
        open={isCalendarModalOpen}
        onClose={handleCloseCalendarModal}
        court={court}
      />
      {updateCourtModal && (
        <UpdateCourt
          id={court1?.id}
          open={updateCourtModal}
          handleClose={handleCloseModalUpdateCourt}
        />
      )}
      {isOpenDialogInfo && (
        <DialogInfo
          handleClose={handleCloseDialogInfo}
          open={isOpenDialogInfo}
          title={titleDialog}
        />
      )}
    </Grid>
  );
};

export default RightSectionHost;
