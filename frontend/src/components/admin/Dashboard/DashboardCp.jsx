import React, { useEffect, useState, useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SectionDashboard from "./SectionDashboard";
const PieChart = React.lazy(() => import("./PieChart"));
import Loading from "../../common/Loading";
import CallApi from "../../../service/CallAPI";
import BarChartForBookingAndPostAdmin from "./BarChartForBookingAndPostAdmin";
import TableAccount from "./TableAccount";
import OptionChartPlayerFilter from "./OptionChartPlayerFilter";
import LineChartForAccountAdmin from "./LineChartForAccountAdmin";

const DashboardCp = () => {
  const [dataAccount, setDataAccount] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [totalMonthAccount, setTotalMonthAccount] = useState(0);
  const [optionChartPlayer, setOptionChartPlayer] = useState("month");
  const [optionMonth, setOptionMonth] = useState(3);
  const [totalMonthBooking, setTotalMonthBooking] = useState(0);
  const [percentageBooking, setPercentageBooking] = useState(0);
  const [optionMonthChange, setOptionMonthChange] = useState(
    new Date().getMonth()
  );
  const [optionYear, setOptionYear] = useState(new Date().getFullYear());
  const handleChange = useCallback((event) => {
    setOptionChartPlayer(event.target.value);
  }, []);

  const handleChangeMonth = useCallback((event) => {
    setOptionMonth(event.target.value);
  }, []);

  const handleChangeMonthInYear = useCallback((event) => {
    setOptionMonthChange(event.target.value);
  }, []);
  const handleChangeYear = useCallback((event) => {
    setOptionYear(event.target.value);
  }, []);
  const getDataAccount = async () => {
    try {
      const result = await CallApi("/api/admin/account/get-all", "get");
      setDataAccount(result?.data);
    } catch (error) {
      console.error("Error fetching data account:", error);
    }
  };

  const getListAccountMonth = async () => {
    try {
      const result = await CallApi("/api/admin/account/month", "get");
      setTotalMonthAccount(result?.data?.accounts?.length);
      setPercentage(result?.data?.percentage);
    } catch (error) {
      console.error("Error fetching account list:", error);
    }
  };

  const getListBookingMonth = async () => {
    try {
      const result = await CallApi(
        "/api/admin/booking/get-all-booking-in-month",
        "get"
      );
      setTotalMonthBooking(result?.data?.dataInMonth);
      setPercentageBooking(result?.data?.percentage);
    } catch (error) {
      console.error("Error fetching account list:", error);
    }
  };

  useEffect(() => {
    getListAccountMonth();
    getDataAccount();
    getListBookingMonth();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <SectionDashboard
          key="user-count"
          title={`Số lượng người dùng: ${
            dataAccount?.totalHost + dataAccount?.totalPlayer
          } người`}
          direction={percentage >= 0}
          percentage={
            percentage !== 3
              ? `${percentage.toFixed(2)} % so với tháng trước`
              : "Không có dữ liệu tháng trước"
          }
          subTitle={`Đăng ký mới : ${totalMonthAccount} người/ tháng`}
        />
        <SectionDashboard
          title={`Số lượng bài đăng tìm người chơi: ${totalMonthBooking} bài`}
          direction={percentageBooking >= 0}
          percentage={
            percentageBooking !== 3
              ? `${(percentageBooking * 100 * -1).toFixed(
                  2
                )} % so với tháng trước`
              : "Không có dữ liệu tháng trước"
          }
          subTitle={`Bài đăng mới : ${totalMonthBooking} bài/ trong tháng`}
        />
      </div>
      <div className="mt-5 grid grid-cols-2">
        <Typography variant="h6" component="h2">
          Biểu đồ thống kê người dùng
        </Typography>
        <div className="flex justify-between">
          <Typography variant="h6" component="h2">
            5 người dùng mới nhất
          </Typography>
          <Link to={"/admin/list-account"}>
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 items-center">
        <React.Suspense fallback={<Loading />}>
          <PieChart />
        </React.Suspense>
        <div className="flex flex-col">
          <TableAccount />
        </div>
      </div>
      <div className="mt-12 flex items-center justify-between">
        <Typography variant="h6" component="h2">
          Biểu đồ số lượng người đăng ký
        </Typography>
        <OptionChartPlayerFilter
          optionChartPlayer={optionChartPlayer}
          handleChange={handleChange}
          optionMonthChange={optionMonthChange}
          handleChangeMonthInYear={handleChangeMonthInYear}
          optionMonth={optionMonth}
          handleChangeMonth={handleChangeMonth}
          optionYear={optionYear}
          handleChangeYear={handleChangeYear}
        />
      </div>
      <div className="mt-5">
        <React.Suspense fallback={<Loading />}>
          <LineChartForAccountAdmin
            optionMonth={optionMonth}
            optionMonthChange={optionMonthChange}
            optionChartPlayer={optionChartPlayer}
            optionYear={optionYear}
          />
        </React.Suspense>
      </div>
      <div className="mt-12">
        <Typography variant="h6" component="h2">
          Biểu đồ số lượng người đặt sân mới theo 12 tháng gần nhất
        </Typography>
        <React.Suspense fallback={<Loading />}>
          <BarChartForBookingAndPostAdmin />
        </React.Suspense>
      </div>
    </div>
  );
};

export default DashboardCp;
