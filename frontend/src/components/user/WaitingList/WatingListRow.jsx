import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip"; // Thêm Tooltip từ Material-UI
import { toast } from "react-toastify";
import CallApi from "../../../service/CallAPI";

export default function WaitingListRow({ row, handleInvite, postId }) {
  console.log("🚀 ========= row:", row);
  if (!row?.account) {
    return "Không có dữ liệu";
  }
  const { email, avatarUrl, friendliness } = row.account;
  // const { fullName, gender } = row?.userAvailability?.account?.user;
  const { id } = row;

  // console.log("🚀 ========= fullName:", fullName);
  const [isInvited, setIsInvited] = useState(false);

  const handleInviteClick = () => {
    setIsInvited(true);
    setTimeout((id) => {
      handleInvite(id);
    }, 1000); // Thời gian mờ dần là 1 giây
  };
  const sendInvitation = async (id) => {
    try {
      const result = await CallApi(
        "/api/user/invitation/requests-to-match",
        "post",
        {
          postId: postId,
          userAvailabilityId: id,
        }
      );
      toast.success("Mời thành công");
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
  };
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{
            paddingLeft: "1.5rem",
            width: "20%",
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={
                row?.account?.user?.fullName !== null
                  ? row?.account?.user?.fullName
                  : ""
              }
              src={
                row?.account?.user?.avatar !== null
                  ? row?.account?.user?.avatar
                  : avatarUrl
              }
            />
            <Tooltip
              title={
                row?.account?.user?.fullName !== null
                  ? row?.account?.user?.fullName
                  : ""
              }
            >
              <Typography variant="subtitle2" noWrap>
                {row?.account?.user?.fullName !== null
                  ? row?.account?.user?.fullName
                  : ""}
              </Typography>
            </Tooltip>
          </Stack>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            width: "20%",
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Tooltip>
            <Typography variant="subtitle2" noWrap>
              {row?.account?.user?.fullName !== null
                ? row?.account?.user?.fullName
                : ""}
            </Typography>
          </Tooltip>
        </TableCell>
        {/* <TableCell align="center">
            <Typography variant="subtitle2" className="font-bold" noWrap>
              {gender == "FEMALE" ? "Nữ" : "Nam"}
            </Typography>
          </TableCell> */}
        <TableCell align="center">
          <Rating value={friendliness} readOnly />
        </TableCell>
        <TableCell align="center">
          {isInvited ? (
            <Button variant="contained" disabled>
              Đã mời
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendInvitation(id)}
            >
              Mời
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
