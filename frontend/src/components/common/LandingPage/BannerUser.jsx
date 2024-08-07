import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BannerUser = () => {
  return (
    <section
      className="relative overflow-hidden text-white mt-16 h-[50rem] flex items-center"
      style={{
        backgroundImage: "url('/public/assets/background/banner-cau-long.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className="w-1/2">
          <div className="p-8">
            <h1 className="text-5xl font-bold leading-tight">
              Đặt sân cầu lông và tìm đối thủ dễ dàng
            </h1>
            <p className="mt-4 text-xl mb-8">
              Nền tảng trực tuyến giúp bạn đặt sân cầu lông, tìm người chơi cùng
              và ghép trận một cách nhanh chóng. Chơi cầu lông chưa bao giờ dễ
              dàng đến thế!
            </p>
            <Button variant="contained" color="primary">
              <Link to="/search-courts" className="py-3">
                Bắt đầu ngay
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerUser;
