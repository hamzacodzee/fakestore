import React, { useState } from "react";
import { toast } from "react-toastify";

const StudData = () => {
  const [myNumberInput, setMyNumberInput] = useState("");
  const [myNumber, setMyNumber] = useState("");
  const [visible, setVisible] = useState(false);

  // let student = [
  //   { roll_no: 1, name: "Manish", gender: "Male", maths: 10, sci: 20, guj: 30 },
  //   { roll_no: 2, name: "Kishan", gender: "Male", maths: 3, sci: 3, guj: 5 },
  //   { roll_no: 3, name: "Bhavik", gender: "Male", maths: 30 },
  //   { roll_no: 2, name: "Kishan", gender: "Male", guj: 3 },
  //   { roll_no: 1, name: "Manish", gender: "Male", maths: 20, sci: 20 },
  //   {
  //     roll_no: 4,
  //     name: "Mansi",
  //     gender: "Female",
  //     maths: 3,
  //     sci: 3,
  //     guj: 5,
  //   },
  //   { roll_no: 4, name: "Mansi", gender: "Female", sci: 10, guj: 5 },
  //   { roll_no: 1, name: "Manish", gender: "Male", maths: 20, sci: 15 },
  //   {
  //     roll_no: 4,
  //     name: "Mansi",
  //     gender: "Female",
  //     maths: 30,
  //     sci: 30,
  //     guj: 50,
  //   },
  //   { roll_no: 2, name: "Kishan", gender: "Male", maths: 3, guj: 3, sci: 3 },
  //   { roll_no: 1, name: "Manish", gender: "Male", guj: 40 },
  //   { roll_no: 2, name: "Kishan", gender: "Male", sci: 3 },
  //   { roll_no: 3, name: "Bhavik", gender: "Male", maths: 30 },
  //   { roll_no: 3, name: "Bhavik", gender: "Male", sci: 30 },
  //   {
  //     roll_no: 4,
  //     name: "Mansi",
  //     gender: "Female",
  //     sci: 10,
  //     maths: 3,
  //     guj: 2,
  //   },
  //   { roll_no: 3, name: "Bhavik", gender: "Male", guj: 50 },
  // ];

  // const uniqueStud = [...new Set(student?.map((stud) => stud?.name))];
  // const output = [];

  // const getResult = (theStud) => {
  //   const studSingle = student?.filter((item) => item?.name === theStud);
  //   let total = 0;
  //   let sci = 0;
  //   let maths = 0;
  //   let guj = 0;
  //   let roll_no = 0;
  //   let gender = 0;
  //   let name = "";
  //   let rank = 0;

  //   studSingle.forEach((item) => {
  //     const sMaths = item.maths || 0;
  //     const sSci = item?.sci || 0;
  //     const sGuj = item?.guj || 0;
  //     const subjectTotal = sMaths + sSci + sGuj;
  //     total += subjectTotal;
  //     maths += sMaths;
  //     sci += sSci;
  //     guj += sGuj;
  //     roll_no = item?.roll_no;
  //     gender = item?.gender;
  //     name = item?.name;
  //   });

  //   let per = (total / 3).toFixed(2);
  //   output.push({ roll_no, name, gender, maths, sci, guj, total, per, rank });
  // };

  //  { roll_no:1 name:"Manish", gender:"Male", maths:50, sci:55, guj:70, total:175, per:58.33, rank:1 },

  // uniqueStud.map((item) => getResult(item));
  // const sortMe = [...output].sort((a, b) => b?.per - a?.per);

  // const display = sortMe.map((item, index) => ({ ...item, rank: index + 1 }));
  // let final = [...display].sort((a, b) => a?.roll_no - b?.roll_no);

  // const handleSelect = (event) => {
  //   event.target.value === "asc"
  //     ? (final = [...display].sort((a, b) => a?.rank - b?.rank))
  //     : (final = [...display].sort((a, b) => b?.rank - a?.rank));
  //   console.log(final);
  // };

  // const RecursiveList = ({ depth }) => {
  //   if (depth === 0) {
  //     return <li>End of Line</li>;
  //   }

  //   return (
  //     <li>
  //       Level {depth}
  //       <ul>
  //         <RecursiveList depth={depth - 1} />
  //       </ul>
  //     </li>
  //   );
  // };

  //--------------------------------------------------------------------------------------------
  // output = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
  // let myOutput = input.toString().split(",")
  // let myOutput = input.flat(Infinity)

  // let input = [
  //   10,
  //   [20, 30, [40, [50, 60, 70, [80, [90, 100, [110, [120, [130]]]]]]]],
  // ];

  // // console.log("input", input);

  // let myOutput = [];

  // function removeSingleElements(arr) {
  //   for (let i = arr.length - 1; i >= 0; i--) {
  //     if (Array.isArray(arr[i])) {
  //       arr[i] = removeSingleElements(arr[i]);

  //       if (arr[i].length === 0) {
  //         arr.splice(i, 1);
  //       }
  //     } else {
  //       myOutput.push(...arr.splice(i, 1));
  //     }
  //   }

  //   return arr;
  // }

  // eslint-disable-next-line
  // let result = removeSingleElements(input);
  // // console.log("myOutput", myOutput);

  //--------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------

  // const myInput = [
  //   10,
  //   [20, 30, [40, [50, 60, 70, [80, [90, 100, [110, [120, [130]]]]]]]],
  // ];
  // const flatArray = [];
  // const myRecursiveFunc = (arr) => {
  //   for (let i = arr.length - 1; i >= 0; i--) {
  //     if (Array.isArray(arr[i])) {
  //       arr[i] = myRecursiveFunc(arr[i]);

  //       if (arr[i].length === 0) {
  //         arr.splice(i, 1);
  //       }
  //     } else {
  //       flatArray.push(...arr.splice(i, 1));
  //     }
  //   }
  //   return arr;
  // };

   // eslint-disable-next-line
  // const recursiveFuncResult = myRecursiveFunc(myInput);

  // console.log("recursiveFuncResult", flatArray);

  //--------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------
  // debugger
  const RecursiveTable = ({ times }) => {
    if (visible && !isNaN(myNumber)) {
      if (times === 11) {
        return;
      }
      return (
        <pre>
          {myNumber} x {times} = {myNumber * times}
          <RecursiveTable times={times + 1} />
        </pre>
      );
    }
  };

  return (
    <div>
      <div>
        <h1>StudData</h1>
        {/* <select name="sort" id="sort" onChange={handleSelect}>
        <option>Select</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select> */}

        {/* <div>
        <ul>
        <RecursiveList depth={4} />
        </ul>
      </div> */}

        {/* {console.log(final)} */}
      </div>

      <div>
        <input
          type="text"
          name="table"
          id="table"
          onChange={(e) => {
            setMyNumberInput(e.target.value.replace(/[^0-9*-.]*$/g, ""));
          }}
          value={myNumberInput}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setVisible(true);
            setMyNumber(myNumberInput);
            setMyNumberInput("");
            if (isNaN(myNumberInput)) {
              toast.error("Enter Number");
            }
          }}
        >
          Show Table
        </button>
      </div>
      <br />
      {visible && <RecursiveTable times={0} />}
    </div>
  );
};

export default StudData;
