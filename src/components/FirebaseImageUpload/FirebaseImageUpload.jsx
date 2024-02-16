import React, { useState } from "react";
import { imageDB } from "./Config";
import { ref, uploadBytes } from "firebase/storage";

const FirebaseImageUpload = () => {
  const [img, setImg] = useState("");
  const handleClick = () => {
    const imgRef = ref(imageDB, `files/${img.name}`);
    uploadBytes(imgRef, img);
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
};

export default FirebaseImageUpload;
