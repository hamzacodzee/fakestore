import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import DashboardLayout from "./DashboardLayout";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const validationSchema = yup.object({
  title: yup.string("Enter your Title").required("Title is required").min(3),

  description: yup
    .string("Enter your description")
    .required("description is required")
    .min(3),
  category: yup
    .string("Enter your category")
    .required("category is required")
    .min(3),

  price: yup.number("Enter Price").required("Price is required"),
});

const AddProduct = () => {
  const formik = useFormik({
    initialValues: {
      title: "abc",
      description: "123abcxyz",
      category: "hii",
      price: "123",
      pic: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //   const userDetail = localStorage.getItem("users");
      //   const allUsers = JSON.parse(userDetail) || [];
      //   const user = allUsers.find((user) => user?.email === values["email"]);
      //   if (user) {
      //     toast.error("User Already Existed");
      //   } else {
      //     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      //     const updatedUsers = [...existingUsers, values];
      //     localStorage.setItem("users", JSON.stringify(updatedUsers));
      //     navigate("/");
      //   }
      console.log(values);
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
    <DashboardLayout>
      <div>
        <h1>Add Product</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              autoComplete="on"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.title && Boolean(errors?.title)}
              helperText={touched?.title && errors?.title}
            />
            <br />
            <br />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              autoComplete="on"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.description && Boolean(errors?.description)}
              helperText={touched?.description && errors?.description}
              multiline
              maxRows={4}
            />
            <br />
            <br />

            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="text"
              autoComplete="on"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.price && Boolean(errors?.price)}
              helperText={touched?.price && errors?.price}
            />
            <br />
            <br />
            <FormControl required fullWidth sx={{ textAlign: "left" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                autoComplete="on"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.category}
                onChange={handleChange}
                error={touched?.category && Boolean(errors?.category)}
                helpertext={touched?.category && errors?.category}
                name="category"
                label="category"
              >
                <MenuItem value="hii">hii</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <div style={{ textAlign: "left" }}>
              <label htmlFor="pic" style={{ marginRight: "0.5rem" }}>
                Upload Image:
              </label>
              <input
                type="file"
                name="pic"
                id="pic"
                autoComplete="on"
                value={values.pic}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.pic && errors?.pic}
                helpertext={touched?.pic && errors?.pic}
                required
              />
            </div>

            <br />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
