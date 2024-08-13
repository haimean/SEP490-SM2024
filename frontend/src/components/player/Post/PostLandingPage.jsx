import PostCard from "./PostCard";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

const PostLandingPage = ({ post }) => {
  return (
    <Box sx={{ my: { xs: 2, sm: 4, md: 8 }, mx: { xs: 2, sm: 8, md: 14 } }}>
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
          <PostCard
            postId={post[0]?.id}
            owner={post[0]?.booking?.bookingInfo?.name}
            court={post[0]?.booking?.Court?.TypeCourt?.name}
            price={post[0]?.booking?.price}
            time={post[0]?.booking?.startTime}
            image={post[0]?.booking?.Court?.TypeCourt?.image}
            isLarge={true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {post?.slice(1, 3)?.map((post, index) => (
              <Grid item xs={12} key={index}>
                <PostCard
                  post={post}
                  postId={post?.id}
                  owner={post?.booking?.bookingInfo?.name}
                  court={post?.booking?.Court?.TypeCourt?.name}
                  price={post?.booking?.price}
                  time={post?.booking?.startTime}
                  image={post?.booking?.Court?.TypeCourt?.image}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostLandingPage;
