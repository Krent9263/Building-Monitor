import "../assets/index.scss";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./dashboard/Header";
import MainDashboard from "./dashboard/MainDashboard";
import History from "./dashboard/History";
import SideNav from "./dashboard/SideNav";

function Home() {
  return (
    <Container fluid className="dashboard">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col><SideNav /></Col>
        <Col sm={12} md={12} lg={12} xl={7}><MainDashboard /> </Col>
        <Col className="right-history" sm={12} md={12} lg={12} xl={3}>
          <History />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
