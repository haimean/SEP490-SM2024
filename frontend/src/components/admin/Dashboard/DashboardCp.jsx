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
  // const [totalAccount, setTotalAccount] = useState(0);
  const [dataAccount, setDataAccount] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [totalMonthAccount, setTotalMonthAccount] = useState(0);
  const handleChange = React.useCallback((event) => {
    setAge(event.target.value);
  }, []);

  const getDataAccount = async () => {
    try {
      const result = await CallApi("/api/admin/account/get-all", "get");
      setDataAccount(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  // const getListAccount = async () => {
  //   try {
  //     const result = await CallApi("/api/admin/account", "post", {
  //       pagination: {
  //         page: 1,
  //         perPage: 5,
  //       },
  //     });
  //     console.log("🚀 ========= result:", result);
  //     setTotalAccount(result?.total);
  //   } catch (error) {
  //     console.log("🚀 ========= error:", error);
  //   }
  // };

  const getListAccountMonth = async () => {
    try {
      const result = await CallApi("/api/admin/account/month", "get");
      console.log("🚀 ========= result:", result);
      setTotalMonthAccount(result?.data?.accounts?.length);
      setPercentage(result?.data?.percentage);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    // getListAccount();
    getListAccountMonth();
    getDataAccount();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <SectionDashboard
          key="user-count"
          title={`Số lượng người dùng: ${
            dataAccount?.totalHost + dataAccount?.totalPlayer
          } người`}
          direction={percentage >= 0 ? true : false}
          percentage={
            percentage !== 3
              ? `${(percentage * 100).toFixed(2)} % so với tháng trước`
              : "Không có dữ liệu tháng trước"
          }
          subTitle={`Đăng ký mới : ${totalMonthAccount}`}
        />
        <SectionDashboard
          title={"Số lượng bài post tìm trận: 28k"}
          direction={true}
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
