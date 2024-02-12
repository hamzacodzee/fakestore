import React, { useState } from "react";

const DatePicker = ({ selectedDate, onDateChange, label }) => {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <input
        type="date"
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={selectedDate?.toISOString().split("T")[0]}
        onChange={(e) => onDateChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
};

const AgeCalculator = () => {
  const [dob, setDob] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const handleDateChange = (value, setDate) => {
    const selectedDate = new Date(value);

    if (selectedDate > today) {
      alert("Selected date should be less than today");
    } else {
      setDate(selectedDate);
      const diff = today - selectedDate;
      const years = diff / (1000 * 60 * 60 * 24 * 365.25);
      const months = (years - Math?.floor(years)) * 12;
      const days = (months - Math?.floor(months)) * (365.25 / 12);

      setAge({
        years: Math?.floor(years),
        months: Math?.floor(months),
        days: Math?.floor(days),
      });
    }
  };

  const handleDateChangeToday = (value, setDate) => {
    const selectedDate = new Date(value);

    if (selectedDate < dob) {
      alert("Selected date should be more than dob");
    } else {
      setToday(selectedDate);
      const diff = selectedDate - dob;
      const years = diff / (1000 * 60 * 60 * 24 * 365);
      const months = (years - Math?.floor(years)) * 12;
      const days = (months - Math?.floor(months)) * (365 / 12);

      setAge({
        years: Math?.floor(years),
        months: Math?.floor(months),
        days: Math?.floor(days),
      });
    }
  };

  return (
    <div>
      <h1>Age Finder</h1>
      <DatePicker
        selectedDate={dob}
        onDateChange={(value) => handleDateChange(value, setDob)}
        label="Date of Birth"
      />
      <DatePicker
        selectedDate={today}
        onDateChange={(value) => handleDateChangeToday(value, setToday)}
        label="Today"
      />
      <br />

      <h4>DOB: {dob?.toLocaleDateString()}</h4>
      <h4>Today: {today?.toLocaleDateString()}</h4>

      <h3>
        Age: {age?.years} Years, {age?.months} Months, {age?.days} Days
      </h3>
    </div>
  );
};

export default AgeCalculator;
