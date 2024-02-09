import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

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
      } else alert("Invalid Credentials");
    },
  });

  return (
    <div style={{ margin: "35%", marginTop: "15%" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          autoComplete="on"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.email && Boolean(formik.errors?.email)}
          helperText={formik.touched?.email && formik.errors?.email}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.password && Boolean(formik.errors?.password)}
          helperText={formik.touched?.password && formik.errors?.password}
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
