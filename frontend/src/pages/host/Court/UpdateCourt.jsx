/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import { Box, Dialog } from "@mui/material";
import { useEffect, useState } from "react";

import CallApi from "../../../service/CallAPI";
import FormDetailCourt from "../../../components/host/court/FormDetailCourt";
import { toast } from "react-toastify";

export default function UpdateCourt({ id, open, handleClose }) {
  const [typeCourtList, setTypeCourtList] = useState([]);
  const [court, setCourt] = useState([]);
  const updateCourt = async (data) => {
    try {
      const result = await CallApi("/api/host/court/update-court", "put", data);
      toast.success("Cập nhật thành công !");
      console.log("🚀 ========= result:", result);
    } catch (error) {
      toast.error("Cập nhật không thành công");
      console.log("🚀 ========= error:", error);
    }
  };
  const onSubmit = (data) => {
    updateCourt(data);
  };
  const getListTypeCourt = async () => {
    try {
      const listTypeCourt = await CallApi("/api/host/type-court", "get");
      setTypeCourtList(listTypeCourt.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const getDetailCourt = async () => {
    try {
      const result = await CallApi(`/api/host/court/${id}`, "get");
      console.log("result", result.data);

      setCourt(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getListTypeCourt();
    getDetailCourt();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box style={{ width: "500px" }}>
        <FormDetailCourt
          onSubmit={onSubmit}
          typeCourtList={typeCourtList}
          court={court}
        />
      </Box>
    </Dialog>
  );
}
