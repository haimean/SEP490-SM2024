import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

export default function WatingListRow({ row, handleInvite }) {
  const { name, avatarUrl, title, level, friendliness } = row;
  const [isInvited, setIsInvited] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleInviteClick = () => {
    setIsInvited(true);
    setIsFading(true);
    setTimeout(() => {
      handleInvite(name);
    }, 1000); // Thời gian mờ dần là 1 giây
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        className={`transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        <TableCell component="th" scope="row" padding="none" sx={{ paddingLeft: '1.5rem' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{title}</TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" className="font-bold" noWrap>
            {level}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Rating value={friendliness} readOnly />
        </TableCell>
        <TableCell align="center">
          {isInvited ? (
            <Button variant="contained" disabled>
              Đã mời
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleInviteClick}>
              Mời
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

WatingListRow.propTypes = {
  row: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    friendliness: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleInvite: PropTypes.func.isRequired,
};
