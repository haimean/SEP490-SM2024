import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  Card,
} from "@mui/material";
import SectionDashboard from "../../../components/host/Dashboard/SectionDashboard";
import PieChartAdmin from "../../../components/host/Dashboard/PieChartAdmin";
import UsageTable from "../../../components/host/Dashboard/UsageTable";
import CallApi from "../../../service/CallAPI";
import BarHostChart from "../../../components/host/Dashboard/BarHostChart";

const months = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(i);
  return date;
});

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
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedPieMonth, setSelectedPieMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedBarMonth, setSelectedBarMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedTableMonth, setSelectedTableMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
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
        setSelectedCourt(branches[0].court[0].id);
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
            month: new Date().toISOString().slice(0, 7),
          });
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      };

      fetchStatsData();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedBranch) {
      const fetchUsageRevenue = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/branch-usage-revenue",
            "post",
            {
              branchId: selectedBranch,
              month: selectedPieMonth,
            }
          );
          setUsageRevenue(response.data);
        } catch (error) {
          console.error("Error fetching usage and revenue data:", error);
        }
      };

      fetchUsageRevenue();
    }
  }, [selectedPieMonth, selectedBranch]);

  useEffect(() => {
    if (selectedCourt) {
      const fetchCourtUsage = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/court-usage-by-day",
            "post",
            {
              courtId: selectedCourt,
              month: selectedBarMonth,
            }
          );
          setCourtUsage(response.data);
        } catch (error) {
          console.error("Error fetching court usage data:", error);
        }
      };

      fetchCourtUsage();
    }
  }, [selectedBarMonth, selectedCourt]);

  useEffect(() => {
    if (selectedCourt) {
      const fetchUsageByHour = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/court-usage-by-hour",
            "post",
            {
              courtId: selectedCourt,
              month: selectedTableMonth,
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
  }, [selectedTableMonth, selectedCourt]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    const branch = branchesData.find((branch) => branch.id === branchId);
    setSelectedBranch(branchId);
    setSelectedCourt(branch.court[0].id);
  };

  const handleCourtChange = (event, newValue) => {
    setSelectedCourt(newValue);
  };

  if (!selectedBranch || !selectedCourt) return null;

  const selectedBranchData = branchesData.find(
    (branch) => branch.id === selectedBranch
  );

  return (
    <Box
      sx={{
        my: 12,
        mx: 10,
        minHeight: "100vh",
        height: "full",
      }}
    >
      {/* cục trên */}
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

      {/* hiện số lượng */}
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
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="h5" component="h2">
            Doanh thu các sân
          </Typography>
          <TextField
            select
            label="Chọn tháng"
            value={selectedPieMonth}
            onChange={(e) => setSelectedPieMonth(e.target.value)}
          >
            {months.map((month) => (
              <MenuItem
                key={month.toISOString()}
                value={month.toISOString().slice(0, 7)}
              >
                {month.toLocaleString("vi-VN", {
                  month: "long",
                  year: "numeric",
                })}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <PieChartAdmin data={usageRevenue} />
      </Card>

      <Card sx={{ marginBottom: 4, padding: "2rem" }}>
        <Typography variant="h5">Thống kê sân</Typography>
        <Tabs
          value={selectedCourt}
          onChange={handleCourtChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {selectedBranchData.court.map((court) => (
            <Tab key={court.id} label={court.name} value={court.id} />
          ))}
        </Tabs>
        <Box className="mx- mt-3">
          <Box>
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Mức độ sử dụng sân theo ngày trong tuần
              </Typography>
              <TextField
                select
                label="Chọn tháng"
                value={selectedBarMonth}
                onChange={(e) => setSelectedBarMonth(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                {months.map((month) => (
                  <MenuItem
                    key={month.toISOString()}
                    value={month.toISOString().slice(0, 7)}
                  >
                    {month.toLocaleString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <BarHostChart
              data={{
                labels: daysOfWeek,
                usage: courtUsage.usageByDay,
                bookings: courtUsage.bookingsByDay,
              }}
            />
          </Box>
          <Box>
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Bảng thể hiện mức độ sử dụng sân theo giờ
              </Typography>
              <TextField
                select
                label="Chọn tháng"
                value={selectedTableMonth}
                onChange={(e) => setSelectedTableMonth(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                {months.map((month) => (
                  <MenuItem
                    key={month.toISOString()}
                    value={month.toISOString().slice(0, 7)}
                  >
                    {month.toLocaleString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <UsageTable data={usageByHour} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default DashboardHost;
