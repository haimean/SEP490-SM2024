import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import Loading from "../../../components/common/Loading";
import { Box, Button, Card, Grid, Tab, Tabs } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormatTime from "../../../utils/user/formatTime";
import haversine from "haversine";
import useDialogConfirm from "../../../hooks/useDialogConfirm";
import RequestListJoinCp from "../../../components/user/RequestListJoin/RequestListJoinCp";

export default function RequestListJoin() {
  const [requestList, setRequestList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        (error) => {
          toast.warning(error.message);
        }
      );
    } else {
      toast.warning("Không lấy được vị trí hiện tại");
    }
  };
  const api = "/api/user/user-available/request-list-join";
  const apiInvitation = "/api/user/invitation/update";

  const getRequestList = async () => {
    setIsLoading(true);
    try {
      const data = await CallApi(api, "post", {
        status: value == 0 ? "NEW" : value == 1 ? "ACCEPT" : "NOACCEPT",
      });
      console.log("🚀 ========= data:", data);
      setRequestList(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const { openDialog, DialogComponent } = useDialogConfirm();

  const changeStatusInvitation = async (id, status, reason) => {
    console.log("🚀 ========= id, status, reason:", id, status, reason);
    try {
      await openDialog(
        "Bạn có chắc chắn chắn hủy trận đấu không?",
        async () => {
          await CallApi(apiInvitation, "post", {
            invitationId: id,
            status: status,
            reasonCancel: reason,
          });
          getRequestList();
          toast.success("Hủy thành công");
        }
      );
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  React.useEffect(() => {
    getRequestList();
  }, [value]);

  const distance = (latitude, longitude) => {
    return haversine(
      {
        latitude: latitude || "21.013393218627524",
        longitude: longitude || "105.52526950492785",
      },
      {
        latitude: location?.latitude || "21.013393218627524",
        longitude: location?.longitude || "105.52526950492785",
      }
    );
  };
  console.log(
    "🚀 ========= distance:",
    distance("21.013393218627524", "105.52526950492785")
  );
  React.useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <List
      sx={{
        width: "100%",
        paddingLeft: "15%",
        paddingRight: "15%",
        bgcolor: "background.paper",
        paddingTop: "5%",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={1}>
          <Typography variant="h5" component="h6">
            Lịch sử xin vào trận
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Lịch sử xin vào trận" {...a11yProps(0)} />
                <Tab label="Danh sách trận đã tham gia" {...a11yProps(1)} />
                <Tab label="Danh sách trận đã hủy" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Box>
          {value == 0 &&
            requestList?.map((item) => (
              <RequestListJoinCp
                key={item?.id}
                item={item}
                changeStatusInvitation={changeStatusInvitation}
              />
            ))}
          {value == 1 &&
            requestList?.map((item) => (
              <RequestListJoinCp
                key={item?.id}
                item={item}
                changeStatusInvitation={changeStatusInvitation}
              />
            ))}
          {value == 2 &&
            requestList?.map((item) => (
              <RequestListJoinCp
                key={item?.id}
                item={item}
                changeStatusInvitation={changeStatusInvitation}
              />
            ))}
          <DialogComponent />
        </Grid>
      )}
    </List>
  );
}
