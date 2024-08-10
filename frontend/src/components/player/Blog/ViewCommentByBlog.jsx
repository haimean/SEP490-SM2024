/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import { Comment, Delete } from "@mui/icons-material";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import { toast } from "react-toastify";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const ViewCommentByBlog = ({ blogId, refreshComments }) => {
  const [comments, setComments] = useState([]);
  const [loadMoreComments, setLoadMoreComments] = useState(10);
  const currentAccountId = parseInt(localStorage.getItem("accountId"));
  const { openDialog, DialogComponent } = useDialogConfirm();

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  useEffect(() => {
    if (refreshComments) {
      refreshComments(fetchComments);
    }
  }, [refreshComments]);

  const fetchComments = async () => {
    try {
      const result = await CallApi(`/api/user/blog/${blogId}/comment`, "get");
      setComments(result?.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    openDialog("Bạn có chắc chắn muốn xóa bình luận này không?", async () => {
      try {
        await CallApi(`/api/user/comment/${id}`, "delete");
        fetchComments();
        toast.success("Xóa bình luận thành công");
      } catch (error) {
        toast.error("Xóa bình luận thất bại");
        console.error("Error deleting comment:", error);
      }
    });
  };

  const handleLoadMore = () => {
    setLoadMoreComments((prevVisible) => prevVisible + 10);
  };

  return (
    <Box mt={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <Comment sx={{ ml: 2, mr: 1 }} />
        <Typography variant="h6">{comments.length} bình luận</Typography>
      </Box>
      {comments.slice(0, loadMoreComments).map((comment) => (
        <Card key={comment.id} sx={{ mb: 2, boxShadow: "none" }}>
          <CardHeader
            avatar={
              <Avatar src={comment.account?.user?.avatar}>
                {comment.account?.user?.fullName?.charAt(0) || "U"}
              </Avatar>
            }
            action={
              currentAccountId === comment?.accountId && (
                <IconButton
                  aria-label="delete comment"
                  onClick={() => handleDeleteComment(comment?.id)}
                >
                  <Delete />
                </IconButton>
              )
            }
            title={
              <Box display="flex" alignItems="center">
                <Typography
                  variant="subtitle2"
                  component="span"
                  sx={{ fontWeight: "bold", mr: 1 }}
                >
                  {comment?.account?.user?.fullName || "Người dùng"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {getTimeSinceCreation(comment.createdAt)}
                </Typography>
              </Box>
            }
            subheader={
              <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                {comment.content}
              </Typography>
            }
          />
        </Card>
      ))}
      <DialogComponent />
      {loadMoreComments < comments.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={handleLoadMore} variant="outlined">
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ViewCommentByBlog;
