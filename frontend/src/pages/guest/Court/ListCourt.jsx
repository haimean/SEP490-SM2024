import { useEffect, useState } from "react";
import CourtDetailList from "../../../components/host/court/CourtDetailList";
import CallApi from "../../../service/CallAPI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import useDialogConfirm from "../../../hooks/useDialogConfirm";
import RegisterCourt from "../../host/Court/RegisterCourt";
import BaseBox from "../../common/BaseBox";

const ListCourt = () => {
  const storedUserRole = localStorage.getItem("userRole");
  console.log("🚀 ========= storedUserRole:", storedUserRole);
  const { id } = useParams();
  const { openDialog, DialogComponent } = useDialogConfirm();
  const [data, setData] = useState([]);
  const [registerCourtModal, setRegisterCourtModal] = useState(false);
  const handleOpenModalRegisterCourt = () => {
    setRegisterCourtModal(true);
  };
  const handleCloseModalRegisterCourt = async () => {
    setRegisterCourtModal(false);
    await getAllCourt();
  };
  const getAllCourt = async () => {
    try {
      const result = await CallApi(`/api/court/branch/${id}`, "get");
      setData(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getAllCourt();
  }, []);
  const handleDeleteCourt = async (id, name) => {
    openDialog(`Bạn có muốn xóa sân ${name} không ?`, async () => {
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
    <BaseBox title="Danh sách sân đấu ">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">
          Hiện có {data.length} sân đấu
        </h1>
        <div className="flex gap-4">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleOpenModalRegisterCourt}
          >
            Thêm sân đấu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((activity, index) => (
          <CourtDetailList
            key={index}
            activity={activity}
            onDeleteCourt={handleDeleteCourt}
            role={storedUserRole}
            branchId={id}
          />
        ))}
      </div>
      {registerCourtModal && (
        <RegisterCourt
          branchesId={id}
          open={registerCourtModal}
          handleClose={handleCloseModalRegisterCourt}
        />
      )}
      <DialogComponent />
    </BaseBox>
  );
};

export default ListCourt;
