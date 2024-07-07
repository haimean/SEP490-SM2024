import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import DetailPageCp from "../../../components/host/DetailPageCp";
import RightSectionDetailPage from "../../../components/host/RightSectionDetailPage";

const fakeData = {
  title: "Sân 1",
  image:
    "https://sonsanepoxy.vn/wp-content/uploads/2023/07/Thi-cong-san-cau-long.jpg",
  location:
    "US Badminton Phan Bá Vành - Số 99, ngõ 2 Phan Bá Vành, P. Cầu Diễn, Q. Nam Từ Liêm, Hà Nội",
  date: "17/05/2024, 05:30 - 05:30",
  description:
    "Team gồm đầy đủ Top thế giới \n(Axelsen Mỹ Đình, Axelsen gốc 11, Momota Hà Lội, Chiến thần Park Tu Liem, Bác sĩ tâm lý, Kẻ săn đầu GL, Vua người lùn, Nàng công chúa ngủ trên sân cầu...) \nHân hạnh đón chào ace",
  frequency: "Lặp lại hàng tuần (T3, T5, T7)",
  participants: "Cần tuyển: 2 người (Nam/Nữ)",
  level: "Trình độ: TB- đến TB+",
  price: "Giá thuê: 45,000 (nữ) - 55,000 (nam)",
};
const fakeData2 = {
  title: "Sân 2",
  image:
    "https://sonsanepoxy.vn/wp-content/uploads/2023/07/Thi-cong-san-cau-long.jpg",
  location:
    "US Badminton Phan Bá Vành - Số 99, ngõ 2 Phan Bá Vành, P. Cầu Diễn, Q. Nam Từ Liêm, Hà Nội",
  date: "17/05/2024, 05:30 - 05:30",
  description:
    "Team gồm đầy đủ Top thế giới \n(Axelsen Mỹ Đình, Axelsen gốc 11, Momota Hà Lội, Chiến thần Park Tu Liem, Bác sĩ tâm lý, Kẻ săn đầu GL, Vua người lùn, Nàng công chúa ngủ trên sân cầu...) \nHân hạnh đón chào ace",
  frequency: "Lặp lại hàng tuần (T3, T5, T7)",
  participants: "Cần tuyển: 2 người (Nam/Nữ)",
  level: "Trình độ: TB- đến TB+",
  price: "Giá thuê: 45,000 (nữ) - 55,000 (nam)",
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CourtDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar sx={{ flexShrink: 0 }} />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto p-4 mt-8">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Sân 1" {...a11yProps(0)} />
                <Tab label="Sân 2" {...a11yProps(1)} />
                <Tab label="Sân 3" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <DetailPageCp
                  title={fakeData.title}
                  image={fakeData.image}
                  location={fakeData.location}
                  date={fakeData.date}
                  description={fakeData.description}
                  frequency={fakeData.frequency}
                  participants={fakeData.participants}
                  level={fakeData.level}
                  price={fakeData.price}
                  RightSectionComponent={RightSectionDetailPage}
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <DetailPageCp
                title={fakeData2.title}
                image={fakeData2.image}
                location={fakeData2.location}
                date={fakeData2.date}
                description={fakeData2.description}
                frequency={fakeData2.frequency}
                participants={fakeData2.participants}
                level={fakeData2.level}
                price={fakeData2.price}
                RightSectionComponent={RightSectionDetailPage}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Sân 3
            </CustomTabPanel>
          </Box>
        </div>
        <Footer sx={{ flexShrink: 0 }} />
      </div>
    </>
  );
}
