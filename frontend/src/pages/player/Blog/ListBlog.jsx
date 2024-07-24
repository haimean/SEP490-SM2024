import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import CreateBlog from "../../../components/player/Blog/CreateBlog";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import BlogDetailModal from "../../../components/player/Blog/BlogDetailModal";
import CreateComment from "../../../components/player/Blog/CreateComment";
import NewestComments from "../../../components/player/Blog/NewestComments";

const ListBlog = () => {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [commentingBlogId, setCommentingBlogId] = useState(null);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenDetailModal = (blog) => {
    setSelectedBlog(blog);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedBlog(null);
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  const handleCommentClick = (blogId) => {
    setCommentingBlogId(commentingBlogId === blogId ? null : blogId);
  };

  const handleCommentCreated = () => {
    setCommentingBlogId(null);
  };

  const fetchBlogs = async () => {
    const requestData = {
      pagination: {
        page: page,
        perPage: perPage,
      },
    };
    try {
      const result = await CallApi(
        `/api/user/blog/get-all`,
        "post",
        requestData
      );
      setBlogs(result?.data?.blogs);
      setTotalPages(Math.max(1, Math.ceil(result?.data?.total / perPage) || 1));
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchBlogs();
  }, [openCreateModal, page]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Hãy nêu cảm nghĩ của bạn lúc này"
          onClick={handleOpenCreateModal}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{null}</Avatar>
              </InputAdornment>
            ),
          }}
          sx={{
            cursor: "pointer",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      </Box>

      {blogs.map((blog) => (
        <Card key={blog?.id} sx={{ mb: 2 }}>
          <CardHeader
            avatar={<Avatar>{blog?.account?.user?.fullName}</Avatar>}
            title={blog?.account?.user?.fullName || "Người dùng"}
            subheader={getTimeSinceCreation(blog?.createdAt)}
          />
          <CardContent
            sx={{ cursor: "pointer" }}
            onClick={() => handleOpenDetailModal(blog)}
          >
            <Typography variant="body2" color="text.secondary">
              {blog?.caption}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <img
                src={blog?.image}
                alt="Blog image"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="comment"
              onClick={() => handleCommentClick(blog?.id)}
            >
              <CommentIcon />
            </IconButton>
            <IconButton aria-label="report">
              <FlagIcon />
            </IconButton>
          </CardActions>
          {commentingBlogId === blog?.id && (
            <CardContent>
              <CreateComment
                blogId={blog?.id}
                onCommentCreated={() => {
                  handleCommentCreated();
                }}
              />
            </CardContent>
          )}
          <NewestComments
            blogId={blog?.id}
            onClick={() => handleOpenDetailModal(blog)}
            refresh={() => {
              handleCommentCreated();
            }}
          />
        </Card>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <CreateBlog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onBlogCreated={handleBlogCreated}
      />
      <BlogDetailModal
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        blog={selectedBlog}
      />
    </Container>
  );
};

export default ListBlog;
