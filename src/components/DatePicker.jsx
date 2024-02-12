import React, { useState } from "react";

const AgeCalculator = () => {
  const [dob, setDob] = useState(null);
  const [dod, setDod] = useState(null);

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const calAge = (years, months, days) => {
    setAge({
      years: Math?.floor(years),
      months: Math?.floor(months),
      days: Math?.floor(days),
    });
  };

  const handleDateChange = (value, setDate) => {
    const selectedDate = new Date(value);

    setDate(selectedDate);
    const diff = dod - selectedDate;
    const years = diff / (1000 * 60 * 60 * 24 * 365);
    const months = (years - Math?.floor(years)) * 12;
    const days = (months - Math?.floor(months)) * (365 / 12);
    if (dod != null) {
      calAge(years, months, days);
    }
  };

  const handleDateChangeDod = (value, setDate) => {
    const selectedDate = new Date(value);

    setDod(selectedDate);
    const diff = selectedDate - dob;
    const years = diff / (1000 * 60 * 60 * 24 * 365);
    const months = (years - Math?.floor(years)) * 12;
    const days = (months - Math?.floor(months)) * (365 / 12);
    if (dob != null) {
      calAge(years, months, days);
    }
  };

  return (
    <div>
      <h1>Age Finder</h1>
      <div>
        <label htmlFor="dob">dob:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob ? dob?.toISOString().split("T")[0] : ""}
          onChange={(e) => handleDateChange(e.target.value, setDob)}
          {...(dod
            ? {
                max: new Date(dod.getTime() - 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
              }
            : {
                max: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
              })}
        />
      </div>
      <br />

      <div>
        <label htmlFor="dod">dod:</label>
        <input
          type="date"
          id="dod"
          name="dod"
          value={dod ? dod?.toISOString().split("T")[0] : ""}
          onChange={(e) => handleDateChangeDod(e.target.value, setDod)}
          max={new Date().toISOString().split("T")[0]}
          {...(dob
            ? {
                min: new Date(dob.getTime() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
              }
            : {})}
        />
      </div>
      <br />
      <h3>
        Age: {age?.years} Years, {age?.months} Months, {age?.days} Days
      </h3>
    </div>
  );
};

export default AgeCalculator;
