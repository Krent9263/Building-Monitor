import React from "react";
import { Col, Row } from "react-bootstrap";
import User from "../../assets/images/icons/user-solid.svg";
import IN from "../../assets/images/icons/arrow-in.svg";
import OUT from "../../assets/images/icons/arrow-out.svg";
import Check from "../../assets/images/icons/circle-check-in.svg";
import Checkout from "../../assets/images/icons/circle-check-out.svg";

export default function History() {
  let users = [
    {
      name: "Jhonmer Bengan",
      department: "OSDC",
    },
    {
      name: "Alice Smith",
      department: "HR",
    },
    {
      name: "Bob Johnson",
      department: "Finance",
    },
  ];

  return (
    <div className="display-history mt-3">
      <div className="container">
        <span className="history-header">
          <img className="logo" src={IN} alt="" /> <span className="h-header-title">In Scan:</span>
        </span>
        {users?.map((item, index) => {
          return (
            <div className="teacher">
              <span className="name">
                <img src={User} className="logo" />{" "}
                <span className="text-name">
                  {item?.name} <br />
                  <span className="department">{item?.department}</span>
                </span>
              </span>
              <span className="in">
                <img className="logo-in" src={Check} alt="IN" />
                <span>Inside</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="container mt-3">
        <span className="history-header">
          <img className="logo" src={IN} alt="" /> <span className="h-header-title">Out Scan:</span>
        </span>
        {users?.map((item, index) => {
          return (
            <div className="teacher">
              <span className="name">
                <img src={User} className="logo" />{" "}
                <span className="text-name">
                  {item?.name} <br />
                  <span className="department">{item?.department}</span>
                </span>
              </span>
              <span className="out">
                <img className="logo-in" src={Checkout} alt="OUT" />
                <span>Inside</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
