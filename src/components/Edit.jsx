import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

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

const Edit = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("LoginDetails");
    if (!login) {
      navigate("/");
    }
  });

  const LoginDetailsString = localStorage?.getItem("LoginDetails");
  const {
    fName,
    lName,
    email,
    address,
    password,
    cPassword,
    city,
    state,
    country,
  } = JSON?.parse(LoginDetailsString);

  const formik = useFormik({
    initialValues: {
      fName,
      lName,
      email,
      address,
      password,
      cPassword,
      city,
      state,
      country,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userDetail = localStorage.getItem("users");
      const allUsers = JSON.parse(userDetail) || [];
      const oldUserString = localStorage.getItem("LoginDetails");
      const oldUser = JSON.parse(oldUserString);
      const oldEmail = oldUser.email;
      const user = allUsers.findIndex((user) => user?.email === oldEmail);
      const oldData = allUsers.find((user) => user?.email === oldEmail);
      console.log(oldData);

      const {
        fName,
        lName,
        email,
        address,
        password,
        cPassword,
        city,
        state,
        country,
      } = values;

      allUsers[user] = {
        fName,
        lName,
        email,
        address,
        password,
        cPassword,
        city,
        state,
        country,
      };
      const newData = {
        fName,
        lName,
        email,
        address,
        password,
        cPassword,
        city,
        state,
        country,
      };
      console.log(newData);
      console.log(oldData == newData);
      localStorage.setItem("users", JSON.stringify(allUsers));
      localStorage.setItem("LoginDetails", JSON.stringify(allUsers[user]));

      alert("Updated");
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
    <div style={{ margin: "10%", marginTop: "0%" }}>
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="fName"
          name="fName"
          label="First Name"
          type="text"
          autoComplete="on"
          value={values.fName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.fName && Boolean(errors?.fName)}
          helperText={touched?.fName && errors?.fName}
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
          value={values.lName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.lName && Boolean(errors?.lName)}
          helperText={touched?.lName && errors?.lName}
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
          id="address"
          name="address"
          label="Address"
          type="text"
          autoComplete="on"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.address && Boolean(errors?.address)}
          helperText={touched?.address && errors?.address}
          multiline
          maxRows={4}
        />
        <br />
        <br />
        <FormControl required fullWidth sx={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            autoComplete="on"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Country"
            value={values.country}
            onChange={handleChange}
            error={touched?.country && Boolean(errors?.country)}
            helpertext={touched?.country && errors?.country}
            name="country"
          >
            {Country?.getAllCountries()?.map(({ name, isoCode }) => (
              <MenuItem value={isoCode} key={isoCode}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <br />

        <FormControl required fullWidth sx={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            autoComplete="on"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.state}
            onChange={handleChange}
            error={touched?.state && Boolean(errors?.state)}
            helpertext={touched?.state && errors?.state}
            name="state"
            label="State"
          >
            {State.getStatesOfCountry(values.country)?.map(
              ({ name, isoCode }) => (
                <MenuItem value={isoCode} key={isoCode}>
                  {name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <br />
        <br />

        <FormControl required fullWidth sx={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            autoComplete="on"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.city}
            onChange={handleChange}
            error={touched?.city && Boolean(errors?.city)}
            helpertext={touched?.city && errors?.city}
            name="city"
            label="city"
          >
            {City.getCitiesOfState(values.country, values.state)?.map(
              ({ name }, index) => (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              )
            )}
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
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.password && Boolean(errors?.password)}
          helperText={touched?.password && errors?.password}
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
          value={values.cPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.cPassword && Boolean(errors?.cPassword)}
          helperText={touched?.cPassword && errors?.cPassword}
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

export default Edit;
