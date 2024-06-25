import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const BranchDetailComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TextField
            label="Tên cơ sở"
            fullWidth
            {...register("tenCoSo", { required: "Tên cơ sở là bắt buộc" })}
            error={!!errors.tenCoSo}
            helperText={errors.tenCoSo ? errors.tenCoSo.message : ""}
          />
        </div>
        <div>
          <TextField
            label="Địa chỉ"
            fullWidth
            {...register("diaChi", { required: "Địa chỉ là bắt buộc" })}
            error={!!errors.diaChi}
            helperText={errors.diaChi ? errors.diaChi.message : ""}
          />
        </div>
        <div>
          <TextField
            label="Số lượng sân"
            type="number"
            fullWidth
            {...register("soLuongSan", {
              required: "Số lượng sân là bắt buộc",
            })}
            error={!!errors.soLuongSan}
            helperText={errors.soLuongSan ? errors.soLuongSan.message : ""}
          />
        </div>
        <div>
          <TextField
            label="Chi phí cơ sở"
            type="number"
            fullWidth
            {...register("chiPhiCoSo", {
              required: "Chi phí cơ sở là bắt buộc",
            })}
            error={!!errors.chiPhiCoSo}
            helperText={errors.chiPhiCoSo ? errors.chiPhiCoSo.message : ""}
          />
        </div>
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default BranchDetailComponent;
