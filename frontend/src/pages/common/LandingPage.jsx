import { useEffect, useState } from "react";
import PostLandingPage from "../../components/player/Post/PostLandingPage";
import CallApi from "../../service/CallAPI";
import BannerHost from "../../components/common/LandingPage/BannerHost";
import BannerUser from "../../components/common/LandingPage/BannerUser";
import TopBranches from "../../components/common/LandingPage/TopBranches";
import { toast } from "react-toastify";

const LandingPage = () => {
  const role = localStorage.getItem("userRole");
  const [posts, setPosts] = useState([]);
  const [branches, setBranches] = useState([]);

  const getTopBranch = async () => {
    try {
      const result = await CallApi("/api/branches/top-3", "get");
      setBranches(result?.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const getTopPost = async () => {
    try {
      const result = await CallApi(`/api/post/top-3`, "get");
      setPosts(result?.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  useEffect(() => {
    getTopBranch();
    getTopPost();
  }, []);

  return (
    <>
      <main>
        {role === "HOST" && <BannerHost />}
        {role != "HOST" && <BannerUser />}
        <PostLandingPage post={posts} />

        <TopBranches branches={branches} role={role} />

        {/* <section className="block">
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
        </section> */}
      </main>
    </>
  );
};

export default LandingPage;
