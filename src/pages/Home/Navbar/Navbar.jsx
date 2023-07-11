import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.css";

const Navbar = ({ toggaldata }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="navbar">
        <div className="logo_item">
          <i className="bx bx-menu" id="sidebarOpen" onClick={toggaldata}></i>
          SegNotes
        </div>
        <div className="navbar_content">
          {/* <i className="bi bi-grid"></i>
          <i className="bx bx-sun" id="darkLight"></i> */}
          {/* <i className="bx bx-bell"></i> */}
          <p>{data?.name}</p>
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            alt=""
            className="profile"
          />
        </div>
      </nav>
      {/* <!-- sidebar --> */}
    </>
  );
};

export default Navbar;
