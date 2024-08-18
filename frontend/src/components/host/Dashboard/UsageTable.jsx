/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import clsx from "clsx";

const getColorClass = (value) => {
  if (value === 0) return "bg-white";
  if (value <= 1) return "bg-red-100";
  if (value <= 5) return "bg-red-200";
  if (value <= 10) return "bg-red-300";
  if (value <= 15) return "bg-red-400";
  if (value <= 20) return "bg-red-500";
  return "bg-red-600";
};

const UsageTable = ({ data, dayCounts }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  return (
    <TableContainer component={Paper} className="overflow-auto">
      <Table className="w-full table-fixed border-collapse border border-gray-300">
        <TableHead>
          <TableRow>
            <TableCell
              className="border border-gray-300 !text-center bg-gray-100"
              style={{ width: "80px" }}
            ></TableCell>
            {hours.map((hour, index) => (
              <Tooltip
                key={index}
                title={`${hour}:00 giờ đến ${hour + 1}:00 giờ`}
                placement="top"
                arrow
              >
                <TableCell
                  key={index}
                  className="border border-gray-300 !text-center !p-0 text-xs bg-gray-100"
                  style={{ width: "30px" }} 
                >
                  {hour}
                </TableCell>
              </Tooltip>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day, dayIndex) => (
            <TableRow key={dayIndex}>
              <Tooltip
                title={`(${dayCounts[dayIndex] ?? "0"} ngày/tháng)`}
                placement="top"
                arrow
              >
                <TableCell
                  className="border border-gray-300 !text-center text-xs whitespace-nowrap bg-gray-50"
                  style={{ width: "80px" }}
                >
                  {day}
                </TableCell>
              </Tooltip>
              {hours.map((hour) => {
                const value =
                  data?.find((item) => item.x === hour && item.y === dayIndex)
                    ?.v || 0;
                return (
                  <TableCell
                    key={hour}
                    className={clsx(
                      "border border-gray-300 !text-center !p-0 !items-center text-xs",
                      getColorClass(value)
                    )}
                    style={{ width: "30px", height: "30px" }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsageTable;
