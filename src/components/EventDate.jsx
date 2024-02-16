import React, { useEffect, useState } from "react";

const EventDate = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedDates, setCheckedDates] = useState([]);
  const [mainIndex, setMainIndex] = useState("");
  const [saveArray, setSaveArray] = useState([]);

  const mainArray = [
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
  ];

  const handleCheckAll = (e, arrayIndex) => {
    const isChecked = e.target.checked;
    console.log(isChecked + " isChecked");

    setCheckAll((prevCheckAll) => !prevCheckAll);
    const allDates = mainArray[arrayIndex].date.map((item) => item.id);
    console.log(allDates);
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
            event_id: item.id,
            event_date: checkedDates
              .map((dateId) => {
                const dateItem = mainArray[mainIndex].date.find(
                  (date) => date.id === dateId
                );
                return dateItem ? dateItem.name : null;
              })
              .filter((dateName) => dateName !== null)
              .join(", "),
          };
        }
      });

      return updatedArray;
    });
  }, [checkedDates]);

  useEffect(() => {
    console.log(saveArray);
  }, [saveArray]);

  return (
    <div>
      <h1>Event</h1>
      <div style={{ textAlign: "left", margin: "1rem" }}>
        <form action="" method="get">
          {mainArray.map((item, mainIndex) => (
            <div key={mainIndex}>
              <h2>{item.name}</h2>
              <div style={{ marginLeft: "1.5rem" }}>
                {item.date.map((dateItem, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={dateItem.id}
                      id={dateItem.id}
                      value={dateItem.id}
                      onChange={(e) => handleDate(e, mainIndex)}
                      checked={checkedDates.includes(dateItem.id)}
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
      </div>
    </div>
  );
};

export default EventDate;
