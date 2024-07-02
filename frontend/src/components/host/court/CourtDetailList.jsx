// src/components/CourtDetailList.js
import React from "react";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const CourtDetailList = ({ activity }) => {
  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden mb-4">
      <img
        src={activity.image}
        alt={activity.title}
        className="w-1/3 object-cover"
      />
      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <div className="bg-red-500 text-white px-2 py-1 rounded-full inline-block mb-2">
            {activity.price}
          </div>
          <h2 className="text-lg font-bold mb-2">{activity.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <LocationOnIcon className="mr-1" />
            {activity.location}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <EventIcon className="mr-1" />
            {activity.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarTodayIcon className="mr-1" />
            {activity.schedule}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-2">{activity.level}</p>
        </div>
      </div>
    </div>
  );
};

export default CourtDetailList;
