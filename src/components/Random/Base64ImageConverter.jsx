import React, { useState } from "react";

const Base64ImageConverter = () => {
  const [base64IMG, setBase64IMG] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setBase64IMG(reader.result);
      };
    }
  };

  return (
    <div>
      <img src={base64IMG} alt="Converted Pic" />
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default Base64ImageConverter;
