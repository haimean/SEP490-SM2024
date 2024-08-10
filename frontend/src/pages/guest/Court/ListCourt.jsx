import { useEffect, useState } from "react";
import CourtDetailList from "../../../components/host/court/CourtDetailList";
import CallApi from "../../../service/CallAPI";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const ListCourt = () => {
  const storedUserRole = localStorage.getItem("userRole");
  console.log("🚀 ========= storedUserRole:", storedUserRole);
  const { id } = useParams();
  const { openDialog, DialogComponent } = useDialogConfirm();
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
  const getAllCourt = async () => {
    try {
      const result = await CallApi(`/api/court/branch/${id}`, "get");
      setData(result.data);
      console.log("🚀 ========= result:", result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
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
  const handleDeleteCourt = async (id) => {
    openDialog(`Bạn có muốn xóa sân ${id} không ?`, async () => {
      try {
        const result = await CallApi(
          `/api/host/court/delete-court/${id}`,
          "delete"
        );
        if (result) {
          getAllCourt();
          toast.success(`Xóa sân ${id} thành công`);
        }
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    });
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4 mt-16">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">
            Tìm thấy {data.length} sân đấu
          </h1>
          <div className="flex gap-4">
            <Link
              to={`/host/register-court`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Thêm thuộc tính sân đấu
              </Button>
            </Link>
            <Link
              to={`/host/register-court`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Thêm sân đấu
              </Button>
            </Link>
          </div>
        </div>

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
              onDeleteCourt={handleDeleteCourt}
              role={storedUserRole}
              branchId={id}
            />
          ))}
        </div>
      </div>
      <DialogComponent />
    </div>
  );
};

export default ListCourt;
