const BannerHost = () => {
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
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className="w-1/2">
          <div className="p-8">
            <h1 className="text-5xl font-bold leading-tight">
              Đưa sân cầu lông đến gần người chơi hơn
            </h1>
            <p className="mt-4 text-xl">
              Nền tảng trực tuyến giúp chủ sân quảng bá và cho thuê sân cầu lông
              dễ dàng. Tiếp cận hàng ngàn người chơi, tăng lượt đặt sân và tối
              ưu hóa doanh thu của bạn!
            </p>
            <a
              className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              href="/host/list-branch"
            >
              Đăng ký sân ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHost;
