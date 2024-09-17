import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios
      .post("https://reqres.in/api/users?page=2", data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("firstName", { required: true })}
          autoComplete="name"
          variant="outlined"
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          margin="normal"
          helperText={
            errors.firstName?.type === "required" && "First name is required"
          }
        />
        <TextField
          {...register("lastName", { required: true })}
          variant="outlined"
          fullWidth
          id="lastName"
          label="Last Name"
          autoComplete="lname"
          margin="normal"
          helperText={
            errors.lastName?.type === "required" && "Last name is required"
          }
        />
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          variant="outlined"
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          margin="normal"
          helperText={errors.email && <p>{errors.email.message}</p>}
        />

        <TextField
          {...register("password", {
            required: "Password is required",
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must have at least one uppercase letter",
              hasLowerCase: (value) =>
                /[a-z]/.test(value) ||
                "Password must have at least one lowercase letter",
              hasNumberOrSpecialChar: (value) =>
                /[0-9!@#$%^&*]/.test(value) ||
                "Password must have at least one number or special character",
              minLength: (value) =>
                value.length >= 8 ||
                "Password must be at least 8 characters long",
            },
          })}
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          margin="normal"
          helperText={
            errors.password && (
              <>
                {errors.password.type === "required" && (
                  <p>{errors.password.message}</p>
                )}
                {errors.password.message ===
                  "Password must have at least one uppercase letter" && (
                  <p>{errors.password.message}</p>
                )}
                {errors.password.message ===
                  "Password must have at least one lowercase letter" && (
                  <p>{errors.password.message}</p>
                )}
                {errors.password.message ===
                  "Password must have at least one number or special character" && (
                  <p>{errors.password.message}</p>
                )}
                {errors.password.message ===
                  "Password must be at least 8 characters long" && (
                  <p>{errors.password.message}</p>
                )}
              </>
            )
          }
        />

        <Controller
          name="promotions"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
              sx={{ mt: 1 }}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Link
          href="/"
          variant="body2"
          display="block"
          textAlign="right"
          mt={2}
          color="text.secondary"
          underline="none"
          to="/signIn"
        >
          Already have an account? Sign in
        </Link>
      </form>
    </Container>
  );
}
