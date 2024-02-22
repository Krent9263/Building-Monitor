import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SDC from "../../assets/images/SDC.png";
import Depts from "../../assets/images/Depts.png";
import { useHistory } from "react-router-dom";

export default function MainDashboard() {
  const history = useHistory();

  return (
    <Container fluid className="main-dashboard">
      <Row className="row-1">
        <Col className="display-total" sm={12} md={6}>
          <div className="total">45</div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Inside the Office</span>
          </div>
        </Col>
        <Col className="display-total">
          <div className="total">45</div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Outside the Office</span>
          </div>
        </Col>
      </Row>
      <Row className="row-2">
        <div className="sdo-department">
          <span className="header-sdo">
            <span className="title-holder">
              <img className="depts-logo" src={Depts} />
              Division
            </span>
            <span className="see-all" onClick={() => history.push("/divisions")}>See All Divison</span>
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
