import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { setOpen, getData } from "../../store/slice/EventSlice";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  name: yup
    .string("Enter your Event Name")
    .required("Event Name is required")
    .min(2, "Event Name must be at least 2 characters"),
  dates: yup
    .array()
    .min(1, "Please Select at least one Date")
    .required("Please Select Date"),
});

const AddEvent = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(getData());
  };

  const formik = useFormik({
    initialValues: {
      name: "Event",
      checkAll: false,
      dates: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const eventDetail = localStorage.getItem("events");
      const allEvents = JSON.parse(eventDetail) || [];
      const event = allEvents.find((event) => event?.name === values["name"]);
      if (event) {
        toast.error("Event Already Exists");
      } else {
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = [...existingEvents, values];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        handleClose();
        toast.success("Added Successfully");
      }
    },
  });
  const { touched, errors, handleBlur, handleSubmit, handleChange, values } =
    formik;

  const dates = ["Date1", "Date2", "Date3"];
  const MyDates = ({ date }) => {
    return (
      <label>
        {date}
        <input
          type="checkbox"
          value={date}
          id={date}
          name="dates"
          onBlur={handleBlur}
          onChange={handleChange}
          checked={values.dates.includes(date)}
        />
        &nbsp;&nbsp;
      </label>
    );
  };

  const handleCheckAll = (event) => {
    const allDates = dates.map((date) => date);
    formik.setValues({
      ...values,
      checkAll: event.target.checked,
      dates: event.target.checked ? allDates : [],
    });
  };

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
          Date:
          <br />
          <div style={{ margin: "0.3rem 0.8rem" }}>
            {dates.map((date, index) => (
              <React.Fragment key={index}>
                <MyDates date={date} /> <br />
              </React.Fragment>
            ))}
          </div>
          {errors.dates && touched.dates ? <small>{errors.dates}</small> : null}
          <br /> <br />
          <label>
            Check All
            <input
              type="checkbox"
              value={values.checkAll}
              id="checkAll"
              name="checkAll"
              onBlur={handleBlur}
              onChange={handleCheckAll}
              checked={values.checkAll}
            />
            &nbsp;&nbsp;
          </label>
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
