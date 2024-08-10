import { useForm } from "react-hook-form";
import InputLabel from "../common/InputLabel.jsx";
import CallApi from "../../service/CallAPI.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ChangePassword = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      reset();
      handleClose();
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
            pattern={{
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              message:
                "Mật khẩu ít nhất phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt",
            }}
            errors={errors}
            required="Không được bỏ trống trường này."
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
                "Mật khẩu ít nhất phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt",
            }}
            minLength={8}
            errors={errors}
            required="Không được bỏ trống trường này."
            type="password"
          />
          <InputLabel
            label="Nhập lại mật khẩu mới"
            id="confirmNewPassword"
            register={register}
            pattern={{
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              message:
                "Mật khẩu ít nhất phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt",
            }}
            errors={errors}
            required="Không được bỏ trống trường này."
            type="password"
          />
          <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
          <Button
            variant="contained"
            type="submit"
            className="mt-6 transition block py-3 px-4 w-full"
          >
            Cập nhật mật khẩu
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
