import * as React from "react";

import Box from "@mui/material/Box";
import CallApi from "../../../service/CallAPI";
import CourtDetailComponent from "../../../components/host/court/CourtDetailComponent";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";

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

export default function CourtDetailHost() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});
  console.log("🚀 ========= data:", data);
  const [court, setCourt] = React.useState([]);
  console.log("🚀 ========= court:", court);
  const { idCourt } = useParams();
  const [id, setId] = React.useState(idCourt);
  const [reload, setReload] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { idBranch } = useParams();

  const userRole = localStorage.getItem("userRole") || "";
  console.log(userRole);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getAllCourtByBranch = async () => {
    setIsLoading(true);
    try {
      const result = await CallApi(`/api/court/branch/${idBranch}`, "get");
      const resultCourt = await CallApi(
        `/api/court/${id ? id : idCourt}`,
        "get"
      );
      // console.log("🚀 ========= result:", result.data);
      setCourt(result.data);
      setData(resultCourt.data);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const getCourtDetail = async () => {
    try {
      const result = await CallApi(`/api/court/${id ? id : idCourt}`, "get");
      // console.log("🚀 ========= result:", result.data);
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  React.useEffect(() => {
    getAllCourtByBranch();
    getCourtDetail();
  }, []);

  React.useEffect(() => {
    getCourtDetail();
  }, [reload]);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4 mt-16">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {court &&
              court?.map((item, index) => (
                <Tab
                  key={item.id}
                  onClick={() => {
                    setId(item.id);
                    setReload(index);
                  }}
                  label={item.name}
                  {...a11yProps(index)}
                />
              ))}
          </Tabs>
          <CustomTabPanel value={value} index={reload}>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              {data && (
                <CourtDetailComponent
                  title={data?.name}
                  image={data?.Branches?.image}
                  location={data?.Branches?.addressLatitude}
                  date={data?.createdAt}
                  description={data?.TypeCourt?.description}
                  participants={data?.Branches?.name}
                  type={"courtDetail"}
                  role={userRole}
                  court={data}
                  courtId={id}
                />
              )}
            </Box>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
