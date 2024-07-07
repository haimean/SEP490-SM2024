// src/components/CourtDetailList.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const CourtDetailList = ({
  activity,
  courtList,
  handleCompare,
  isCompare,
  setIsCompare,
  handleRemoveCompare,
}) => {
  const [message, setMessage] = useState();
  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden mb-4 items-center">
      <img
        src={activity.Branches.image}
        alt={activity.name}
        className="w-[300px] h-[300px] object-cover"
      />
      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <div className="bg-red-500 text-white px-2 py-1 rounded-full inline-block mb-2">
            {activity.price}
          </div>
          <h2 className="text-lg font-bold mb-2">{activity.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <LocationOnIcon className="mr-1" />
            {activity.Branches.addressLatitude}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <EventIcon className="mr-1" />
            {activity.updatedAt}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarTodayIcon className="mr-1" />
            {activity.TypeCourt.name}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-2">{activity.Branches.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => handleCompare(activity)}>
            <Button variant="contained" className="w-full">
              So sánh
            </Button>
          </div>

          <Button variant="contained">Xem chi tiết</Button>
          {isCompare && (
            <div className="fixed bg-blue-200 -bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full shadow-xl p-4 rounded-lg z-10">
              <div className="text-right">
                <div onClick={() => setIsCompare(false)}>
                  <CloseIcon className="hover:cursor-pointer hover:text-red-500 focus:text-red-500 hover:scale-110 focus:scale-110 transition duration-300 ease-in-out" />
                </div>
              </div>
              <div className="w-3/4 mx-auto grid grid-cols-5 gap-3">
                {courtList.map((item) =>
                  item.court !== null ? (
                    <div key={item.id} className="flex col-span-2 gap-3">
                      <img
                        className="w-28 h-28"
                        src={item.court.Branches.image}
                      />
                      <div>
                        <h1>{item.court.name}</h1>
                        <p>{item.court.Branches.addressLatitude}</p>
                        <p>{item.court.Branches.addressLatitude}</p>
                      </div>
                      <div onClick={() => handleRemoveCompare(item)}>
                        <CloseIcon className="hover:cursor-pointer hover:text-red-500 focus:text-red-500 hover:scale-110 focus:scale-110 transition duration-300 ease-in-out" />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={item.id}
                      className="w-60 col-span-2 mx-auto border-black flex flex-col items-center justify-center border-2 border-dashed rounded-lg"
                    >
                      <span className="text-4xl text-black">{item.id}</span>
                      <span className="text-sm text-black">
                        Chọn để so sánh
                      </span>
                    </div>
                  )
                )}
                <div className="flex flex-col gap-3">
                  {courtList[0].court == null || courtList[1].court == null ? (
                    <Button
                      variant="contained"
                      onClick={() => toast.info("Vui long chon du court")}
                    >
                      So sanh
                    </Button>
                  ) : (
                    <Link
                      to={`/host/compare/${courtList[0].court.id}/${courtList[1].court.id}`}
                    >
                      <Button variant="contained" className="w-full">
                        So sanh
                      </Button>
                    </Link>
                  )}
                  <Button variant="contained" color="error">
                    Huy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtDetailList;
