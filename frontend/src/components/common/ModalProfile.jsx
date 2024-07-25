import { Card, CardContent, Dialog, Typography } from "@mui/material";
import CallApi from "../../service/CallAPI";
import { useEffect, useState } from "react";

export default function ModalProfile({ open, onClose, id }) {
  const [data, setData] = useState({});
  const getProfile = async () => {
    try {
      const result = await CallApi(`/api/user/profile/${id}`);
      console.log("🚀 ========= result:", result?.data);
      setData(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <Card className="p-6">
        <div className="flex items-center">
          <img
            className="w-28 h-28 rounded-full"
            src={
              data?.user?.avatar ||
              "https://i.pinimg.com/236x/db/16/7f/db167f5639b20ed2857ddd862626e24e.jpg"
            }
            alt="green iguana"
          />
          <div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tên người chơi: {data?.user?.fullName}
              </Typography>
              <p>Giới tính: {data?.user?.gender === "MALE" ? "Nam" : "Nữ"}</p>
              <p>Sinh nhật: {data?.user?.dob || "Chưa có"}</p>
              <Typography variant="body2" color="text.secondary">
                Gmail: {data?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số điện thoại: {data?.user?.numberPhone || "Chưa có"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Địa chỉ: {data?.user?.address || "Chưa có"}
              </Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </Dialog>
  );
}
