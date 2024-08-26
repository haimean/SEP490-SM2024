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
import PieChartHost from "../../../components/host/Dashboard/PieChartHost";
import UsageTable from "../../../components/host/Dashboard/UsageTable";
import CallApi from "../../../service/CallAPI";
import BarHostChart from "../../../components/host/Dashboard/BarHostChart";

// Các giá trị tháng và năm có sẵn
const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 đến 12
const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i); // 4 năm trở lại

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
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [branchesData, setBranchesData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourtForDay, setSelectedCourtForDay] = useState(null);
  const [selectedCourtForHour, setSelectedCourtForHour] = useState(null);
  const [dayCounts, setDayCounts] = useState([]);

  const [selectedYearForBranch, setSelectedYearForBranch] = useState(
    new Date().getFullYear()
  );
  const [selectedMonthForBranch, setSelectedMonthForBranch] = useState(
    new Date().getMonth() + 1
  );


  const [selectedYearForDay, setSelectedYearForDay] = useState(
    new Date().getFullYear()
  );
  const [selectedMonthForDay, setSelectedMonthForDay] = useState(
    new Date().getMonth() + 1
  );


  const [selectedYearForHour, setSelectedYearForHour] = useState(
    new Date().getFullYear()
  );
  const [selectedMonthForHour, setSelectedMonthForHour] = useState(
    new Date().getMonth() + 1
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

        if (branches.length > 0) {
          setBranchesData(branches);
          setSelectedBranch(branches[0].id);

          // Kiểm tra nếu có court trong branch
          if (branches[0].court && branches[0].court.length > 0) {
            // setSelectedCourtForDay(branches[0].court[0].id);
            // setSelectedCourtForHour(branches[0].court[0].id);
            setSelectedCourtForDay("all");
            setSelectedCourtForHour("all");
          } else {
            console.warn("Không có sân nào trong cơ sở.");
            setSelectedCourtForDay(null);
            setSelectedCourtForHour(null);
          }
        } else {
          console.warn("Không có cơ sở nào.");
          setBranchesData([]);
          setSelectedBranch(null);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        setBranchesData([]);
        setSelectedBranch(null);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
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
            month: `${selectedYearForBranch}-${String(
              selectedMonthForBranch
            ).padStart(2, "0")}`,
          });
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      };

      fetchStatsData();
    }
  }, [selectedBranch, selectedYearForBranch, selectedMonthForBranch]);

  useEffect(() => {
    if (selectedBranch) {
      const fetchUsageRevenue = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/branch-usage-revenue",
            "post",
            {
              branchId: selectedBranch,
              month: `${selectedYearForBranch}-${String(
                selectedMonthForBranch
              ).padStart(2, "0")}`,
            }
          );
          setUsageRevenue(response.data);
        } catch (error) {
          console.error("Error fetching usage and revenue data:", error);
        }
      };

      fetchUsageRevenue();
    }
  }, [selectedYearForBranch, selectedMonthForBranch, selectedBranch]);

  useEffect(() => {
    if (selectedCourtForDay) {
      const fetchCourtUsage = async () => {
        try {
          const response = await CallApi(
            "/api/host/stats/court-usage-by-day",
            "post",
            {
              courtId: selectedCourtForDay,
              branchId: selectedBranch,
              month: `${selectedYearForDay}-${String(
                selectedMonthForDay
              ).padStart(2, "0")}`,
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
              branchId: selectedBranch,
              month: `${selectedYearForHour}-${String(
                selectedMonthForHour
              ).padStart(2, "0")}`,
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

    if (branch && branch.court && branch.court.length > 0) {
      setSelectedCourtForDay(branch.court[0].id);
      setSelectedCourtForHour(branch.court[0].id);
    } else {
      console.warn("Không có sân nào trong cơ sở.");
      setSelectedCourtForDay(null);
      setSelectedCourtForHour(null);
    }
  };

  const handleCourtChangeForDay = (event) => {
    console.log(event.target.value);
    setSelectedCourtForDay(event.target.value);
  };

  const handleCourtChangeForHour = (event) => {
    console.log(event.target.value);
    setSelectedCourtForHour(event.target.value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    const month = selectedMonthForDay;
    const year = selectedYearForDay;
    const dayCountList = Array(7).fill(0);
    const daysInMonth = getDaysInMonth(month, year);
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      dayCountList[dayOfWeek]++;
    }
    setDayCounts(dayCountList);
  }, [dayCounts, selectedMonthForDay, selectedYearForDay]);

  const labels = daysOfWeek.map(
    (day, index) => `${day} \n (${dayCounts[index]} ngày/tháng)`
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  if (!selectedBranch) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Không có cơ sở nào.</Typography>
      </Box>
    );
  }

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
      <Box className="flex justify-between items-center">
        <Typography variant="h4" component="h2" fontWeight={600}>
          Thống kê
        </Typography>
        <FormControl sx={{ minWidth: 250 }} margin="normal">
          <InputLabel id="demo-simple-select-label">Chọn cơ sở</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={selectedBranch}
            label="Chọn cơ sở"
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
      <Card sx={{ marginBottom: 4, padding: "2rem" }}>
        <Box className="flex flex-col items-center mt-4">
          <Typography variant="h5" component="h2">
            Doanh thu và lượt đặt của cơ sở
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: "2rem" }}>
            <TextField
              select
              label="Chọn năm"
              value={selectedYearForBranch}
              onChange={(e) => setSelectedYearForBranch(e.target.value)}
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
              value={selectedMonthForBranch}
              onChange={(e) => setSelectedMonthForBranch(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  Tháng {month}
                </MenuItem>
              ))}
            </TextField>
          </Box>
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
            title="Doanh thu trong tháng"
            currentValue={stats.currentMonthTotalRevenue}
            previousValue={stats.prevMonthTotalRevenue}
            isCurrency={true}
          />
          <SectionDashboard
            key="booking-count"
            title="Lượt đặt trong tháng"
            currentValue={stats.currentMonthTotalBookings}
            previousValue={stats.prevMonthTotalBookings}
            isCurrency={false}
          />
        </Box>
      </Card>

      <Card sx={{ marginBottom: 4, padding: "2rem" }}>
        <Box className="flex flex-col items-center mt-4">
          <Typography variant="h5" component="h2">
            Doanh thu các sân trong cơ sở
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: "2rem" }}>
            <TextField
              select
              label="Chọn năm"
              value={selectedYearForBranch}
              onChange={(e) => setSelectedYearForBranch(e.target.value)}
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
              value={selectedMonthForBranch}
              onChange={(e) => setSelectedMonthForBranch(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  Tháng {month}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <PieChartHost data={usageRevenue} />
      </Card>
      {!selectedCourtForDay || !selectedCourtForHour ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Typography>Không có sân nào trong cơ sở này.</Typography>
        </Box>
      ) : (
        <Card sx={{ marginBottom: 4, padding: "2rem" }}>
          <Typography variant="h5">Thống kê sân</Typography>
          <Box className="mx- mt-3">
            <Box>
              <Box className="flex flex-col items-center mt-4">
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: 2 }}
                >
                  Mức độ sử dụng sân theo ngày trong tuần
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl sx={{ minWidth: 150 }} margin="normal">
                    <InputLabel id="select-court-label-day">
                      Chọn Sân
                    </InputLabel>
                    <Select
                      labelId="select-court-label-day"
                      value={selectedCourtForDay}
                      label="Chọn Sân"
                      onChange={handleCourtChangeForDay}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      {selectedBranchData?.court?.map((court) => (
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
                    <InputLabel id="select-court-label-hour">
                      Chọn Sân
                    </InputLabel>
                    <Select
                      labelId="select-court-label-hour"
                      value={selectedCourtForHour}
                      label="Chọn Sân"
                      onChange={handleCourtChangeForHour}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      {selectedBranchData?.court?.map((court) => (
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
      )}
    </Box>
  );
};

export default DashboardHost;
