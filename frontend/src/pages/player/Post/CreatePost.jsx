import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PHONE_REGEX } from "../../../utils/regex";

const CreatePost = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      date: currentDate,
      startTime: currentTime,
      endTime: currentTime,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Đăng bài tìm người chơi
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Tiêu đề là bắt buộc" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Tiêu đề"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Mô tả chi tiết"
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            )}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ngày rảnh"
                    fullWidth
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Giờ bắt đầu"
                    fullWidth
                    margin="normal"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Giờ kết thúc"
                    fullWidth
                    margin="normal"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: "Địa chỉ là bắt buộc" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Địa chỉ"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: PHONE_REGEX,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Số điện thoại liên hệ"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
                type="tel"
              />
            )}
          />
          <Controller
            name="level"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Trình độ bản thân</InputLabel>
                <Select {...field} label="Trình độ bản thân">
                  <MenuItem value="Y">Yếu</MenuItem>
                  <MenuItem value="TB">Trung bình</MenuItem>
                  <MenuItem value="K">Khá</MenuItem>
                  <MenuItem value="T">Tốt</MenuItem>
                  <MenuItem value="CN">Chuyên nghiệp</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "end" }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleClear}
            >
              Xóa
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Đăng bài
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;
