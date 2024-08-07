import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import Loading from "../../../components/common/Loading";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function RequestListJoin() {
  const [requestList, setRequestList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const api = "/api/user/user-available/request-list-join";
  const apiInvitation = "/api/user/invitation/update";

  const getRequestList = async () => {
    setIsLoading(true);
    try {
      const data = await CallApi(api, "get");
      console.log("🚀 ========= data:", data);
      setRequestList(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const changeStatusInvitation = async (id, status, reason) => {
    console.log("🚀 ========= id, status, reason:", id, status, reason);
    try {
      const result = await CallApi(apiInvitation, "post", {
        invitationId: id,
        status: status,
        reasonCancel: reason,
      });
      console.log("🚀 ========= result:", result);
      getRequestList();
      toast.success("Hủy thành công");
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  React.useEffect(() => {
    getRequestList();
  }, []);

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
        <>
          {requestList.length < 1 ? (
            <div>Bạn chưa có yêu cầu xin chơi trận nào</div>
          ) : (
            requestList?.map((item) => (
              <div key={item?.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        to={`/post/${item?.Post?.id}`}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Tên bài post: {item?.Post?.booking?.bookingInfo?.name}
                      </Link>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item?.Post?.booking?.account?.user?.fullName}
                        </Typography>
                        {" - Thời gian xin tham gia: "}
                        {getTimeSinceCreation(item?.updatedAt)}
                      </React.Fragment>
                    }
                  />
                  <div>
                    <Button
                      onClick={() =>
                        changeStatusInvitation(
                          item?.id,
                          "CANCEL",
                          "Hủy lời mời"
                        )
                      }
                    >
                      Hủy yêu cầu
                    </Button>
                  </div>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))
          )}
        </>
      )}
    </List>
  );
}
