import React from "react";
import SchoolLogo from "../../assets/images/SDC.png";
import { Button } from "react-bootstrap";

export default function Header() {
  const logout = async () => {
    await window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="header">
			<div className="logo">
      <img className="img" src={SchoolLogo} alt="" />
      <h2>Project Name</h2>
			</div>
			<div>
				<Button onClick={logout}>Logout</Button>
			</div>
    </div>
  );
}
