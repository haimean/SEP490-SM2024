import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import LayoutPlayer from "../../../layouts/player/LayoutPlayer";
const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <Grid container spacing={3} mt={8}>
      <Grid item xs={12} sm={8}>
        <form onSubmit={handleSubmit(onSubmit)} className="m-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Confirm and payment</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Your trip</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                {...register("date")}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Guests"
                {...register("guests")}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Pay with</Typography>
              <Tabs
                value={paymentMethod}
                onChange={(_, newValue) => setPaymentMethod(newValue)}
              >
                <Tab value="cash" label="Cash" />
                <Tab value="online" label="Online" />
              </Tabs>
            </Grid>
            {paymentMethod === "online" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Card number"
                    {...register("cardNumber")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Card holder"
                    {...register("cardHolder")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expiration date"
                    {...register("expirationDate")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVC"
                    {...register("cvc")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message for author"
                    {...register("message")}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Confirm and pay
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Confirm checkout
          </Typography>
          <div className="max-w-sm p-4 border rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                $119<span className="text-sm font-normal"> / night</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="border p-2 rounded-lg flex items-center justify-between">
                <div className="text-gray-600">Feb 06 - Feb 23</div>
                <div className="text-gray-600">Check in - Check out</div>
              </div>
              <div className="border p-2 rounded-lg flex items-center justify-between mt-2">
                <div className="text-gray-600">4 Guests</div>
                <div className="text-gray-600">Guests</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <div>$119 x 3 night</div>
                <div>$357</div>
              </div>
              <div className="flex justify-between mt-2">
                <div>Service charge</div>
                <div>$0</div>
              </div>
              <div className="flex justify-between mt-2 font-bold">
                <div>Total</div>
                <div>$199</div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="contained" color="primary" className="w-full">
                Checkout
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Checkout;
