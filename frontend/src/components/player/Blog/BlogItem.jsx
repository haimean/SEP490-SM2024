/* eslint-disable react/prop-types */
import { useState, Fragment } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import { MoreVert, Flag, Comment } from "@mui/icons-material";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import CreateComment from "./CreateComment";
import NewestComments from "./NewestComments";
import ReportModal from "./ReportModal";
import { toast } from "react-toastify";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const BlogItem = ({ blog, onOpenDetail, onDelete }) => {
  const [commentingBlogId, setCommentingBlogId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const currentAccountId = parseInt(localStorage.getItem("accountId"));
  const { openDialog, DialogComponent } = useDialogConfirm();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCommentClick = (blogId) => {
    setCommentingBlogId(commentingBlogId === blogId ? null : blogId);
  };

  const handleCommentCreated = () => {
    setCommentingBlogId(null);
  };

  const handleDelete = async () => {
    openDialog("Bạn có chắc chắn muốn xóa trạng thái này không?", async () => {
      try {
        await onDelete(blog?.id);
        toast.success("Xóa trạng thái thành công");
      } catch (error) {
        toast.error("Xóa trạng thái thất bại");
      }
    });
    handleMenuClose();
  };

  const handleReportClick = () => {
    setReportModalOpen(true);
  };

  const handleReportClose = () => {
    setReportModalOpen(false);
  };

  return (
    <Card sx={{ mb: 5, boxShadow: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader
          avatar={
            <Avatar src={blog?.account?.user?.avatar}>
              {blog?.account?.user?.fullName?.[0] || "U"}
            </Avatar>
          }
          title={blog?.account?.user?.fullName || "Người dùng"}
          subheader={getTimeSinceCreation(blog?.createdAt)}
        />
        {currentAccountId === blog?.accountId && (
          <>
            <IconButton sx={{ mr: 1 }} onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleMenuClose}
              elevation={1}
            >
              <MenuItem onClick={handleDelete}>Xóa trạng thái</MenuItem>
            </Menu>
          </>
        )}
      </Box>

      <CardContent
        sx={{ cursor: "pointer" }}
        onClick={() => onOpenDetail(blog)}
      >
        <Typography variant="body2" color="text.secondary">
          {blog?.caption?.split("\n").map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </Typography>
        {blog?.image && (
          <Box sx={{ mt: 2 }}>
            <img
              src={blog?.image}
              alt="Blog image"
              style={{ width: "500px", height: "auto", margin: "auto" }}
            />
          </Box>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Bình luận">
          <IconButton
            aria-label="comment"
            onClick={() => handleCommentClick(blog?.id)}
          >
            <Comment />
          </IconButton>
        </Tooltip>

        {currentAccountId !== blog?.accountId && (
          <Tooltip title="Báo cáo">
            <IconButton aria-label="report" onClick={handleReportClick}>
              <Flag />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
      {commentingBlogId === blog?.id && (
        <CardContent>
          <CreateComment
            blogId={blog?.id}
            onCommentCreated={handleCommentCreated}
          />
        </CardContent>
      )}
      <Divider sx={{ mt: 1, mx: 2 }} />

      <NewestComments
        blogId={blog?.id}
        onClick={() => onOpenDetail(blog)}
        refresh={handleCommentCreated}
      />
      <ReportModal
        open={reportModalOpen}
        onClose={handleReportClose}
        blogId={blog?.id}
      />
      <DialogComponent />
    </Card>
  );
};

export default BlogItem;
