import { Button, Container, Grid, TextField } from "@mui/material";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  WHITE_SPACE_REGEX,
} from "../../utils/regex/index.js";
import { useEffect, useState } from "react";

import CallApi from "../../service/CallAPI.jsx";
import ChangePassword from "../../components/auth/ChangePassword.jsx";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const avatarFile = watch("avatar");

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.user) {
      setValue("fullName", profile?.user?.fullName);
      if (profile?.user?.dob) {
        setValue("dob", formatDate(profile?.user?.dob));
      }
      setValue("numberPhone", profile?.user?.numberPhone);
      setValue("gender", profile?.user?.gender ?? "");
    }
  }, [profile, setValue]);

  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      if (avatarFile[0].size > 1024 * 1024) {
        toast.error("Ảnh phải nhỏ hơn 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader?.result);
      };
      reader.readAsDataURL(avatarFile[0]);
    }
  }, [avatarFile]);

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
    const formData = new FormData();

    formData.append("name", data.fullName || profile?.user?.fullName);
    formData.append(
      "dob",
      formatDate(data.dob) || formatDate(profile?.user?.dob)
    );
    formData.append(
      "numberPhone",
      data.numberPhone || profile?.user?.numberPhone
    );
    formData.append("gender", data.gender || profile?.user?.gender);
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      await CallApi(`/api/user/profile`, "put", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProfile();
      toast.success(`Cập nhật thông tin cá nhân thành công`);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Container className="max-w-7xl mx-auto my-20 p-6 bg-white border shadow-lg rounded-md flex flex-col lg:flex-row">
        <Grid container spacing={2}>
          <Grid item xs={4} className=" border-r border-gray-200">
            {/* Left Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={
                    avatarPreview ||
                    profile?.user?.avatar ||
                    "path/to/default-avatar.jpg"
                  }
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover bg-blue-500"
                />
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 13V16H7L16.2929 6.70711L13.2929 3.70711L4 13ZM17.7071 5.29289C18.0976 5.68342 18.0976 6.31658 17.7071 6.70711L16.2929 8.12132L11.8787 3.70711L13.2929 2.29289C13.6834 1.90237 14.3166 1.90237 14.7071 2.29289L17.7071 5.29289Z" />
                  </svg>
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("avatar", {
                    validate: (value) => {
                      if (value[0] && value[0].size > 1024 * 1024) {
                        return "Ảnh phải nhỏ hơn 1MB";
                      }
                      return true;
                    },
                  })}
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {profile?.user?.fullName}
              </h3>
              <p className="text-gray-500">{profile?.role}</p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                variant="contained"
                color="inherit"
                onClick={handleOpenModal}
              >
                Thay đổi mật khẩu
              </Button>
            </div>
          </Grid>
          <Grid item xs={8}>
            {/* Right Section */}
            <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  label="Họ tên"
                  id="fullName"
                  placeholder="Họ và tên"
                  {...register("fullName", {
                    pattern: {
                      value: WHITE_SPACE_REGEX,
                      message: "Vui lòng nhập tên hợp lệ",
                    },
                  })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  fullWidth
                  margin="normal"
                  defaultValue={profile?.user?.fullName}
                  required
                  InputLabelProps={{
                    shrink: true, // Đảm bảo label luôn di chuyển lên trên
                  }}
                />
                <TextField
                  label="Số điện thoại"
                  id="numberPhone"
                  placeholder="+84 888 888 888"
                  {...register("numberPhone", {
                    pattern: {
                      value: PHONE_REGEX,
                      message: "Vui lòng nhập số điện thoại hợp lệ",
                    },
                  })}
                  error={!!errors.numberPhone}
                  helperText={errors.numberPhone?.message}
                  fullWidth
                  margin="normal"
                  defaultValue={profile?.user?.numberPhone}
                  required
                  InputLabelProps={{
                    shrink: true, // Đảm bảo label luôn di chuyển lên trên
                  }}
                />
                <TextField
                  label="Ngày sinh"
                  id="dob"
                  placeholder="01-01-2000"
                  {...register("dob", {
                    pattern: {
                      value: WHITE_SPACE_REGEX,
                      message: "Vui lòng chọn ngày tháng năm hợp lệ",
                    },
                  })}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  fullWidth
                  margin="normal"
                  type="date"
                  defaultValue={profile?.user?.dob}
                  required
                  InputLabelProps={{
                    shrink: true, // Đảm bảo label luôn di chuyển lên trên
                  }}
                />
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Giới tính
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      {...register("gender", {
                        required: "Vui lòng chọn giới tính",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:shadow-outline bg-white"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="OTHER">Khác</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <TextField
                  label="Email"
                  id="email"
                  placeholder="email@example.com"
                  {...register("email", {
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Vui lòng nhập email hợp lệ",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  margin="normal"
                  value={profile?.email}
                  disabled
                  InputLabelProps={{
                    shrink: true, // Đảm bảo label luôn di chuyển lên trên
                  }}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="mt-6 w-full py-2 px-4"
              >
                Cập nhật
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <ChangePassword open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Profile;
