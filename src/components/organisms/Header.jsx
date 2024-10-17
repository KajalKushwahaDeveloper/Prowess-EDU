import React, { useState } from "react";
import "./header.scss";
import { Menu } from "primereact/menu";
import { useLocation, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

const Header = ({ toggleSidebar }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("data"));
  

  const menuItems = [
    {
      label: (
        <div className="flex items-center text-lg text-black font-normal">
          <i className="pi pi-calendar mr-2"></i>
          User Login
        </div>
      ),
      command: () => {
        window.location.href = "/login";
      },
    },

    {
      label: (
        <div className="flex items-center text-lg  font-normal text-black">
          <i className="pi pi-sign-out mr-2"></i>
          Logout
        </div>
      ),
      command: handleLogout,
    },
  ];
 

  const isLoggedIn = !!token && user;

  return (
    <>
      <div className="header flex justify-between items-center w-full px-3 md:px-8 h-20 fixed z-50">
        <div className="logo flex items-center gap-4">
          {/* <h1 className="hidden lg:flex text-5xl font-semibold">Dashboard</h1> */}
          {
            isLoggedIn ? (
              <i className="pi pi-bars text-2xl text-blue-900 lg:hidden" onClick={toggleSidebar}></i>
            ) : ""
          }
          {!token ? (
            <div onClick={() => navigate("/")}>
              <img src="./images/techSuvidha.svg" className="logo_img cursor-pointer" />
            </div>
          ) : (
            <img src="./images/techSuvidha.svg" className="logo_img" />
          )}
        </div>
        <div className="w-1/2 lg:w-1/4">
          <p className="text-blue-900 text-xl font-medium">{user?.college}</p>
        </div>
       
      </div>
      <hr />
    </>
  );
};

export default Header;