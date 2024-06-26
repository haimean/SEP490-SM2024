import React, { useEffect, useState } from "react";
import InputLabel from "../../components/common/InputLabel.jsx";
import CallApi from "../../service/CallAPI.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EMAIL_REGEX, PHONE_REGEX, WHITE_SPACE_REGEX } from "../../utils/regex/index.js";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.user) {
      setValue("name", profile.user.name);
      setValue("dob", formatDate(profile.user.dob));
      setValue("numberPhone", profile.user.numberPhone);
    }
  }, [profile, setValue]);

  const fetchProfile = async () => {
    try {
      const response = await CallApi(`/api/user/profile`, "get");
      setProfile(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch court attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const onSubmit = async (data) => {
    const requestData = {
      name: data.name || profile?.user?.name,
      dob: data.dob || formatDate(profile?.user?.dob),
      numberPhone: data.numberPhone || profile?.user?.numberPhone,
    };
    console.log(requestData);
    try {
      await CallApi(`/api/user/profile`, "put", requestData, {});
      fetchProfile();
      toast.success(`Cập nhật thông tin cá nhân thành công`);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20 p-6 bg-white border shadow-lg rounded-md flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/3 p-4 border-r border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="path/to/avatar.jpg"
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover bg-blue-500"
            />
            {/* <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 13V16H7L16.2929 6.70711L13.2929 3.70711L4 13ZM17.7071 5.29289C18.0976 5.68342 18.0976 6.31658 17.7071 6.70711L16.2929 8.12132L11.8787 3.70711L13.2929 2.29289C13.6834 1.90237 14.3166 1.90237 14.7071 2.29289L17.7071 5.29289Z" />
              </svg>
            </button> */}
          </div>
          <h3 className="mt-4 text-xl font-semibold">{profile?.user?.name}</h3>
          <p className="text-gray-500">{profile.role}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <Link to="/change-password">Change Password</Link>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputLabel
              label="Họ tên"
              id="name"
              placeholder="Họ và tên"
              register={register}
              defaultValue={profile?.user?.name}
              pattern={{
                value: WHITE_SPACE_REGEX,
                message: "Vui lòng nhập tên hợp lệ",
              }}
              errors={errors}
              required={true}
              type="text"
            />
            <InputLabel
              label="Số điện thoại"
              id="numberPhone"
              placeholder="+84 888 888 888"
              register={register}
              defaultValue={profile?.user?.numberPhone}
              pattern={{
                value: PHONE_REGEX,
                message: "Vui lòng nhập số điện thoại hợp lệ",
              }}
              errors={errors}
              required={true}
              type="tel"
            />
            <InputLabel
              label="Ngày sinh"
              id="dob"
              placeholder="01-01-2000"
              register={register}
              defaultValue={
                profile?.user?.dob && formatDate(profile?.user?.dob)
              }
              pattern={{
                value: WHITE_SPACE_REGEX,
                message: "Vui lòng chọn ngày tháng năm hợp lệ",
              }}
              errors={errors}
              required={true}
              type="date"
            />
            <InputLabel
              label="Email"
              id="email"
              placeholder="email@example.com"
              register={register}
              defaultValue={profile?.email}
              disabled={true}
              pattern={{
                value: EMAIL_REGEX,
                message: "Vui lòng nhập email hợp lệ",
              }}
              errors={errors}
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sửa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
