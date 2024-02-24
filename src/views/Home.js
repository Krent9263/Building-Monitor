import "../assets/index.scss";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./dashboard/Header";
import MainDashboard from "./dashboard/MainDashboard";
import History from "./dashboard/History";
import SideBar from "../components/SideBar";

function Home() {
  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <MainDashboard />
        </Col>
        <Col className="right-history" sm={12} md={12} lg={12} xl={3}>
          <History />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
