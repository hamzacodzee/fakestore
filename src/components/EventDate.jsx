import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EventDate = () => {
  // eslint-disable-next-line
  const [checkAll, setCheckAll] = useState(false);
  const [mainIndex, setMainIndex] = useState("");
  // eslint-disable-next-line
  const [mainArray, setMainArray] = useState([
    {
      id: 1,
      name: "abc",
      date: [
        { id: 1, name: "Date1" },
        { id: 2, name: "Date2" },
        { id: 3, name: "Date3" },
      ],
    },
    {
      id: 2,
      name: "xyz",
      date: [
        { id: 4, name: "Date4" },
        { id: 5, name: "Date5" },
        { id: 6, name: "Date6" },
      ],
    },
    {
      id: 3,
      name: "pqr",
      date: [
        { id: 7, name: "Date7" },
        { id: 8, name: "Date8" },
        { id: 9, name: "Date9" },
      ],
    },
  ]);

  const [checkedDates, setCheckedDates] = useState(
    JSON.parse(localStorage.getItem("Events"))
      ?.map((item) => item?.event_date)
      ?.flat() || []
  );

  const result = JSON.parse(localStorage.getItem("Events")) || [];

  const [saveArray, setSaveArray] = useState(
    mainArray.map((item, index) => ({
      event_name: result[index]?.event_name || "",
      event_id: result[index]?.event_id || "",
      event_date: result[index]?.event_date.map((item) => item) || [],
    }))
  );

  // useEffect(() => {
  //   console.log(saveArray);
  // }, [saveArray]);

  const handleCheckAll = (e, arrayIndex) => {
    const isChecked = e.target.checked;

    setCheckAll((prevCheckAll) => !prevCheckAll);
    const allDates = mainArray[arrayIndex].date.map((item) => item.id);

    setMainIndex(arrayIndex);
    setCheckedDates((prevCheckedDates) =>
      isChecked
        ? [...new Set([...prevCheckedDates, ...allDates])]
        : prevCheckedDates.filter((id) => !allDates.includes(id))
    );
  };

  const handleDate = (e, mainIndex) => {
    setMainIndex(mainIndex);
    const dateID = parseInt(e.target.value);
    setCheckedDates((prevCheckedDates) => {
      if (prevCheckedDates.includes(dateID)) {
        return prevCheckedDates.filter((id) => id !== dateID);
      } else {
        return [...prevCheckedDates, dateID];
      }
    });
  };

  useEffect(() => {
    setSaveArray((prevSaveArray) => {
      const updatedArray = [...prevSaveArray];

      mainArray.forEach((item, index) => {
        const isMatchingIndex = mainIndex + 1 === item.id;

        if (isMatchingIndex) {
          updatedArray[index] = {
            event_name: item.name,
            event_id: item.id,
            event_date: checkedDates
              .map((dateId) => {
                const dateItem = mainArray[mainIndex].date.find(
                  (date) => date.id === dateId
                );
                return dateItem ? dateItem.id : null;
              })
              .filter((dateName) => dateName !== null),
          };
        }
      });

      return updatedArray;
    });
    // eslint-disable-next-line
  }, [checkedDates]);

  const handleSave = () => {
    localStorage.setItem("Events", JSON.stringify(saveArray));
    toast.success("Saved Successfully");
  };

  return (
    <div>
      <h1>Event</h1>
      <div style={{ textAlign: "left", margin: "1rem" }}>
        <form action="" method="get">
          {mainArray?.map((item, mainIndex) => (
            <div key={mainIndex}>
              <h2>{item?.name}</h2>
              <div style={{ marginLeft: "1.5rem" }}>
                {item?.date?.map((dateItem, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={dateItem?.id}
                      id={dateItem?.id}
                      value={dateItem?.id}
                      onChange={(e) => handleDate(e, mainIndex)}
                      checked={checkedDates?.includes(dateItem?.id)}
                    />
                    {dateItem.name}
                  </div>
                ))}
                <input
                  type="checkbox"
                  name={`checkAll-${mainIndex}`}
                  id={`checkAll-${mainIndex}`}
                  value={mainIndex}
                  onChange={(e) => handleCheckAll(e, mainIndex)}
                />
                CheckAll
              </div>

              <br />
              <br />
            </div>
          ))}
        </form>
        <div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ mx: 2 }}
            type="submit"
            onClick={() => {
              localStorage.removeItem("Events");
            }}
          >
            Clear Local
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDate;
