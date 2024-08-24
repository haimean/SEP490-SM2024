// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import FormDetailCourt from "../../../components/host/court/FormDetailCourt";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UpdateCourt() {
  const { id } = useParams();
  const [typeCourtList, setTypeCourtList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [court, setCourt] = useState([]);
  const createCourt = async (data) => {
    try {
      await CallApi("/api/host/court/create-court", "post", data);
      toast.success("Cập nhật thành công !");
    } catch (error) {
      toast.error("Cập nhật không thành công");
    }
  };
  const onSubmit = (data) => {
    createCourt(data);
  };
  useEffect(() => {
    const getListTypeCourt = async () => {
      try {
        const listTypeCourt = await CallApi("/api/host/type-court", "get");
        setTypeCourtList(listTypeCourt?.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    const getListBranch = async () => {
      try {
        const listBranch = await CallApi("/api/host/branches", "get");
        setBranchList(listBranch.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    const getDetailCourt = async () => {
      try {
        const courtDetail = await CallApi(`/api/host/court/${id}`, "get");
        setCourt(courtDetail.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getListTypeCourt();
    getListBranch();
    getDetailCourt();
  }, [id]);
  return (
    <FormDetailCourt
      onSubmit={onSubmit}
      branchList={branchList}
      typeCourtList={typeCourtList}
      court={court}
    />
  );
}
