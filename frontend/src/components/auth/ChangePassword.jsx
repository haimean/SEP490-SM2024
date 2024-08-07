import { useForm } from "react-hook-form";
import InputLabel from "../common/InputLabel.jsx";
import CallApi from "../../service/CallAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ChangePassword = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword });
      toast.success("Password changed successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const changePassword = async ({ oldPassword, newPassword }) => {
    return await CallApi("/api/user/change-password", "put", {
      oldPassword,
      newPassword,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="rounded-sm bg-white p-12 shadow-2xl w-96 mx-auto mt-40">
        <h1 className="font-bold text-center block text-2xl">
          Thay đổi mật khẩu
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Mật khẩu hiện tại"
            id="oldPassword"
            register={register}
            errors={errors}
            required={true}
            type="password"
          />
          <InputLabel
            label="Mật khẩu mới"
            id="newPassword"
            register={register}
            pattern={{
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              message:
                "Password must at least contains one uppercase letter, one lowercase letter, one number and one special character:",
            }}
            minLength={8}
            errors={errors}
            required={true}
            type="password"
          />
          <InputLabel
            label="Nhập lại mật khẩu mới"
            id="confirmNewPassword"
            register={register}
            errors={errors}
            required={true}
            type="password"
          />
          <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
          <button
            type="submit"
            className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
