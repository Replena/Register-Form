import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Grid2,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const { register, handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      rememberMe: false,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const response = await axios.post("https://reqres.in/api/users?page=2");
      const users = response.data.data;

      const user = users.find((user) => user.email === data.email);

      if (user) {
        navigate("/home");
        toast.success("Successfully signed in!");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "white",
        padding: 3,
        borderRadius: 2,
        color: "text.primary",
        opacity: 0.9,
      }}
    >
      <Typography component="h1" variant="h4" align="center">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          margin="normal"
          {...register("email")}
          sx={{ backgroundColor: "white" }}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          margin="normal"
          {...register("password")}
        />

        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} color="primary" />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>

        <Grid2 spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Box display="flex" justifyContent="center">
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ minWidth: 250, margin: "0 auto" }}
              >
                Sign in with Facebook
              </Button>
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ minWidth: 250, margin: "0 auto" }}
            >
              Sign in with Google
            </Button>
          </Grid2>
        </Grid2>

        <Link
          component={RouterLink}
          to="/signUp"
          variant="body2"
          display="block"
          textAlign="right"
          mt={2}
          color="text.secondary"
          underline="none"
        >
          Don't have an account? Sign up
        </Link>

        <Link
          component={RouterLink}
          to="/forgetPassword"
          variant="body2"
          display="block"
          textAlign="right"
          mt={2}
          color="text.secondary"
          underline="none"
        >
          Forgot your password?
        </Link>
      </form>
    </Container>
  );
}
