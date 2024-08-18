import { Collapse, Tooltip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CallApi from "../../service/CallAPI";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

export default function Sidebar() {
  const [listBranch, setListBranch] = useState([]);
  const { id } = useParams();
  console.log("🚀 ========= listBranch:", listBranch);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    fetchBranchList();
  }, []);
  console.log(window.location.pathname);
  const fetchBranchList = async () => {
    try {
      const apiUrl = "/api/host/branches";
      const response = await CallApi(apiUrl, "get");
      setListBranch(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch list branch ERROR: " +
          error.response?.data?.error
      );
    }
  };
  function truncateString(str) {
    if (str.length > 16) {
      return <Tooltip title={str}>{`${str.slice(0, 16)}...`}</Tooltip>;
    }
    return str;
  }
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: "9vh" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <Link to="/host/dashboard">
            <ListItem
              disablePadding
              className={
                window.location.pathname == "/host/dashboard" && "bg-[#ddd]"
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <SplitscreenIcon />
                </ListItemIcon>
                <ListItemText primary="Thống kê" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to="/host/type-court-table">
            <ListItem
              disablePadding
              className={
                window.location.pathname == "/host/type-court-table" && "bg-[#ddd]"
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <SplitscreenIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách kiểu sân" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItem
            disablePadding
            className={
              window.location.pathname != "/host/dashboard" &&
              window.location.pathname != "/host/type-court-table" &&
              "bg-[#ddd]"
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách cơ sở" />{" "}
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <Collapse sx={{ pl: 4 }} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/host/list-branch">
                <ListItem
                  className={
                    window.location.pathname == "/host/list-branch" &&
                    "bg-[#ddd]"
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <TurnedInNotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tất cả cơ sở" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
              {listBranch?.map((item) => (
                <>
                  <Link to={`/host/branch/${item?.id}`} key={item?.id}>
                    <ListItem className={id == item?.id && "bg-[#ddd]"}>
                      <ListItemButton>
                        <ListItemIcon>
                          <TurnedInNotIcon />
                        </ListItemIcon>
                        <ListItemText primary={truncateString(item?.name)} />
                      </ListItemButton>
                    </ListItem>
                  </Link>{" "}
                  <Divider />
                </>
              ))}
            </List>
          </Collapse>
        </List>
      </nav>
    </Box>
  );
}
