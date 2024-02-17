import React from "react";
import SchoolLogo from "../../assets/images/SDC.png";
import { Button } from "react-bootstrap";
import Logout from "../../assets/images/icons/logout.svg";
import MENU from "../../assets/images/icons/bars-solid.svg"

export default function Header() {
  const logout = async () => {
    await window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="header mb-2">
      <img className="menu" src={MENU} alt="" />
      <div className="logo">
        <img className="img" src={SchoolLogo} alt="" />
        <h2 className="title">PROJECT IN OUT</h2>
      </div>
      {/* <div className="lg-container" onClick={logout}>
        <img className="logout" src={Logout} alt="" />Logout
      </div> */}
    </div>
  );
}
