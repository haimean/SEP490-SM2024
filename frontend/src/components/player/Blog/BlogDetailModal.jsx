import { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import ViewCommentByBlog from "../../../components/player/Blog/ViewCommentByBlog";
import CreateComment from "./CreateComment";

const BlogDetailModal = ({ open, onClose, blog }) => {
  const fetchCommentsRef = useRef(null);

  if (!blog) return null;

  const handleCommentCreated = () => {
    if (fetchCommentsRef.current) {
      fetchCommentsRef.current();
    }
  };

  const setFetchComments = (fetchFunc) => {
    fetchCommentsRef.current = fetchFunc;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            Bài viết của {blog?.account?.user?.fullName}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
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
              {blog.account?.user?.fullName?.charAt(0) || "U"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">
                {blog.account?.user?.fullName || "Người dùng"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getTimeSinceCreation(blog.createdAt)}
              </Typography>
            </Box>
          </Box>
          <IconButton aria-label="report">
            <FlagIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" paragraph>
          {blog.caption}
        </Typography>
        {blog.image && (
          <Box mb={2}>
            <img
              src={blog.image}
              alt="Blog image"
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
          </Box>
        )}
        <Divider sx={{ my: 2 }} />

        <ViewCommentByBlog
          blogId={blog.id}
          refreshComments={setFetchComments}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <CreateComment
          blogId={blog.id}
          onCommentCreated={handleCommentCreated}
        />
      </DialogActions>
    </Dialog>
  );
};

export default BlogDetailModal;
