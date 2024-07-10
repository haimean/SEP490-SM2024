// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CourtDetailList from "../../../components/host/court/CourtDetailList";
import ResponsiveDrawer from "../../../layouts/host/LayoutHost";
import CallApi from "../../../service/CallAPI";
import { useParams } from "react-router-dom";

const ListCourt = () => {
  const { id } = useParams();
  const [courtList, setCourtList] = useState([
    {
      id: 1,
      court: null,
    },
    {
      id: 2,
      court: null,
    },
  ]);
  const [isCompare, setIsCompare] = useState(false);
  const [data, setData] = useState([]);
  const handleCompare = (court) => {
    console.log("🚀 ========= court:", court);
    setIsCompare(true);
    setCourtList((prev) => {
      console.log("🚀 ========= prev:", prev);
      if (prev[0].court == null) {
        return [
          {
            ...prev[0],
            court: court, // Assuming 'court' is the value you want to assign
          },
          prev[1], // Keep the second item unchanged
        ];
      } else if (prev[0].court != null && prev[1].court == null) {
        return [
          prev[0], // Keep the first item unchanged
          {
            ...prev[1],
            court: court, // Assuming 'court' is the value you want to assign
          },
        ];
      }

      // Return prev as is if neither condition is met
      return prev;
    });
  };
  useEffect(() => {
    const getAllCourt = async () => {
      try {
        const result = await CallApi(`/api/court/branch/${id}`, "get");
        setData(result.data);
        console.log("🚀 ========= result:", result.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getAllCourt();
  }, []);
  const handleRemoveCompare = (court) => {
    console.log("🚀 ========= court:", court);
    setCourtList((prev) =>
      prev.map((item) =>
        item.id === court.id ? { ...item, court: null } : item
      )
    );
  };
  return (
    <>
      <ResponsiveDrawer>
        <div className="bg-gray-100 min-h-screen p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Tìm thấy {data.length} hoạt động
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map((activity, index) => (
                <CourtDetailList
                  key={index}
                  activity={activity}
                  courtList={courtList}
                  handleCompare={handleCompare}
                  isCompare={isCompare}
                  setIsCompare={setIsCompare}
                  handleRemoveCompare={handleRemoveCompare}
                />
              ))}
            </div>
          </div>
        </div>
      </ResponsiveDrawer>
    </>
  );
};

export default ListCourt;
