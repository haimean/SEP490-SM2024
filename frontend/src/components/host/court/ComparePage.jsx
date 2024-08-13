// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import haversine from "haversine";
import Loading from "../../common/Loading";

export default function ComparePage() {
  const { court1, court2 } = useParams();
  const [firstCourt, setFirstCourt] = useState({});
  console.log("🚀 ========= firstCourt:", firstCourt);
  const [secondCourt, setSecondCourt] = useState({});
  console.log("🚀 ========= secondCourt:", secondCourt);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getDetailCourt = async () => {
    setIsLoading(true);
    try {
      const result1 = await CallApi(`/api/court/${court1}`);
      const result2 = await CallApi(`/api/court/${court2}`);

      if (result1 && result1.data) {
        setFirstCourt(result1.data);
        setIsLoading(false);
      } else {
        console.error("No data found for court1");
      }

      if (result2 && result2.data) {
        setSecondCourt(result2.data);
        setIsLoading(false);
      } else {
        console.error("No data found for court2");
      }
    } catch (error) {
      console.error("Error fetching court details:", error);
    }
  };

  useEffect(() => {
    getDetailCourt();
  }, []);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const distance = (item) => {
    return haversine(
      {
        latitude: item?.latitude || "21.013393218627524",
        longitude: item?.longitude || "105.52526950492785",
      },
      {
        latitude: location?.latitude || "21.013393218627524",
        longitude: location?.longitude || "105.52526950492785",
      }
    ).toFixed(2);
  };
  const PriceFilter = ({ data }) => {
    const prices = data?.map((item) => item?.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return (
      <>
        Giá từ {minPrice} đến {maxPrice}
      </>
    );
  };

  const minPrice = (items) => {
    return items?.reduce((prev, current) => {
      return prev?.price < current?.price ? prev : current;
    });
  };
  const maxPrice = (items) => {
    return items?.reduce((prev, current) => {
      return prev?.price > current?.price ? prev : current;
    });
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const rows = [
    {
      id: 1,
      title: "Tên sân",
      firstValue: firstCourt?.name,
      secondValue: secondCourt?.name,
    },
    {
      id: 2,
      title: "Địa chỉ",
      firstValue: firstCourt?.Branches?.address?.detail,
      secondValue: secondCourt?.Branches?.address?.detail,
    },
    {
      id: 3,
      title: "Giờ mở cửa",
      firstValue: firstCourt?.Branches?.openingHours,
      secondValue: secondCourt?.Branches?.openingHours,
    },
    {
      id: 4,
      title: "Khoảng cách",
      firstValue: `Cách bạn ${distance(firstCourt?.Branches?.name)} km`,
      secondValue: `Cách bạn ${distance(secondCourt?.Branches?.name)} km`,
    },
    {
      id: 5,
      title: "Mô tả",
      firstValue: firstCourt?.TypeCourt?.description,
      secondValue: secondCourt?.TypeCourt?.description,
    },
    {
      id: 6,
      title: "Giá",
      firstValue: `Từ ${formatCurrency(
        minPrice(firstCourt?.TypeCourt?.priceTypeCourt)?.price
      )} đến ${formatCurrency(
        maxPrice(firstCourt?.TypeCourt?.priceTypeCourt)?.price
      )}`,
      secondValue: `Từ ${formatCurrency(
        minPrice(secondCourt?.TypeCourt?.priceTypeCourt)?.price
      )} đến ${formatCurrency(
        maxPrice(secondCourt?.TypeCourt?.priceTypeCourt)?.price
      )}`,
    },
    {
      id: 7,
      title: "Chi tiết sân",
      firstValue: (
        <Link to={`/branch/${firstCourt?.Branches?.id}/court/${firstCourt?.id}`}>
          <Button>Xem chi tiết</Button>
        </Link>
      ),
      secondValue: (
        <Link to={`/branch/${secondCourt?.Branches?.id}/court/${secondCourt?.id}`}>
          <Button>Xem chi tiết</Button>
        </Link>
      ),
    },
  ];
  const TruncateText = ({ text, length }) => {
    return (
      <Tooltip title={text}>
        {text?.length > length ? text?.substring(0, length) + "..." : text}
      </Tooltip>
    );
  };

  return isLoading == true ? (
    <Loading />
  ) : (
    <TableContainer className="mt-16" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <div className="flex items-center gap-3 flex-col">
                <img className="w-40 h-40" src={firstCourt?.Branches?.image} />
                <TruncateText text={firstCourt?.name} length={50} />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3 flex-col">
                <img className="w-40 h-40" src={secondCourt?.Branches?.image} />
                <TruncateText text={secondCourt?.name} length={50} />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.title}
              </TableCell>
              <TableCell align="center">
                {row?.id != 7 ? (
                  <TruncateText text={row?.firstValue} length={50} />
                ) : (
                  row?.firstValue
                )}
              </TableCell>
              <TableCell align="center">
                {row?.id != 7 ? (
                  <TruncateText text={row?.secondValue} length={50} />
                ) : (
                  row?.secondValue
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
