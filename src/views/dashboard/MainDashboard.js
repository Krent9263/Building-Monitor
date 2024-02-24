import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import CID from "../../assets/images/CID.png";
import SGOD from "../../assets/images/SGOD.png";
import OSDS from "../../assets/images/OSDS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
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
              <FontAwesomeIcon icon={faSitemap} className="dept-ficon" />
              DIVISION
            </span>
            <span className="see-all" onClick={() => history.push("/divisions")}>See all division</span>
          </span>
          <div className="departments">
            <div className="icon-holder">
              <img className="icons" src={CID} alt="" />
              <span className="titles">Office of the President</span>
            </div>
            <div className="icon-holder">
              <img className="icons" src={SGOD} alt="" />
              <span className="titles">Office of the President</span>
            </div>
            <div className="icon-holder">
              <img className="icons" src={OSDS} alt="" />
              <span className="titles">Office of the President</span>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
