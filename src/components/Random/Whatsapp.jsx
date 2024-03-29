import React from "react";

const Whatsapp = () => {
  const shareOnWhatsApp = () => {
    // Replace 'your-image-url' with the actual URL of your image
    const imageUrl = "https://media.geeksforgeeks.org/wp-content/uploads/20230201105319/Pattern-Printing-in-Java.jpg";

    // Replace 'your-message' with the desired pre-filled message
    const message = "Check out this image: " + imageUrl;

    // Construct the WhatsApp web deep link
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
      message
    )}`;

    // Open the WhatsApp web interface with the pre-filled message
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <button onClick={shareOnWhatsApp}>Share on WhatsApp</button>
    </div>
  );
};

export default Whatsapp;
