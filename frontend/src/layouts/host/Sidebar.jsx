import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import { Link } from "react-router-dom";
const sidebar = [
  {
    id: 1,
    name: "Danh sách kiểu sân",
    router: "/type-court-table",
  },
  {
    id: 2,
    name: "Danh sách cơ sở",
    router: "/host/list-branch",
  },
];
export default function Sidebar() {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: "9vh" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {sidebar.map((item) => (
            <Link to={item.router} key={item.id}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
