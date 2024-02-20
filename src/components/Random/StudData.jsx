import React from "react";

const StudData = () => {
  let student = [
    { roll_no: 1, name: "Manish", gender: "Male", maths: 10, sci: 20, guj: 30 },
    { roll_no: 2, name: "Kishan", gender: "Male", maths: 3, sci: 3, guj: 5 },
    { roll_no: 3, name: "Bhavik", gender: "Male", maths: 30 },
    { roll_no: 2, name: "Kishan", gender: "Male", guj: 3 },
    { roll_no: 1, name: "Manish", gender: "Male", maths: 20, sci: 20 },
    {
      roll_no: 4,
      name: "Mansi",
      gender: "Female",
      maths: 3,
      sci: 3,
      guj: 5,
    },
    { roll_no: 4, name: "Mansi", gender: "Female", sci: 10, guj: 5 },
    { roll_no: 1, name: "Manish", gender: "Male", maths: 20, sci: 15 },
    {
      roll_no: 4,
      name: "Mansi",
      gender: "Female",
      maths: 30,
      sci: 30,
      guj: 50,
    },
    { roll_no: 2, name: "Kishan", gender: "Male", maths: 3, guj: 3, sci: 3 },
    { roll_no: 1, name: "Manish", gender: "Male", guj: 40 },
    { roll_no: 2, name: "Kishan", gender: "Male", sci: 3 },
    { roll_no: 3, name: "Bhavik", gender: "Male", maths: 30 },
    { roll_no: 3, name: "Bhavik", gender: "Male", sci: 30 },
    {
      roll_no: 4,
      name: "Mansi",
      gender: "Female",
      sci: 10,
      maths: 3,
      guj: 2,
    },
    { roll_no: 3, name: "Bhavik", gender: "Male", guj: 50 },
  ];

  const uniqueStud = [...new Set(student?.map((stud) => stud?.name))];
  const output = [];

  const getResult = (theStud) => {
    const studSingle = student?.filter((item) => item?.name === theStud);
    let total = 0;
    let sci = 0;
    let maths = 0;
    let guj = 0;
    let roll_no = 0;
    let gender = 0;
    let name = "";
    let rank = 0;

    studSingle.forEach((item) => {
      const sMaths = item.maths || 0;
      const sSci = item?.sci || 0;
      const sGuj = item?.guj || 0;
      const subjectTotal = sMaths + sSci + sGuj;
      total += subjectTotal;
      maths += sMaths;
      sci += sSci;
      guj += sGuj;
      roll_no = item?.roll_no;
      gender = item?.gender;
      name = item?.name;
    });

    let per = (total / 3).toFixed(2);
    output.push({ roll_no, name, gender, maths, sci, guj, total, per, rank });
  };

  //  { roll_no:1 name:"Manish", gender:"Male", maths:50, sci:55, guj:70, total:175, per:58.33, rank:1 },

  uniqueStud.map((item) => getResult(item));
  const sortMe = [...output].sort((a, b) => b?.per - a?.per);

  const display = sortMe.map((item, index) => ({ ...item, rank: index + 1 }));
  const final = [...display].sort((a, b) => a?.roll_no - b?.roll_no);

  return (
    <div>
      <h1>StudData</h1>
      {
        console.log(final)
      }
    </div>
  );
};

export default StudData;
