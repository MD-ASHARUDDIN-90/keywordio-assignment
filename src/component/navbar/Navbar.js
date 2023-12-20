import { Box } from "@mui/material";
import React from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/Screenshot 2023-12-19 194742.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box className={style.navbar}>
      <Box>
        <Link to='/'>
          {" "}
          <img className={style.logo} src={logo} alt='logo' />
        </Link>
      </Box>
      <Box className={style.links}>
        <Link to='/' style={{ textDecoration: "none", color: "black" }}>
          {" "}
          <h3>DASHBOARD</h3>
        </Link>
        <Link
          to='/create-ad'
          style={{ textDecoration: "none", color: "black" }}
        >
          {" "}
          <h3>CREATE ADS</h3>
        </Link>
      </Box>
    </Box>
  );
}

export default Navbar;
