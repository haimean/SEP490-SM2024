import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const RegisterTypeCourt = () => {
  const { handleSubmit, control, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [listAttributeCourt, setListAttributeCourt] = useState([]);
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    try {
      const result = await CallApi("/api/host/type-court/", "post", formData);
      toast.success(`Tạo thành công ${result.data.name}`);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(`Lỗi ${error.response.data.error}`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAttributeCourtList = async () => {
    try {
      const result = await CallApi("/api/host/attribute-court", "get");
      console.log("🚀 ========= result:", result.data);
      setListAttributeCourt(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getAttributeCourtList();
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <Controller
        name="image"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div>
            <TextField
              type="file"
              label="Image"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                field.onChange(e.target.files); // Cập nhật trường tệp với FileList
                handleImageChange(e);
              }}
            />
            {imagePreview && (
              <Box mt={2} mb={2}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto"
                  style={{ width: "400px", maxHeight: 300 }}
                />
              </Box>
            )}
          </div>
        )}
      />

      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
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
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        )}
      />
      <Controller
        name="attributeCourtIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="attribute-label">Attributes</InputLabel>
            <Select
              {...field}
              labelId="attribute-label"
              multiple
              input={
                <OutlinedInput id="select-multiple-chip" label="Attributes" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={
                        listAttributeCourt.find((attr) => attr.id === value)
                          ?.value
                      }
                    />
                  ))}
                </Box>
              )}
            >
              {listAttributeCourt.map((attribute) => (
                <MenuItem key={attribute.id} value={attribute.id}>
                  {attribute.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={() => {
          reset();
          setImagePreview(null); // Reset image preview
        }}
      >
        Reset
      </Button>
    </form>
  );
};

export default RegisterTypeCourt;
