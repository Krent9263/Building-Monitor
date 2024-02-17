import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SDC from "../../assets/images/SDC.png";
import Depts from "../../assets/images/Depts.png";

export default function MainDashboard() {
  return (
    <Container fluid className="main-dashboard">
      <Row className="row-1">
        <div>123</div>
      </Row>
      <Row className="row-2">
        <div className="sdo-department">
          <span className="header-sdo">
            <span className="title-holder">
              <img className="depts-logo" src={Depts} />
              SDO DEPARTMENTS
            </span>
            <span className="see-all">See All Report</span>
          </span>
          <div className="departments">
            <div className="icon-holder">
              <img className="icons" src={SDC} alt="" />
              <span className="titles">Office of the President</span>
            </div>
            <div className="icon-holder">
              <img className="icons" src={SDC} alt="" />
              <span className="titles">Office of the President</span>
            </div>
            <div className="icon-holder">
              <img className="icons" src={SDC} alt="" />
              <span className="titles">Office of the President</span>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
