import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

export default function RequestListRow({ row, handleContinue }) {
  const { name, avatarUrl, level, friendliness } = row;
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const { type } = row;
  const handleAcceptClick = () => {
    setIsAccepted(true);
    setIsFading(true);
    setTimeout(() => {
      handleContinue(name);
    }, 1000); // Thời gian mờ dần là 1 giây
  };

  const handleRejectClick = () => {
    setIsRejected(true);
    setIsFading(true);
    setTimeout(() => {
      handleContinue(name);
    }, 1000); // Thời gian mờ dần là 1 giây
  };

  return (
    <>
      {type == "UNAVAILABLE" && (
        <TableRow
          hover
          tabIndex={-1}
          className={`transition-opacity duration-1000 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
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
              <Avatar alt={name} src={avatarUrl} />
              <Tooltip title={name}>
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Tooltip>
            </Stack>
          </TableCell>
          {/* <TableCell align="center">
            <Typography variant="subtitle2" className="font-bold" noWrap>
              {level}
            </Typography>
          </TableCell> */}
          {/* <TableCell align="center">
            <Rating value={friendliness} readOnly />
          </TableCell> */}
          <TableCell align="center">
            {isAccepted || isRejected ? (
              <Button
                className="bg-gray-400 text-white font-bold py-2 px-4 rounded"
                disabled
              >
                {isAccepted ? "Đã chấp nhận" : "Đã từ chối"}
              </Button>
            ) : (
              <div className="flex space-x-2 justify-center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAcceptClick}
                >
                  Chấp nhận
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRejectClick}
                >
                  Từ chối
                </Button>
              </div>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
