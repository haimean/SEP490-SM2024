import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SectionDashboard from "./SectionDashboard";
import SelectChart from "./SelectChart";
const PieChart = React.lazy(() => import("./PieChart"));
const LineChart = React.lazy(() => import("./LineChart"));
import Loading from "../../common/Loading";
import CallApi from "../../../service/CallAPI";
const DashboardCp = () => {
  const [age, setAge] = React.useState("");
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalMonthAccount, setTotalMonthAccount] = useState(0);
  const handleChange = React.useCallback((event) => {
    setAge(event.target.value);
  }, []);

  const getListAccount = async () => {
    try {
      const result = await CallApi("/api/admin/account", "post", {
        pagination: {
          page: 1,
          perPage: 5,
        },
      });
      console.log("🚀 ========= result:", result);
      setTotalAccount(result?.total);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const getListAccountMonth = async () => {
    try {
      const result = await CallApi("/api/admin/account/month", "get", {
        pagination: {
          page: 1,
          perPage: 5,
        },
      });
      console.log("🚀 ========= result:", result);
      setTotalMonthAccount(result?.data?.length);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getListAccount();
    getListAccountMonth();
  }, []);
  return (
    <div>
      <Typography variant="h6" component="h2">
        Thống kê admin
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        <SectionDashboard
          key="user-count"
          title={`Số lượng user: ${totalAccount} người`}
          direction={true}
          percentage={`${((totalMonthAccount / totalAccount) * 100).toFixed(
            2
          )} %`}
          subTitle={`Đăng ký mới : ${totalMonthAccount} (trong tháng)`}
        />
        <SectionDashboard
          title={"Số lượng bài post tìm trận: 28k"}
          irection={true}
          percentage={"-12.4%"}
          subTitle={"Đăng ký mới : 13 (trong tháng)"}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h6" component="h2">
          Biểu đồ thống kê các role
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <React.Suspense fallback={<Loading />}>
          <PieChart />
        </React.Suspense>
      </div>
      <div className="mt-5">
        <Typography variant="h6" component="h2">
          Biểu đồ số lượng người đăng ký mới theo tuần - tháng
        </Typography>
      </div>
      <div className="max-w-11">
        <SelectChart age={age} handleChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <React.Suspense fallback={<Loading />}>
          <LineChart />
        </React.Suspense>
      </div>
    </div>
  );
};

export default DashboardCp;
