import React from "react";
import Navbar from "../../layouts/player/Navbar";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Sidebar from "./Sidebar";
import Footer from "../player/Footer";
export default function LayoutHost({ children }) {
  const sidebar = [
    {
      id: 1,
      name: "Danh sách sân",
      icon: <FormatListBulletedIcon />,
    },
    {
      id: 2,
      name: "Danh sách sân",
      icon: <FormatListBulletedIcon />,
    },
    {
      id: 3,
      name: "Danh sách sân",
      icon: <FormatListBulletedIcon />,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 mb-5">
        <div>
          <div className="">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
