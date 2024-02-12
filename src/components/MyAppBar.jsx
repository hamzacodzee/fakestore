import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAppBar = () => {
  const linkStyle = {
    textAlign: "right",
    textDecoration: "none",
    marginLeft: "20px",
  };
  const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };
  const navBar = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    padding: "1rem",
    fontSize: "1.2rem",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const login = localStorage.getItem("LoginDetails");
  const loggedLinks = [
    { path: "/home", text: "Home" },
    { path: "/edit", text: "Profile" },
  ];

  const notLoggedLinks = [
    { path: "/", text: "Login" },
    { path: "/signup", text: "Signup" },
  ];

  return (
    <>
      <div style={navBar}>
        <div style={centerStyle}>
          <Link
            style={{
              color: "white",
              textAlign: "left",
              textDecoration: "none",
            }}
          >
            FakeStore
          </Link>
        </div>
        <div style={centerStyle}>
          {login ? (
            <>
              {loggedLinks.map(
                (link) =>
                  location.pathname !== link.path && (
                    <Link style={linkStyle} to={link.path} key={link.text}>
                      {link.text}
                    </Link>
                  )
              )}
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("LoginDetails");
                  toast.success("Logout Successfully");
                  navigate("/");
                }}
                sx={{ color: "white", borderColor: "white", ...linkStyle }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {notLoggedLinks.map(
                (link) =>
                  location.pathname !== link.path && (
                    <Link style={linkStyle} to={link.path} key={link.text}>
                      {link.text}
                    </Link>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAppBar;
