import React from "react";
import PostCard from "./PostCard";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

const PostLandingPage = ({ blog }) => {
  return (
    <Box sx={{ my: 8, mx: 14 }}>
      <div className="flex justify-between py-4">
        <Typography variant="h4" component="h2" mb={6} fontWeight={600}>
          Trận đấu sắp tới
        </Typography>
        <Link href="/available-post">
          <Button
            variant="contained"
            color="primary"
            sx={{ height: 40, px: 2 }}
          >
            Xem thêm
          </Button>
        </Link>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <PostCard {...blog[0]} isLarge={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {blog.slice(1, 3).map((item, index) => (
              <Grid item xs={12} key={index}>
                <PostCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostLandingPage;
