import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CSCity = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState("");
  const [addInState, setAddInState] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [toggleInState, setToggleInState] = useState(false);
  const [editCountry, setEditCountry] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editState, setEditState] = useState("");
  const [editedState, setEditedState] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editedCity, setEditedCity] = useState("");

  console.log("data", data);
  // console.log("setAddInState", addInState);

  // const locationData = [
  //   {
  //     countryId: 1,
  //     countryName: 'India',
  //     state: [
  //       {
  //         stateId: 101,
  //         stateName: 'Gujarat',
  //         city: [
  //           {
  //             cityId: 1001,
  //             cityName: 'Surat',
  //           },
  //           {
  //             cityId: 1002,
  //             cityName: 'Junagadh',
  //           }
  //         ]
  //       },
  //       {
  //         stateId: 102,
  //         stateName: 'Maharashtra',
  //         city: [
  //           {
  //             cityId: 1003,
  //             cityName: 'Mumbai',
  //           },
  //           {
  //             cityId: 1004,
  //             cityName: 'Pune',
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  // const handleChangeCity = (countryId, stateId, cityId, cityName) => {
  //   const output = locationData?.map(item => {
  //     if (item?.countryId === countryId) {
  //       return item?.state?.map(item2 => {
  //         if (item2.stateId === stateId) {
  //           return item2.city?.map(item3 => {
  //             if (item3.cityId === cityId) {
  //               return cityName
  //             }
  //             return item3
  //           })
  //         }
  //         return item2
  //       })
  //     }
  //     return item
  //   })
  //   return output
  // }
  // const output = handleChangeCity(1, 102, 1004, "Thane")

  // console.log('output', output)

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
        {data?.map(({ country }, index) => (
          <div key={index} style={{ margin: "2rem" }}>
            <div>
              <div style={{ display: "flex" }}>
                <li
                  onClick={(e) => {
                    setEditCountry(country);
                    setEditedCountry(country);
                  }}
                >
                  Country:{" "}
                  {editCountry && country === editCountry ? (
                    <input
                      type="text"
                      name="editCountry"
                      id="editCountry"
                      onChange={(e) => setEditedCountry(e.target.value)}
                      value={editedCountry}
                    />
                  ) : (
                    country
                  )}
                </li>
                <button
                  style={{
                    display:
                      (add === country && !toggleState) ||
                      (editCountry && country === editCountry)
                        ? "none"
                        : "",
                    margin: "0 2rem",
                    marginRight: "0.5rem",
                  }}
                  value={country}
                  onClick={(e) => {
                    setAdd(e.target.value);
                    setToggleState(false);
                  }}
                >
                  Add State
                </button>
                <button
                  style={{
                    display:
                      (add === country && !toggleState) ||
                      !editCountry ||
                      country !== editCountry
                        ? "none"
                        : "",
                    marginLeft: "2rem",
                    marginRight: "0.5rem",
                  }}
                  onClick={(e) => {
                    const updatedData = [...data];
                    updatedData[index].country = editedCountry;
                    setEditCountry("");
                    setData(updatedData);
                    setAdd(editedCountry);
                  }}
                >
                  Update
                </button>
                <button
                  style={{
                    display:
                      (add === country && !toggleState) ||
                      !editCountry ||
                      country !== editCountry
                        ? "none"
                        : "",
                  }}
                  onClick={(e) => {
                    setEditCountry("");
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const updatedData = data.filter(
                      (item) => item.country !== country
                    );
                    setData(updatedData);
                  }}
                >
                  <DeleteOutlineIcon />
                </button>
              </div>

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

                        const addState = data?.map((item) => {
                          if (item.country === country) {
                            const newStateArray = Array.isArray(item?.states)
                              ? [...item?.states, state]
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
              <div style={{ marginTop: "1rem", marginLeft: "2rem" }}>
                <li>States:</li>

                <div style={{ marginLeft: "2rem", marginTop: "0.8rem" }}>
                  {data?.map(
                    (item) =>
                      country === item?.country &&
                      item?.states?.map((stateMap, index) => (
                        <div key={index}>
                          <div>
                            <div
                              style={{ display: "flex", marginTop: "1.5rem" }}
                            >
                              <li
                                onClick={(e) => {
                                  setEditState(stateMap);
                                  setEditedState(stateMap);
                                }}
                              >
                                {editState && stateMap === editState ? (
                                  <input
                                    type="text"
                                    name="editState"
                                    id="editState"
                                    onChange={(e) =>
                                      setEditedState(e.target.value)
                                    }
                                    value={editedState}
                                  />
                                ) : (
                                  stateMap
                                )}
                              </li>

                              <button
                                style={{
                                  display:
                                    (addInState === stateMap &&
                                      !toggleInState) ||
                                    (editState && stateMap === editState)
                                      ? "none"
                                      : "",
                                  margin: "0 2rem",
                                }}
                                value={stateMap}
                                onClick={(e) => {
                                  setAddInState(e.target.value);
                                  setToggleInState(false);
                                }}
                              >
                                Add City
                              </button>

                              <button
                                style={{
                                  display:
                                    (addInState === stateMap &&
                                      !toggleInState) ||
                                    !editState ||
                                    stateMap !== editState
                                      ? "none"
                                      : "",
                                  marginLeft: "2rem",
                                  marginRight: "0.5rem",
                                }}
                                onClick={(e) => {
                                  const updatedData = [...data];
                                  updatedData.forEach((item, index) => {
                                    updatedData[index].states =
                                      item?.states?.map((state) => {
                                        console.log(
                                          "state === editState",
                                          state === editState
                                        );
                                        if (state === editState) {
                                          console.log("if", editedState);
                                          return editedState;
                                        } else {
                                          console.log("else", state);
                                          return state;
                                        }
                                      });
                                  });

                                  setEditState("");
                                  setData(updatedData);
                                  setAddInState(editedState);
                                }}
                              >
                                Update
                              </button>

                              <button
                                style={{
                                  display:
                                    (addInState === stateMap &&
                                      !toggleInState) ||
                                    !editState ||
                                    stateMap !== editState
                                      ? "none"
                                      : "",
                                }}
                                onClick={(e) => {
                                  setEditState("");
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                onClick={() => {
                                  const updatedData = data.map((item) => {
                                    if (item.states[stateMap]) {
                                      item.states.splice(stateMap, 1);

                                      item.StateCities =
                                        item.StateCities.filter(
                                          (item2) =>
                                            !item2.state.includes(stateMap)
                                        );
                                    }

                                    return item;
                                  });

                                  setData(updatedData);
                                }}
                              >
                                <DeleteOutlineIcon />
                              </button>
                            </div>

                            {addInState === stateMap && (
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

                                      const addCity = data?.map((item) => {
                                        if (
                                          item?.country === country &&
                                          item?.states?.includes(addInState)
                                        ) {
                                          const stateCitiesArray =
                                            item?.StateCities || [];

                                          const stateIndex =
                                            stateCitiesArray?.findIndex(
                                              (stateObj) =>
                                                stateObj?.state === addInState
                                            );

                                          if (stateIndex !== -1) {
                                            const updatedCities = [
                                              ...stateCitiesArray[stateIndex]
                                                ?.cities,
                                              city,
                                            ];

                                            const updatedStateCities = {
                                              state: addInState,
                                              cities: updatedCities,
                                            };

                                            stateCitiesArray[stateIndex] =
                                              updatedStateCities;
                                          } else {
                                            const newCityObject = {
                                              state: addInState,
                                              cities: [city],
                                            };

                                            stateCitiesArray?.push(
                                              newCityObject
                                            );
                                          }

                                          return {
                                            ...item,
                                            StateCities: stateCitiesArray,
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
                            City
                            <div style={{ marginLeft: "2rem" }}>
                              {data?.map((item) => {
                                if (
                                  country === item?.country &&
                                  item?.StateCities
                                ) {
                                  const stateCities = item?.StateCities?.find(
                                    (stateObj) => stateObj?.state === stateMap
                                  );

                                  if (stateCities) {
                                    return (
                                      <div key={stateCities?.state}>
                                        {stateCities?.cities?.map(
                                          (city, index) => (
                                            <div key={index}>
                                              <li
                                                onClick={(e) => {
                                                  setEditCity(city);
                                                  setEditedCity(city);
                                                }}
                                              >
                                                {editCity &&
                                                city === editCity ? (
                                                  <input
                                                    type="text"
                                                    name="editCity"
                                                    id="editCity"
                                                    onChange={(e) => {
                                                      console.log("first");
                                                      setEditedCity(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={editedCity}
                                                  />
                                                ) : (
                                                  city
                                                )}
                                              </li>
                                              <button
                                                style={{
                                                  display:
                                                    !editCity ||
                                                    city !== editCity
                                                      ? "none"
                                                      : "",
                                                  marginLeft: "2rem",
                                                  marginRight: "0.5rem",
                                                }}
                                                onClick={(e) => {
                                                  let updatedData = [...data];
                                                  updatedData = updatedData.map(
                                                    (item, index) => {
                                                      const stateData =
                                                        item?.StateCities?.map(
                                                          (element) => {
                                                            const cityData =
                                                              element.cities.map(
                                                                (itemCity) => {
                                                                  if (
                                                                    itemCity ===
                                                                    editCity
                                                                  ) {
                                                                    return editedCity;
                                                                  }
                                                                  return itemCity;
                                                                }
                                                              );
                                                            return {
                                                              ...element,
                                                              cities: cityData,
                                                            };
                                                          }
                                                        );
                                                      return {
                                                        ...item,
                                                        StateCities: stateData,
                                                      };
                                                    }
                                                  );
                                                  console.log(
                                                    "updatedData",
                                                    updatedData
                                                  );

                                                  setEditCity("");
                                                  setData(updatedData);
                                                  console.log("update");
                                                }}
                                              >
                                                Update
                                              </button>

                                              <button
                                                style={{
                                                  display:
                                                    !editCity ||
                                                    city !== editCity
                                                      ? "none"
                                                      : "",
                                                }}
                                                onClick={(e) => {
                                                  setEditCity("");
                                                }}
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    );
                                  }
                                }
                                return null;
                              })}
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
