import React, { useState } from "react";

const DatePicker = () => {
  const [dob, setDob] = useState(new Date());
  const [dod, setDod] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const onChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    getDob();
  };

  const getDob = () => {
    if (selectedDate >= dod) {
      alert("DOB should be Less");
      return;
    }

    const diff = dod - selectedDate;
    const years = diff / (1000 * 60 * 60 * 24 * 365);
    const months = (years - Math.floor(years)) * 12;
    const days = (months - Math.floor(months)) * (365 / 12);

    setAge({
      years: Math.floor(years),
      months: Math.floor(months),
      days: Math.floor(days),
    });

    setDob(selectedDate);
  };

  return (
    <div>
      <h1>Age Finder</h1>
      <label htmlFor="DOB">Date Of Birth:</label>
      <input type="date" id="dob" name="dob" onChange={onChange} />
      <br />
      <label htmlFor="dod">Date Of Death:</label>
      <input
        type="date"
        id="dod"
        name="dod"
        onChange={(e) => {
          setDod(new Date(e.target.value));
          getDob();
        }}
      />
      <br />

      <h4>DOB: {dob.toString()}</h4>
      <h4>Dod: {dod.toString()}</h4>

      <h3>
        Age: {age.years} Years, {age.months} Months, {age.days} Days
      </h3>
    </div>
  );
};

export default DatePicker;
