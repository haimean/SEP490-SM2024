// eslint-disable-next-line no-unused-vars
import React from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Button,
    Paper
} from "@mui/material";
import {
    LocationOn,
    Phone, Email,
    SportsBasketball,
    AccountBox
} from "@mui/icons-material";
import CourtCard from "../Court/CourtCard";
import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg"

const courts = [
    {
      id: 1,
      title: "Sân 1",
      price: "50.000đ/1h",
      image: testImg,
    },
    {
      id: 2,
      title: "Sân 2",
      price: "50.000đ/1h",
      image: testImg,
    },
    {
      id: 3,
      title: "Sân 3",
      price: "50.000đ/1h",
      image: testImg,
    },
    {
      id: 4,
      title: "Sân 4",
      price: "50.000đ/1h",
      image: testImg,
    },
  ];

const UserBranchDetail = ({
    title,
    image,
    description,
    map,
}) => {
    const renderInfoItem = (Icon, text) => (
        <Box display="flex" alignItems="center" mb={1}>
            <Icon color="action" />
            <Typography variant="body2" ml={1}>
                {text}
            </Typography>
        </Box>
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3 }}>
                    <CardMedia
                        component="img"
                        className={"object-cover bg-blue-200 h-96"}
                        image={image}
                        alt="Activity image"
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Mô tả thêm
                        </Typography>
                        {renderInfoItem(SportsBasketball, description)}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                    <AccountBox style={{ marginRight: '8px' }} /> Anh Linh
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        <Phone style={{ marginRight: '8px' }} />
                        0123456789
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        <Email style={{ marginRight: '8px' }} />
                        manhpro9900@gmail.com
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        <LocationOn style={{ marginRight: '8px' }} />
                        "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội"
                    </Typography>
                    {map}
                </CardContent>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Các sân có sẵn
                </Typography>
                <Grid container spacing={3}>
                    {courts.map((court) => (
                        <Grid item xs={12} md={4} key={court.id}>
                            <CourtCard activity={court} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserBranchDetail;
