import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";

export default function BookedCourtsRow({ row }) {
    const { courtName, bookingDate, timeSlot, post } = row;
    const [status, setStatus] = useState("");

    useEffect(() => {
        const currentDateTime = new Date();
        const [startTime, endTime] = timeSlot.split(" - ").map(time => new Date(`${bookingDate}T${time}`));

        if (currentDateTime < startTime) {
            setStatus("Chưa diễn ra");
        } else if (currentDateTime >= startTime && currentDateTime <= endTime) {
            setStatus("Đang diễn ra");
        } else {
            setStatus("Đã diễn ra");
        }
    }, [bookingDate, timeSlot]);

    const renderButton = () => {
        if (post) {
            return <Box className="flex justify-center items-center">
                <Button variant="contained">Xem bài đăng</Button>
            </Box>
        } else if (status === "Đã diễn ra") {
            return <Box className="flex justify-center items-center">
                <Button variant="contained" disabled>Tạo bài đăng</Button>
            </Box>
        } else {
            return <Box className="flex justify-center items-center">
                <Button variant="contained" color="success">Tạo bài đăng</Button>
            </Box>
        }
    };

    return (
        <TableRow className="transition-opacity duration-1000 hover:bg-gray-100">
            <TableCell className="p-2 w-1/5">
                <Tooltip title={courtName}>
                    <Typography variant="subtitle2" className="text-center" noWrap>{courtName}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell className="p-2 text-center w-1/5">
                <Typography variant="subtitle2" className="font-bold text-center" noWrap>{bookingDate}</Typography>
            </TableCell>
            <TableCell className="p-2 text-center w-1/5">
                <Typography variant="subtitle2" className="font-bold text-center" noWrap>{timeSlot}</Typography>
            </TableCell>
            <TableCell className="p-2 text-center w-1/5">
                {renderButton()}
            </TableCell>
            <TableCell className="p-2 text-center w-1/5">
                <Typography variant="subtitle2" className="text-center" noWrap>{status}</Typography>
            </TableCell>
        </TableRow>
    );
}

BookedCourtsRow.propTypes = {
    row: PropTypes.shape({
        courtName: PropTypes.string.isRequired,
        bookingDate: PropTypes.string.isRequired,
        timeSlot: PropTypes.string.isRequired,
        post: PropTypes.bool.isRequired,
    }).isRequired,
};
