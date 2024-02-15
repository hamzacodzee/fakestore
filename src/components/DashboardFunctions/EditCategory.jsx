import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import { setOpenEdit, getData } from "../../store/slice/CategorySlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
  name: yup
    .string("Enter your Category Name")
    .required("Category Name is required")
    .min(2),
});

const EditCategory = () => {
  const { id, name } = useSelector((state) => state.category.edit.category);
  const dispatch = useDispatch();

  const handleCloseEdit = () => {
    dispatch(setOpenEdit(false));
    dispatch(getData());
  };

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingCategorys =
        JSON.parse(localStorage.getItem("categorys")) || [];
      existingCategorys[id] = values;
      localStorage.setItem("categorys", JSON.stringify(existingCategorys));
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const updatedProducts = existingProducts.map((product) => {
        if (product.category === name) {
          return {
            ...product,
            category: values.name,
          };
        }
        return product;
      });

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      dispatch(getData());
      handleCloseEdit();
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
    <div>
      <h1>Edit Category</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            type="text"
            autoComplete="on"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.name && Boolean(errors?.name)}
            helperText={touched?.name && errors?.name}
          />
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

export default EditCategory;
