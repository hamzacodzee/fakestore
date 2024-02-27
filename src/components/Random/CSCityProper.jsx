import React, { useState } from "react";
import { toast } from "react-toastify";

const CSCityProper = () => {
  // eslint-disable-next-line
  const [countries, setCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");

  const addCountry = () => {
    if (countryInput.trim() === "") return;
    if (countries.some((c) => c.countryName === countryInput)) {
      toast.error("Country already exists!");
      return;
    }
  };

  return (
    <div>
      <div>
        <h2>Countries:</h2>
      </div>

      <div>
        <div>Country</div>
        <div>
          <input
            type="text"
            name="country"
            id="country"
            onChange={(e) => setCountryInput(e.target.value)}
            value={countryInput}
          />
          <button onClick={addCountry}>Save Country</button>
        </div>
      </div>
    </div>
  );
};

export default CSCityProper;
