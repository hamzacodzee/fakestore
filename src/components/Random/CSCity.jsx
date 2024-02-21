import React, { useState } from "react";

const CSCity = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState("");
  const [addInState, setAddInState] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [toggleInState, setToggleInState] = useState(false);

  console.log("data", data);
  console.log("setAddInState", addInState);

  return (
    <div
      style={{ textAlign: "left", fontFamily: "monospace", fontSize: "1rem" }}
    >
      CSCity
      <div>
        <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <button
          onClick={() => {
            setData((prevState) => [...prevState, { country }]);
            setCountry("");
          }}
        >
          Save Country
        </button>
      </div>
      <div>
        {data.map(({ country }, index) => (
          <div key={index} style={{ margin: "2rem" }}>
            <div>
              Country: {country}
              <button
                style={{
                  display: add === country && !toggleState ? "none" : "",
                  margin: "0 2rem",
                }}
                value={country}
                onClick={(e) => {
                  setAdd(e.target.value);
                  setToggleState(false);
                }}
              >
                Add State
              </button>
              {add === country && (
                <>
                  <div style={{ display: toggleState ? "none" : "block" }}>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        const addState = data.map((item) => {
                          if (item.country === country) {
                            const newStateArray = Array.isArray(item.states)
                              ? [...item.states, state]
                              : [state];
                            return { ...item, states: newStateArray };
                          }
                          return item;
                        });
                        setData(addState);
                        setToggleState(true);
                        setState("");
                      }}
                    >
                      Save State
                    </button>
                  </div>
                </>
              )}
              <div style={{ marginTop: "0.2rem" }}>
                States:
                <div style={{ marginLeft: "2rem" }}>
                  {data?.map(
                    (item) =>
                      country === item.country &&
                      item?.states?.map((item, index) => (
                        <div key={index}>
                          <div >
                            {item}
                            <button
                              style={{
                                display:
                                  addInState === item && !toggleInState
                                    ? "none"
                                    : "",
                                margin: "0 2rem",
                              }}
                              value={item}
                              onClick={(e) => {
                                setAddInState(e.target.value);
                                setToggleInState(false);
                              }}
                            >
                              Add City
                            </button>

                            {addInState === item && (
                              <>
                                <div
                                  style={{
                                    display: toggleInState ? "none" : "block",
                                  }}
                                >
                                  <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();

                                      const addCity = data.map((item) => {
                                        if (
                                          item.country === country &&
                                          item.states.includes(addInState)
                                        ) {
                                          const stateCities =
                                            item.StateCities || {
                                              state: addInState,
                                              cities: [],
                                            };

                                          const updatedCities = [
                                            ...stateCities.cities,
                                            city,
                                          ];

                                          const updatedStateCities = {
                                            ...stateCities,
                                            cities: updatedCities,
                                          };

                                          return {
                                            ...item,
                                            StateCities: updatedStateCities,
                                          };
                                        }
                                        return item;
                                      });

                                      setData(addCity);
                                      setToggleInState(true);
                                      setCity("");
                                    }}
                                  >
                                    Save City
                                  </button>
                                </div>
                              </>
                            )}
                          </div>

                          <div style={{ marginTop: "0.2rem" }}>
                            Cities:
                            <div style={{ marginLeft: "2rem" }}>
                              {data?.map(
                                (item) =>
                                  country === item.country &&
                                  item.StateCities?.state === addInState && (
                                    <div key={item.StateCities.state}>
                                      {item.StateCities.cities.map(
                                        (city, index) => (
                                          <div key={index}>{city}</div>
                                        )
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSCity;
