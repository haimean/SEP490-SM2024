import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
const sidebar = [
  {
    id: 1,
    name: "Thống kê",
  },
  {
    id: 2,
    name: "Danh sách cơ sở",
  },
  {
    id: 3,
    name: "Lịch sử đăng ký",
  },
];
export default function Sidebar() {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: "9vh" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {sidebar.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
