import React, { useEffect, useState } from "react";

const DatePicker = () => {
  const [dob, setDob] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const dob2 = new Date(dob);
    const today2 = new Date(today);
    const diff = today2 - dob2;

    const temp = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);
   
  }, [dob, today]);

  return (
    <div>
      <h1>Age Finder</h1>
      <input
        type="date"
        id="dob"
        name="dob"
        onChange={(e) => {
          setDob(e.target.value);
        }}
      />
      <br />

      <input
        type="date"
        id="today"
        name="today"
        onChange={(e) => {
          setToday(e.target.value);
        }}
      />
      <br />
      <h1>DOB: {dob}</h1>
      <h1>Today: {today}</h1>
    </div>
  );
};

export default DatePicker;
