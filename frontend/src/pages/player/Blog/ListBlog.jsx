import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Pagination,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import CreateBlog from "../../../components/player/Blog/CreateBlog";
import CallApi from "../../../service/CallAPI";
import BlogDetailModal from "../../../components/player/Blog/BlogDetailModal";
import BlogItem from "../../../components/player/Blog/BlogItem";

const ListBlog = () => {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await CallApi(`/api/user/profile`, "get");
      setProfile(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch profile ERROR: " + error.response?.data?.error
      );
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
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

  const handleDelete = async (blogId) => {
    try {
      await CallApi(`/api/user/blog/${blogId}`, "delete");
      setBlogs(blogs.filter((blog) => blog?.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const fetchBlogs = async () => {
    const requestData = {
      pagination: { page, perPage },
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
      console.error("Error fetching blogs:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, openCreateModal]);

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
                <Avatar
                  sx={{ width: 32, height: 32, mr: 1 }}
                  src={profile?.user?.avatar}
                >
                  {profile?.user?.fullName?.[0] || "U"}
                </Avatar>
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
        <BlogItem
          key={blog?.id}
          blog={blog}
          onOpenDetail={handleOpenDetailModal}
          onDelete={handleDelete}
        />
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
