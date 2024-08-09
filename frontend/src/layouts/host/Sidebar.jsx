import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CallApi from "../../service/CallAPI";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Collapse } from "@mui/material";

export default function Sidebar() {
  // list sân
  const [listBranch, setListBranch] = useState([]);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    fetchBranchList();
  }, []);

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

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: "9vh" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <Link to="/type-court-table">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* // TODO: */}
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách kiểu sân" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                {/* // TODO: */}
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách cơ sở" />{" "}
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse sx={{ pl: 4 }} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/host/list-branch">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {/* // TODO: */}
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tất cả cơ sở" />
                  </ListItemButton>
                </ListItem>
              </Link>
              {listBranch?.map((item) => (
                <Link to={`/host/branch/${item?.id}`} key={item?.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarBorder />
                      {/* //todo */}
                    </ListItemIcon>
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </nav>
    </Box>
  );
}
