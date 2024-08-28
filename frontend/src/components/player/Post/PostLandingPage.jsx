/* eslint-disable react/prop-types */
import PostCard from "./PostCard";
import { Button, Container, Grid, Link, Typography } from "@mui/material";

const PostLandingPage = ({ post }) => {
  return (
    <Container sx={{ my: { xs: 2, sm: 4, md: 8 } }} className="mx-auto">
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
        <Grid item xs={12} md={7}>
          <PostCard
            post={post[0]}
            postId={post[0]?.id}
            owner={post[0]?.title}
            court={post[0]?.booking?.Court?.TypeCourt?.name}
            branchName={post[0]?.booking?.Court?.Branches?.name}
            courtName={post[0]?.booking?.Court?.name}
            price={post[0]?.memberPost[0]?.price}
            time={post[0]?.booking?.startTime}
            image={post[0]?.booking?.Court?.TypeCourt?.image}
            isLarge={true}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            {post?.slice(1, 3)?.map((post, index) => (
              <Grid item xs={12} key={index}>
                <PostCard
                  post={post}
                  postId={post?.id}
                  owner={post?.title}
                  court={post?.booking?.Court?.TypeCourt?.name}
                  branchName={post?.booking?.Court?.Branches?.name}
                  courtName={post?.booking?.Court?.name}
                  price={post?.memberPost[0]?.price}
                  time={post?.booking?.startTime}
                  image={post?.booking?.Court?.TypeCourt?.image}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostLandingPage;
