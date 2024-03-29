import React, { useState, useEffect } from "react";

const RowGenerator = () => {
     const [m1, setM1] = useState("");
     const [m2, setM2] = useState("");
     const [rows, setRows] = useState([]);

     // Function to generate rows
     // Function to generate rows
     const generateRows = () => {
          const updatedRows = [...rows]; // Copy existing rows

          // Add new M1 rows if m1 increases
          for (let i = rows.length + 1; i <= m1; i++) {
               updatedRows.push({
                    value: `Row M1 - ${i}`,
                    inputValue: "",
               });
          }

          // Add new M2 rows if m2 increases
          for (let i = rows.length + 1; i <= m1 + m2; i++) {
               updatedRows.push({
                    value: `Row M2 - ${i - m1}`,
                    inputValue: "",
               });
          }

          setRows(updatedRows);
     };

     useEffect(() => {
          generateRows();
     }, [m1, m2]);

     // Function to handle input change
     const handleInputChange = (index, e) => {
          const { value } = e.target;
          setRows((prevRows) => {
               const newRows = [...prevRows];
               newRows[index].inputValue = value;
               return newRows;
          });
     };

     return (
          <div>
               <div>
                    <label htmlFor="m1">Number of M1 rows:</label>
                    <input
                         type="number"
                         id="m1"
                         value={m1}
                         onChange={(e) => setM1(parseInt(e.target.value))}
                    />
               </div>
               <div>
                    <label htmlFor="m2">Number of M2 rows:</label>
                    <input
                         type="number"
                         id="m2"
                         value={m2}
                         onChange={(e) => setM2(parseInt(e.target.value))}
                    />
               </div>
               <div>
                    <h2>Generated Rows:</h2>
                    <ul>
                         {rows.map((row, index) => (
                              <li key={row.value}>
                                   {row.value}
                                   <span>
                                        <input
                                             type="text"
                                             name={`name-${index}`}
                                             value={row.inputValue}
                                             onChange={(e) =>
                                                  handleInputChange(index, e)
                                             }
                                        />
                                   </span>
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default RowGenerator;
