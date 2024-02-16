import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { setOpen, getData } from "../../store/slice/CategorySlice";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  name: yup
    .string("Enter your Category Name")
    .required("Category Name is required")
    .min(2),
});

const AddEvent = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(getData());
  };

  const formik = useFormik({
    initialValues: {
      name: "mobile",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const categoryDetail = localStorage.getItem("categorys");
      const allCategorys = JSON.parse(categoryDetail) || [];
      const category = allCategorys.find(
        (category) => category?.name === values["name"]
      );
      if (category) {
        toast.error("Category Already Existed");
      } else {
        const existingCategorys =
          JSON.parse(localStorage.getItem("categorys")) || [];
        const updatedCategorys = [...existingCategorys, values];
        localStorage.setItem("categorys", JSON.stringify(updatedCategorys));
        handleClose();
        toast.success("Added Successfully");
      }
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  return (
    <div>
      <h1>Add Event</h1>
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

export default AddEvent;
