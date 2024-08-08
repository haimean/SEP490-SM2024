import { useEffect, useState } from "react";
import InputLabel from "../../components/common/InputLabel.jsx";
import CallApi from "../../service/CallAPI.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  WHITE_SPACE_REGEX,
} from "../../utils/regex/index.js";
import { Button, Container, Grid } from "@mui/material";
import ChangePassword from "../../components/auth/ChangePassword.jsx";

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
      setValue("name", profile?.user?.fullName);
      setValue("dob", formatDate(profile?.user?.dob));
      setValue("numberPhone", profile?.user?.numberPhone);
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
      name: data.name || profile?.user?.fullName,
      dob: data.dob || formatDate(profile?.user?.dob),
      numberPhone: data.numberPhone || profile?.user?.numberPhone,
    };
    try {
      await CallApi(`/api/user/profile`, "put", requestData);
      fetchProfile();
      toast.success(`Cập nhật thông tin cá nhân thành công`);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  const [openModal, setOpenModal] = useState(false);
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
                  src="path/to/avatar.jpg"
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover bg-blue-500"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {profile?.user?.fullName}
              </h3>
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
                <InputLabel
                  label="Họ tên"
                  id="name"
                  placeholder="Họ và tên"
                  register={register}
                  defaultValue={profile?.user?.fullName}
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
              <Button
                type="submit"
                variant="contained"
                className="mt-6 w-full py-2 px-4"
              >
                Cập nhật thông tin
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
