import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import clsx from "clsx";

const getColorClass = (value) => {
  if (value === 0) return "bg-white";
  if (value <= 1) return "bg-blue-100";
  if (value <= 2) return "bg-blue-200";
  if (value <= 3) return "bg-blue-300";
  if (value <= 4) return "bg-blue-400";
  if (value <= 5) return "bg-blue-500";
  return "bg-blue-600";
};

const UsageTable = ({ data }) => {
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
      <Table className="table-auto w-full">
        <TableHead>
          <TableRow>
            <TableCell className="border p-1"></TableCell>
            {hours.map((hour, index) => (
              <TableCell key={index} className="border p-1 text-center text-xs">
                {hour}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((_, dayIndex) => (
            // {hours.map((hour) => (
            <TableRow key={dayIndex}>
              <TableCell className="border p-1 text-center text-xs">
                {days[dayIndex]}
              </TableCell>
              {hours.map((hour) => {
                // {days.map((_, dayIndex) => {
                const value =
                  data.find((item) => item.x === hour && item.y === dayIndex)
                    ?.v || 0;
                return (
                  <TableCell
                    key={dayIndex}
                    className={clsx(
                      "border p-1 text-center text-xs",
                      getColorClass(value)
                    )}
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
