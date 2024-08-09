import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CallApi from "../../service/CallAPI";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
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

                  <SplitscreenIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách kiểu sân" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                {/* // TODO: */}
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
                <ListItem>
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
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <TurnedInNotIcon />
                        </ListItemIcon>
                        <ListItemText primary={item?.name} />
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
