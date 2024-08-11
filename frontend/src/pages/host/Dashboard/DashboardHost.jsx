import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  TextField,
} from "@mui/material";
import SectionDashboard from "../../../components/host/Dashboard/SectionDashboard";
import PieChartAdmin from "../../../components/host/Dashboard/PieChartAdmin";
import UsageTable from "../../../components/host/Dashboard/UsageTable";
import CallApi from "../../../service/CallAPI";
import BarHostChart from "../../../components/host/Dashboard/BarHostChart";

// Các giá trị tháng và năm có sẵn
const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 đến 12
const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i); // 20 năm trở lại

const daysOfWeek = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

const DashboardHost = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourtForDay, setSelectedCourtForDay] = useState(null);
  const [selectedCourtForHour, setSelectedCourtForHour] = useState(null);

  // Separate state for "Mức độ sử dụng sân theo ngày trong tuần"
  const [selectedYearForDay, setSelectedYearForDay] = useState(new Date().getFullYear());
  const [selectedMonthForDay, setSelectedMonthForDay] = useState(new Date().getMonth() + 1);

  // Separate state for "Bảng thể hiện mức độ sử dụng sân theo giờ"
  const [selectedYearForHour, setSelectedYearForHour] = useState(new Date().getFullYear());
  const [selectedMonthForHour, setSelectedMonthForHour] = useState(new Date().getMonth() + 1);

  const [stats, setStats] = useState({
    currentMonthTotalRevenue: 0,
    prevMonthTotalRevenue: 0,
    currentMonthTotalBookings: 0,
    prevMonthTotalBookings: 0,
  });
  const [usageRevenue, setUsageRevenue] = useState([]);
  const [courtUsage, setCourtUsage] = useState({
    usageByDay: [],
    bookingsByDay: [],
  });
  const [usageByHour, setUsageByHour] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await CallApi("/api/host/branches", "get");
        const branches = response.data;
        setBranchesData(branches);
        setSelectedBranch(branches[0].id);
        setSelectedCourtForDay(branches[0].court[0].id);
        setSelectedCourtForHour(branches[0].court[0].id);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      const fetchStatsData = async () => {
        try {
          const response = await CallApi("/api/host/stats/monthly", "post", {
            branchId: selectedBranch,
            month: `${selectedYearForDay}-${String(selectedMonthForDay).padStart(2, "0")}`,
          });
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      };

      fetchStatsData();
    }
  }, [selectedBranch, selectedYearForDay, selectedMonthForDay]);

  useEffect(() => {
    if (selectedBranch) {
      const fetchUsageRevenue = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/branch-usage-revenue",
            "post",
            {
              branchId: selectedBranch,
              month: `${selectedYearForDay}-${String(selectedMonthForDay).padStart(2, "0")}`,
            }
          );
          setUsageRevenue(response.data);
        } catch (error) {
          console.error("Error fetching usage and revenue data:", error);
        }
      };

      fetchUsageRevenue();
    }
  }, [selectedYearForDay, selectedMonthForDay, selectedBranch]);

  useEffect(() => {
    if (selectedCourtForDay) {
      const fetchCourtUsage = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/court-usage-by-day",
            "post",
            {
              courtId: selectedCourtForDay,
              month: `${selectedYearForDay}-${String(selectedMonthForDay).padStart(2, "0")}`,
            }
          );
          setCourtUsage(response.data);
        } catch (error) {
          console.error("Error fetching court usage data:", error);
        }
      };

      fetchCourtUsage();
    }
  }, [selectedYearForDay, selectedMonthForDay, selectedCourtForDay]);

  useEffect(() => {
    if (selectedCourtForHour) {
      const fetchUsageByHour = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/court-usage-by-hour",
            "post",
            {
              courtId: selectedCourtForHour,
              month: `${selectedYearForHour}-${String(selectedMonthForHour).padStart(2, "0")}`,
            }
          );
          const formattedData = response.data.map((value, index) => ({
            x: index % 24,
            y: Math.floor(index / 24),
            v: value,
          }));
          setUsageByHour(formattedData);
        } catch (error) {
          console.error("Error fetching court usage by hour data:", error);
        }
      };

      fetchUsageByHour();
    }
  }, [selectedYearForHour, selectedMonthForHour, selectedCourtForHour]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    const branch = branchesData.find((branch) => branch.id === branchId);
    setSelectedBranch(branchId);
    setSelectedCourtForDay(branch.court[0].id);
    setSelectedCourtForHour(branch.court[0].id);
  };

  const handleCourtChangeForDay = (event) => {
    setSelectedCourtForDay(event.target.value);
  };

  const handleCourtChangeForHour = (event) => {
    setSelectedCourtForHour(event.target.value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getDayCountsInMonth = (month, year) => {
    const dayCounts = Array(7).fill(0);
    const daysInMonth = getDaysInMonth(month, year);

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      dayCounts[dayOfWeek]++;
    }

    return dayCounts;
  };

  const dayCounts = getDayCountsInMonth(selectedMonthForDay, selectedYearForDay);

  const labels = daysOfWeek.map((day, index) => `${day} \n (${dayCounts[index]} ngày/tháng)`);

  if (!selectedBranch || !selectedCourtForDay || !selectedCourtForHour) return null;

  const selectedBranchData = branchesData.find(
    (branch) => branch.id === selectedBranch
  );

  return (
    <Box sx={{ my: 16, mx: 10, minHeight: "100vh", height: "full" }}>
      <Box className="flex justify-between items-center">
        <Typography variant="h4" component="h2" fontWeight={600}>
          Thống kê host
        </Typography>
        <FormControl sx={{ minWidth: 250 }} margin="normal">
          <InputLabel id="demo-simple-select-label">Chọn Chi Nhánh</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={selectedBranch}
            label="Chọn Chi Nhánh"
            onChange={handleBranchChange}
          >
            {branchesData.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 4,
          marginTop: 4,
        }}
      >
        <SectionDashboard
          key="booking-count"
          title="Lượt đặt"
          currentValue={stats.currentMonthTotalBookings}
          previousValue={stats.prevMonthTotalBookings}
          isCurrency={false}
        />
        <SectionDashboard
          title="Doanh thu"
          currentValue={stats.currentMonthTotalRevenue}
          previousValue={stats.prevMonthTotalRevenue}
          isCurrency={true}
        />
      </Box>

      <Card sx={{ marginBottom: 4, padding: "2rem" }}>
      <Box className="flex flex-col items-center mt-4">
          <Typography variant="h5" component="h2">
            Doanh thu các sân
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="Chọn năm"
              value={selectedYearForDay}
              onChange={(e) => setSelectedYearForDay(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Chọn tháng"
              value={selectedMonthForDay}
              onChange={(e) => setSelectedMonthForDay(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  Tháng {month}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <PieChartAdmin data={usageRevenue} />
      </Card>

      <Card sx={{ marginBottom: 4, padding: "2rem" }}>
        <Typography variant="h5">Thống kê sân</Typography>
        <Box className="mx- mt-3">
          <Box>
          <Box className="flex flex-col items-center mt-4">
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Mức độ sử dụng sân theo ngày trong tuần
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                  <InputLabel id="select-court-label-day">Chọn Sân</InputLabel>
                  <Select
                    labelId="select-court-label-day"
                    value={selectedCourtForDay}
                    label="Chọn Sân"
                    onChange={handleCourtChangeForDay}
                  >
                    {selectedBranchData.court.map((court) => (
                      <MenuItem key={court.id} value={court.id}>
                        {court.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                <TextField
                  select
                  label="Chọn năm"
                  value={selectedYearForDay}
                  onChange={(e) => setSelectedYearForDay(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                <TextField
                  select
                  label="Chọn tháng"
                  value={selectedMonthForDay}
                  onChange={(e) => setSelectedMonthForDay(e.target.value)}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      Tháng {month}
                    </MenuItem>
                  ))}
                </TextField>
                </FormControl>
              </Box>
            </Box>
            <BarHostChart
              data={{
                labels: labels,
                usage: courtUsage.usageByDay,
                bookings: courtUsage.bookingsByDay,
              }}
            />
          </Box>
          <Box className="flex flex-col items-center mt-4">
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
              Bảng thể hiện mức độ sử dụng sân theo giờ
            </Typography>
            <Box className="flex justify-between items-center mb-2">
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                  <InputLabel id="select-court-label-hour">Chọn Sân</InputLabel>
                  <Select
                    labelId="select-court-label-hour"
                    value={selectedCourtForHour}
                    label="Chọn Sân"
                    onChange={handleCourtChangeForHour}
                  >
                    {selectedBranchData.court.map((court) => (
                      <MenuItem key={court.id} value={court.id}>
                        {court.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                  <TextField
                    select
                    label="Chọn năm"
                    value={selectedYearForHour}
                    onChange={(e) => setSelectedYearForHour(e.target.value)}

                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} margin="normal">
                  <TextField
                    select
                    label="Chọn tháng"
                    value={selectedMonthForHour}
                    onChange={(e) => setSelectedMonthForHour(e.target.value)}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        Tháng {month}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
            </Box>
            <UsageTable data={usageByHour} dayCounts={dayCounts} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default DashboardHost;
