import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import IN from "../assets/images/icons/arrow-in.svg";
import OUT from "../assets/images/icons/arrow-out.svg";
import User from "../assets/images/icons/user-solid.svg";
import Check from "../assets/images/icons/circle-check-in.svg";
import Checkout from "../assets/images/icons/circle-check-out.svg";

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

function QRScreen() {
  return (
    <Container fluid>
			<div className="date">JANUARY 25, 2024</div>
      <div className="qr-screen">
        <Col className="display" sm={12} md={12} lg={8} xl={8}>
          <div className="id">
            <div className="img-holder">
              <img className="img" src={User} alt="" />
            </div>
            <div className="details-holder">
              <div className="name">Jhonmer Bengan</div>
              <div className="office">Office of the President</div>
              <div className="department">
                School Governance and Operations Division
              </div>
            </div>
          </div>
        </Col>

        <Col className="display-history">
          <div className="in">
            <span className="header">
              <img className="icon" src={IN} alt="" /> <h3>In Scan:</h3>{" "}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {users?.map((item) => {
                return (
                  <div className="users mt-2">
                    <div className="column1">
                      <div className="frame">
                        <img className="user-img" src={User} alt="" />
                      </div>
                    </div>
                    <div className="column2">
                      <span>{item?.name}</span>
                      <span className="department">{item?.department}</span>
                    </div>
                    <div className="column3">
                      <img className="check-img" src={Check} alt="" />
                      <span className="success">Inside</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="in">
            <span className="header">
              <img className="icon" src={OUT} alt="" /> <h3>Out Scan:</h3>{" "}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {users?.map((item) => {
                return (
                  <div className="users mt-2">
                    <div className="column1">
                      <div className="frame">
                        <img className="user-img" src={User} alt="" />
                      </div>
                    </div>
                    <div className="column2">
                      <span>{item?.name}</span>
                      <span className="department">{item?.department}</span>
                    </div>
                    <div className="column3">
                      <img className="check-img" src={Checkout} alt="" />
                      <span className="failed">Outside</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </div>
    </Container>
  );
}

export default QRScreen;
