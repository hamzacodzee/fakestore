import React from "react";
import { Link } from "react-router-dom";

const MyAppBar = () => {
  return (
    <div style={{ marginTop: "2%", fontSize: "2rem" }}>
      <Link to="/home">Home</Link>&nbsp;&nbsp;
      <Link to="/">Login</Link>&nbsp;&nbsp;
      <Link to="/signup">Signup</Link>&nbsp;&nbsp;
    </div>
  );
};

export default MyAppBar;
