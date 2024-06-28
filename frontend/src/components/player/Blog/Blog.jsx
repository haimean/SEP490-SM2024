import React from "react";
import BlogCard from "../../common/BlogCard";
import { Box, Button, Grid, Typography } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <Box sx={{ my: 8, mx: 14 }}>
      <div className="flex justify-between py-4">
        <Typography variant="h4" component="h2" mb={6} fontWeight={600}>
          Trận đấu sắp tới
        </Typography>
        <Button variant="contained" color="primary" sx={{ height: 40, px: 2 }}>
          Xem thêm
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <BlogCard {...blog[0]} isLarge={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {blog.slice(1, 3).map((item, index) => (
              <Grid item xs={12} key={index}>
                <BlogCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Blog;
