import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/@[^.]*\./, "Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be of minimum 3 characters length")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("LoginDetails");
    if (login) {
      navigate("/home");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "@gmail.com",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userDetail = localStorage.getItem("users");
      const allUsers = JSON.parse(userDetail) || [];
      const user = allUsers.find(
        (user) =>
          user?.email === values["email"] &&
          user?.password === values["password"]
      );

      if (user) {
        localStorage.setItem("LoginDetails", JSON.stringify(user, null, 2));
        navigate("/home");
      } else toast.error("Invalid Credentials");
    },
  });

  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
    <div style={{ margin: "35%", marginTop: "10%", marginBottom: "0%" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          autoComplete="on"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.email && Boolean(errors?.email)}
          helperText={touched?.email && errors?.email}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.password && Boolean(errors?.password)}
          helperText={touched?.password && errors?.password}
        />
        <br />
        <br />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
