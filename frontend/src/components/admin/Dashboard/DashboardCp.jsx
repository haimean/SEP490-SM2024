import React from "react";
import { Typography } from "@mui/material";
import SectionDashboard from "./SectionDashboard";
import SelectChart from "./SelectChart";
const PieChart = React.lazy(() => import("./PieChart"));
const LineChart = React.lazy(() => import("./LineChart"));
import Loading from "../../common/Loading";
const DashboardCp = () => {
  const [age, setAge] = React.useState("");

  const handleChange = React.useCallback((event) => {
    setAge(event.target.value);
  }, []);

  return (
    <div>
      <Typography variant="h6" component="h2">
        Thống kê admin
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        <SectionDashboard
          key="user-count"
          title={"Số lượng user 26K"}
          direction={true}
          percentage={"-12.4%"}
          subTitle={"Đăng ký mới : 13 (trong tháng)"}
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
