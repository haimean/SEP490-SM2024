import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import FormDetailCourt from "../../../components/host/court/FormDetailCourt";
import { Dialog } from "@mui/material";

const RegisterCourt = ({ branchesId, open, handleClose }) => {
  const [typeCourtList, setTypeCourtList] = useState([]);
  const createCourt = async (data) => {
    try {
      await CallApi("/api/host/court/create-court", "post", data);
      toast.success("Tạo thành công");
    } catch (error) {
      toast.error("Tạo không thành công !");
      console.log("🚀 ========= error:", error);
    }
  };
  const onSubmit = async (data) => {
    await createCourt(data);
    handleClose();
  };
  useEffect(() => {
    const getListTypeCourt = async () => {
      try {
        const listTypeCourt = await CallApi("/api/host/type-court", "get");
        setTypeCourtList(listTypeCourt.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getListTypeCourt();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ width: "500px" }}>
        <FormDetailCourt
          onSubmit={onSubmit}
          typeCourtList={typeCourtList}
          branchesId={branchesId}
        />
      </div>
    </Dialog>
  );
};

export default RegisterCourt;
