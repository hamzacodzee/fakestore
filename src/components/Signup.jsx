import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/@[^.]*\./, "Enter a valid email")
    .required("Email is required"),
  fName: yup
    .string("Enter your First Name")
    .required("First Name is required")
    .min(3),
  lName: yup
    .string("Enter your Last Name")
    .required("Last Name is required")
    .min(3),
  password: yup
    .string("Enter your password")
    .required("Password is required")
    .min(3, "Password should be of minimum 3 characters length"),
  cPassword: yup
    .string("Enter your Confirm password")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords Does not Match"),

  address: yup
    .string("Enter your Address")
    .required("Address is required")
    .min(3),
  city: yup.string("Enter your City").required("City is required").min(3),
  state: yup.string("Enter your State").required("State is required"),
  country: yup.string("Enter your Country").required("Country is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fName: "abc",
      lName: "xyz",
      email: "abc@gmail.com",
      address: "123abcxyz",
      password: "123",
      cPassword: "123",
      city: "surat",
      state: "Gujarat",
      country: "India",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userDetail = localStorage.getItem("users");
      const allUsers = JSON.parse(userDetail) || [];
      const user = allUsers.find((user) => user?.email === values["email"]);

      if (user) {
        alert("User Already Existed");
      } else {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...existingUsers, values];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        navigate("/");
      }
    },
  });
  return (
    <div style={{ margin: "10%", marginTop: "0%" }}>
      <h2>Registration</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="fName"
          name="fName"
          label="First Name"
          type="text"
          autoComplete="on"
          value={formik.values.fName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.fName && Boolean(formik.errors?.fName)}
          helperText={formik.touched?.fName && formik.errors?.fName}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="lName"
          name="lName"
          label="Last Name"
          type="text"
          autoComplete="on"
          value={formik.values.lName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.lName && Boolean(formik.errors?.lName)}
          helperText={formik.touched?.lName && formik.errors?.lName}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
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
          id="address"
          name="address"
          label="Address"
          type="text"
          autoComplete="on"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.address && Boolean(formik.errors?.address)}
          helperText={formik.touched?.address && formik.errors?.address}
          multiline
          maxRows={4}
        />
        <br />
        <br />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          type="text"
          autoComplete="on"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.city && Boolean(formik.errors?.city)}
          helperText={formik.touched?.city && formik.errors?.city}
        />
        <br />
        <br />

        <FormControl required fullWidth sx={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            autoComplete="on"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched?.state && Boolean(formik.errors?.state)}
            helpertext={formik.touched?.state && formik.errors?.state}
            name="state"
            label="State"
          >
            <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
            <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
            <MenuItem value={"Punjab"}>Punjab</MenuItem>
            <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
            <MenuItem value={"Goa"}>Goa</MenuItem>
            <MenuItem value={"Kerela"}>Kerela</MenuItem>
            <MenuItem value={"Telangana"}>Telangana</MenuItem>
            <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
            <MenuItem value={"Assam"}>Assam</MenuItem>
            <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
          </Select>
        </FormControl>

        <br />
        <br />

        <FormControl required fullWidth sx={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            autoComplete="on"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched?.country && Boolean(formik.errors?.country)}
            helpertext={formik.touched?.country && formik.errors?.country}
            name="country"
          >
            <MenuItem value={"India"}>India</MenuItem>
            <MenuItem value={"Out of India"}>Out of India</MenuItem>
          </Select>
        </FormControl>

        <br />
        <br />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="on"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.password && Boolean(formik.errors?.password)}
          helperText={formik.touched?.password && formik.errors?.password}
        />
        <br />
        <br />

        <TextField
          fullWidth
          id="cPassword"
          name="cPassword"
          label="Confirm Password"
          type="password"
          autoComplete="on"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.cPassword && Boolean(formik.errors?.cPassword)}
          helperText={formik.touched?.cPassword && formik.errors?.cPassword}
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

export default Signup;
