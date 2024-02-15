import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { setOpen, getData } from "../../store/slice/AddModalSlice";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  title: yup.string("Enter your Title").required("Title is required").min(3),

  description: yup
    .string("Enter your description")
    .required("description is required")
    .min(3),
  category: yup
    .string("Enter your category")
    .required("category is required")
    .min(2),

  price: yup.number("Enter Price").required("Price is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(getData());
  };

  const formik = useFormik({
    initialValues: {
      title: "abc",
      description: "123abcxyz",
      category: "mobile",
      price: "1000",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const productDetail = localStorage.getItem("products");
      const allProducts = JSON.parse(productDetail) || [];
      const product = allProducts.find(
        (product) => product?.title === values["title"]
      );
      if (product) {
        toast.error("Product Already Existed");
      } else {
        const existingProducts =
          JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = [...existingProducts, values];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Added Successfully");
        handleClose();
      }
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
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
              {JSON.parse(localStorage.getItem("categorys"))?.map((item) => (
                <MenuItem value={item.name} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />

          <br />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
