import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";

const ModalBlogAdmin = ({ open, onClose, blog }) => {
  if (!blog) return null;
  console.log(blog);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            Bài viết của {blog?.account?.user?.fullName || "Người dùng"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2 }}>
              {blog?.account?.user?.fullName?.charAt(0) || "U"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">
                {blog?.account?.user?.fullName || "Người dùng"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getTimeSinceCreation(blog?.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          {blog?.caption}
        </Typography>
        {blog?.image && (
          <Box mb={2}>
            <img
              src={blog.image}
              alt="Blog image"
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalBlogAdmin;
