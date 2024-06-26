import React from "react";
import Navbar from "../../layouts/player/Navbar.jsx";
import Footer from "../../layouts/player/Footer.jsx";
import feature_1 from "../../assets/svg/feature_1.svg";
import feature_2 from "../../assets/svg/feature_2.svg";
import feature_3 from "../../assets/svg/feature_3.svg";
import feature_4 from "../../assets/svg/feature_4.svg";
import discover_1 from "../../assets/svg/discover_1.svg";
import discover_2 from "../../assets/svg/discover_2.svg";
import discover_3 from "../../assets/svg/discover_3.svg";
import tick from "../../assets/svg/tick.svg";
import Blog from "../../components/player/Blog/Blog.jsx";

const LandingPage = () => {
  const blogData = [
    {
      court: "Sân vận động Mỹ Đình",
      address: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      court: "Sân vận động Thống Nhất",
      address: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
    {
      court: "Sân vận động Cẩm Phả",
      address: "138 Đặng Văn Ngữ, Phường Cẩm Phả, Cẩm Phả, Quảng Ninh",
      time: "19:30, 25/07/2024",
      image: "/path/to/cam-pha-image.jpg",
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative py-10 overflow-hidden text-center text-white text-opacity-80 md:py-20 bg-blue-400 mt-16">
          <div className="max-w-screen-sm mx-auto">
            <div>
              <h1 className="text-4xl font-bold mt-0">
                Landing template for startups
              </h1>
              <p className="mt-4">
                Our landing page template works for all the devices, so you only
                have to set it up once, and get beautiful results forever.
              </p>
              <p className="mt-6">
                <a
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
                  href="#"
                >
                  Get started now
                </a>
              </p>
              <div className="mt-8" />
            </div>
          </div>
        </section>

        {/* CallAPI mảng obj 3 bài báo, đây chỉ là fix cứng */}
        <Blog blog={blogData} /> 

        <section className="block">
          <div className="container">
            <div className="py-3 md:py-4 relative mx-40">
              <div className="text-center">
                <div className="container mx-auto px-6 sm:px-0 max-w-[800px] sm:max-w-[848px]">
                  <h2 className="mt-0 mb-4 font-bold text-3xl leading-10 tracking-[-0.1px] sm:text-4xl sm:leading-[46px] sm:tracking-[-0.2px]">
                    Meet Evelyn
                  </h2>
                  <p className="sm:px-[72px] sm:mb-0 mt-0 mb-6">
                    Lorem ipsum is common placeholder text used to demonstrate
                    the graphic elements of a document or visual presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:order-1 md:w-auto md:p-6">
                  <img src={discover_1} alt="discover_1" />
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:mb-0 md:w-auto md:p-6 lg:p-3">
                  <img src={discover_2} alt="discover_2" />
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:order-1 md:w-auto md:p-6">
                  <img src={discover_3} alt="discover_3" />
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block">
          <div className="container">
            <div className="relative py-12 sm:py-20">
              <h2 className="sm:mb-16 mt-0 text-center text-3xl sm:text-4xl leading-10 sm:leading-[46px] tracking-[-0.1px] sm:tracking-[-0.2px]">
                Pricing
              </h2>
              <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 md:gap-x-12">
                <div className="p-4 w-[344px] max-w-[344px] flex-grow shadow-2xl">
                  <div className="relative flex flex-wrap bg-white p-2 h-full">
                    <div className="relative w-full">
                      <div className="relative">
                        <div className="mb-4 text-teal-500 text-xl">
                          Lorem ipsum
                        </div>
                        <div className="mb-6 pb-8">
                          <span className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                            $
                          </span>
                          <span className="text-4xl font-bold mt-0">29</span>
                        </div>
                      </div>
                      <ul className="list-none p-0 text-xs mb-4">
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full flex self-end">
                      <button
                        className="bg-gradient-to-r from-teal-600 to-cyan-400 text-white transition duration-150 ease-in-out text-sm cursor-pointer w-full justify-center inline-flex items-center font-semibold uppercase tracking-wider focus:outline-none rounded-md px-8 py-4"
                        href="#"
                      >
                        Get started now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 w-[344px] max-w-[344px] flex-grow shadow-2xl">
                  <div className="relative flex flex-wrap bg-white p-2 h-full">
                    <div className="relative w-full">
                      <div className="relative">
                        <div className="mb-4 text-teal-500 text-xl">
                          Lorem ipsum
                        </div>
                        <div className="mb-6 pb-8">
                          <span className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                            $
                          </span>
                          <span className="text-4xl font-bold mt-0">129</span>
                        </div>
                      </div>
                      <ul className="list-none p-0 text-xs mb-4">
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <img src={tick} alt="tick" />
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full flex self-end">
                      <button
                        className="bg-gradient-to-r from-teal-600 to-cyan-400 text-white transition duration-150 ease-in-out text-sm cursor-pointer w-full justify-center inline-flex items-center px-8 py-4 font-semibold uppercase tracking-wider focus:outline-none rounded-md"
                        href="#"
                      >
                        Get started now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
