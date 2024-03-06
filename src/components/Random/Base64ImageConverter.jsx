import React, { useState } from "react";

const Base64ImageConverter = () => {
  const [base64IMG, setBase64IMG] = useState(null);
  const [setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("called: ", reader);
        setBase64IMG(reader.result);
      };
    }
  };

  console.log("base64IMG", base64IMG);
  return (
    <div>
      <img src={base64IMG} alt="Converted Pic" />
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default Base64ImageConverter;
