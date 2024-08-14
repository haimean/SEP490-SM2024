import { Box, Tab, Tabs } from "@mui/material";
import BaseBox from "../../common/BaseBox";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CallApi from "../../../service/CallAPI";
import ListCourt from "../Court/ListCourt";
import DetailHostBranch from "../../host/Branch/DetailHostBranch";
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

const HostBranchDetail = () => {
  const [value, setValue] = useState(0);
  const [branchDetail, setBranchDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBranchDetail = async () => {
      try {
        const apiUrl = "/api/host/branches";
        const response = await CallApi(`${apiUrl}/${id}`, "get");
        setBranchDetail(response?.data);
      } catch (error) {
        console.log(
          "=============== fetch list branch ERROR: " +
            error.response?.data?.error
        );
      }
    };
    fetchBranchDetail();
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const map = (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238341.61060617006!2d105.53860539453123!3d21.029177999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4caf655555%3A0x4debb020d93041f0!2sFpt%20Software!5e0!3m2!1svi!2s!4v1719668441308!5m2!1svi!2s"
      width={665}
      height={400}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
  return (
    <BaseBox title={branchDetail?.name}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Danh sách sân" {...a11yProps(0)} />
          <Tab label="Thông tin sân" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ListCourt id={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DetailHostBranch
          name={branchDetail?.name}
          image={branchDetail?.image}
          locations={branchDetail?.address?.districts}
          openingHours={branchDetail?.openingHours}
          description={branchDetail?.description}
          closingHours={branchDetail?.closingHours}
          branch={branchDetail}
          id={id}
          map={map}
          type={"Branch"}
        />
      </CustomTabPanel>
    </BaseBox>
  );
};

export default HostBranchDetail;
