import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Tooltip,
  Zoom,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import CallApi from "../../service/CallAPI";
import BookingModal from "./Booking/BookingModal";

const RightSectionHost = ({ id, type, court1 }) => {
  // const { idCourt } = useParams();
  const [court, setCourt] = useState([]);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  useEffect(() => {
    const getAllCourt = async () => {
      try {
        const result = await CallApi(
          type === "Branch"
            ? `/api/host/court/branch/${id}`
            : `/api/host/court/${court1?.id}`,
          "get"
        );
        setCourt(result?.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getAllCourt();
  }, [id, court1, type]);

  const longText = "Sàn: Gỗ<br/>Chất lượng: Tốt<br/>Số lượng: 4 người";

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

  const handleOpenCalendarModal = () => {
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
            <Link to={`/court/${id}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Danh sách sân đấu
              </Button>
            </Link>
            <Link
              to={`/host/booking-history/${id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Lịch sử đặt sân
              </Button>
            </Link>
          </>
        )}
        {type === "courtDetail" && (
          <>
            <Link
              to={`/host/update-court/${court1.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Cập nhật chi tiết sân đấu
              </Button>
            </Link>
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
          {type === "Branch"
            ? court?.map((item) => (
                <Link key={item?.id} to={`/branch/${id}/court/${item?.id}`}>
                  <CustomTooltip title={longText}>
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
              ))
            : ""}
        </List>
      </Paper>
      <BookingModal
        open={isCalendarModalOpen}
        onClose={handleCloseCalendarModal}
        courtId={court1.id}
        court={court}
      />
    </Grid>
  );
};

export default RightSectionHost;
