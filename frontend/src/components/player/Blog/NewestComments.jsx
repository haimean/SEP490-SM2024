import { useState, useEffect } from "react";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";

const NewestComments = ({ blogId, onClick, refresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewestComments = async () => {
    setLoading(true);
    try {
      const result = await CallApi(
        `/api/user/blog/${blogId}/comment-newest`,
        "get"
      );
      setComments(result?.data);
    } catch (error) {
      console.error("Error fetching newest comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewestComments();
  }, [blogId, refresh]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          my: 1,
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (comments?.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 1, mb: 2, px: 2 }}>
      <Typography
        sx={{ mb: 1, cursor: "pointer" }}
        onClick={onClick}
        variant="body1"
        color="text.secondary"
      >
        Xem thêm bình luận
      </Typography>
      {comments.map((comment) => (
        <Box
          key={comment?.id}
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <Avatar sx={{ mr: 1 }}>
            {comment?.account?.user?.fullName?.charAt(0) || "U"}
          </Avatar>
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                {comment?.account?.user?.fullName || "Người dùng"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getTimeSinceCreation(comment?.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {comment?.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NewestComments;