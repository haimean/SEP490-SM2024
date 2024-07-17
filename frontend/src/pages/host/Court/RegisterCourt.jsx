import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import FormDetailCourt from "../../../components/host/court/FormDetailCourt";

const RegisterCourt = () => {
  const [typeCourtList, setTypeCourtList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const createCourt = async (data) => {
    try {
      const result = await CallApi(
        "/api/host/court/create-court",
        "post",
        data
      );
      toast.success("Tạo thành công");
      console.log("🚀 ========= result:", result);
    } catch (error) {
      toast.error("Tạo không thành công !");
      console.log("🚀 ========= error:", error);
    }
  };
  const onSubmit = (data) => {
    createCourt(data);
    console.log(data);
  };
  useEffect(() => {
    const getListTypeCourt = async () => {
      try {
        const listTypeCourt = await CallApi("/api/host/type-court", "get");
        console.log("🚀 ========= listTypeCourt:", listTypeCourt);
        setTypeCourtList(listTypeCourt.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    const getListBranch = async () => {
      try {
        const listListBranch = await CallApi("/api/host/branches", "get");
        console.log("🚀 ========= listListBranch:", listListBranch);
        setBranchList(listListBranch.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getListTypeCourt();
    getListBranch();
  }, []);
  return (
    <FormDetailCourt
      onSubmit={onSubmit}
      branchList={branchList}
      typeCourtList={typeCourtList}
    />
  );
};

export default RegisterCourt;
