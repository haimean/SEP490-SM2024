import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import InputLabel from "../common/InputLabel.jsx";
import { toast } from "react-toastify";
import CallApi from "../../service/CallAPI.jsx";
import { useNavigate } from "react-router-dom";
import VerifyAccountModal from "../auth/VerifyAccountModal.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../middleware/redux/userSlice.js";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const dispatch = useDispatch();

  const manageResponse = (response, email) => {
    const { token, role } = response.data;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userRole", role); // Lưu vai trò người dùng
    dispatch(setUser({ user: email, role })); // Cập nhật thông tin người dùng vào Redux
    toast.success(`Đăng nhập thành công!`);
    if (role === "ADMIN") {
      navigate("/admin/list-account");
    } else if (role === "HOST") {
      navigate("/");
    } else if (role === "USER") {
      navigate("/");
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await CallApi(
        "/api/auth/login",
        "post",
        {
          email,
          password,
        },
        {}
      );
      if (!response.data.isVerified) {
        setModalContent(
          "Tài khoản của bạn chưa được xác minh. Vui lòng kiểm tra email để xác minh tài khoản."
        );
        setShowVerifyModal(true);
        return;
      }
      manageResponse(response, email);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log("Google Login:", decodedToken);
      const { email, name, picture } = decodedToken;
      console.log("Email:", email);
      console.log("Name:", name);
      console.log("Avatar:", picture);
      try {
        const response = await CallApi(
          "/api/auth/login-google",
          "post",
          {
            email,
            name,
            role: "USER",
          },
          {}
        );
        manageResponse(response, email);
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    } else {
      console.log("No credential response");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Đăng nhập bằng Google thất bại:", error);
    toast.error("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
    setModalContent("");
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Email"
            id="email"
            register={register}
            pattern={{
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Vui lòng nhập email hợp lệ.",
            }}
            errors={errors}
            required="Không được bỏ trống trường này."
          />
          <InputLabel
            label="Mật khẩu"
            id="password"
            register={register}
            errors={errors}
            required="Không được bỏ trống trường này."
            type="password"
          />
          <button
            type="submit"
            className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Quên mật khẩu?
          </a>
        </div>
        <div className="mt-4 text-center flex justify-center w-full">
          <GoogleLogin
            size="large"
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href="/sign-up-player"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Chưa có tài khoản? Đăng kí
          </a>
        </div>
      </div>
      <VerifyAccountModal show={showVerifyModal} onClose={handleCloseModal}>
        {modalContent}
      </VerifyAccountModal>
      <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SignInForm;
