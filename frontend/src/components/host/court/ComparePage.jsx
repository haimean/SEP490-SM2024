// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { useParams } from "react-router-dom";
import ResponsiveDrawer from "../../../layouts/host/LayoutHost";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ComparePage() {
  const { court1, court2 } = useParams();
  const [firstCourt, setFirstCourt] = useState({});
  console.log("🚀 ========= firstCourt:", firstCourt);
  const [secondCourt, setSecondCourt] = useState({});
  console.log("🚀 ========= secondCourt:", secondCourt);

  const getDetailCourt = async () => {
    try {
      const result1 = await CallApi(`/api/court/${court1}`);
      const result2 = await CallApi(`/api/court/${court2}`);

      if (result1 && result1.data) {
        setFirstCourt(result1.data);
      } else {
        console.error("No data found for court1");
      }

      if (result2 && result2.data) {
        setSecondCourt(result2.data);
      } else {
        console.error("No data found for court2");
      }
    } catch (error) {
      console.error("Error fetching court details:", error);
    }
  };

  useEffect(() => {
    getDetailCourt();
  }, []);

  const rows = [
    {
      id: 1,
      title: "Name",
      firstValue: firstCourt?.name,
      secondValue: secondCourt?.name,
    },
    {
      id: 2,
      title: "Address",
      firstValue: firstCourt?.Branches?.addressLatitude,
      secondValue: secondCourt?.Branches?.addressLatitude,
    },
    {
      id: 3,
      title: "Create at",
      firstValue: firstCourt?.TypeCourt?.createdAt,
      secondValue: secondCourt?.TypeCourt?.createdAt,
    },
    {
      id: 4,
      title: "Branch name",
      firstValue: firstCourt?.Branches?.name,
      secondValue: secondCourt?.Branches?.name,
    },
    {
      id: 5,
      title: "Description",
      firstValue: firstCourt?.TypeCourt?.description,
      secondValue: secondCourt?.TypeCourt?.description,
    },
  ];

  return (
    <ResponsiveDrawer>
      <TableContainer className="mt-16" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="w-40 h-40"
                    src={firstCourt?.Branches?.image}
                  />
                  {firstCourt?.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="w-40 h-40"
                    src={secondCourt?.Branches?.image}
                  />
                  {secondCourt?.name}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.title}
                </TableCell>
                <TableCell>{row?.firstValue}</TableCell>
                <TableCell>{row?.secondValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ResponsiveDrawer>
  );
}
