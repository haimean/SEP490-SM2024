/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const CourtDetailList = ({ activity, onDeleteCourt, role, branchId }) => {
  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden mb-4 items-center">
      <img
        src={activity?.Branches?.image}
        alt={activity?.name}
        className="w-[300px] h-[300px] object-cover"
      />

      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <Link to={`/host/branch/${branchId}/court/${activity?.id}`}>
            <Typography
              variant="h5"
              className="text-lg font-bold mb-2 hover:underline"
            >
              Tên sân: {activity?.name}
            </Typography>
          </Link>
          <div>
            <Typography className="text-sm text-gray-600 mt-2">
              Cơ sở: {activity?.Branches?.name}
            </Typography>
          </div>
          <Typography className="flex items-center text-sm text-gray-600">
            Kiểu sân: {activity?.TypeCourt?.name}
          </Typography>
        </div>
        <div className="mt-3 w-full">
          {role === "HOST" && (
            <Button
              variant="contained"
              color="error"
              onClick={() => onDeleteCourt(activity?.id, activity?.name)}
              className="w-full"
            >
              Xóa sân
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtDetailList;
