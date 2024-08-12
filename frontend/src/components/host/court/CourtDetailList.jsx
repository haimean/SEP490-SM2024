/* eslint-disable react/prop-types */
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CourtDetailList = ({ activity, onDeleteCourt, role, branchId }) => {
  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden mb-4 items-center">
      <Link to={`/branch/${branchId}/court/${activity?.id}`}>
        <img
          src={activity?.Branches?.image}
          alt={activity?.name}
          className="w-[300px] h-[300px] object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <div className="bg-red-500 text-white px-2 py-1 rounded-full inline-block mb-2">
            {activity?.price}
          </div>
          <Link to={`/branch/${branchId}/court/${activity?.id}`}>
            <h2 className="text-lg font-bold mb-2">{activity?.name}</h2>
          </Link>
          <p className="text-sm text-gray-600 mb-2">{activity?.description}</p>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarTodayIcon className="mr-1" />
            {activity?.TypeCourt?.name}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 my-2">
            {activity?.Branches?.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {role === "HOST" && (
            <Button
              variant="contained"
              onClick={() => onDeleteCourt(activity?.id, activity?.name)}
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
