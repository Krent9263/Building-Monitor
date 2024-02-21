import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import Header from './Components/Header';
import SideNav from './Components/SideNav';
import TeacherReports from './Components/TeacherReports';

function Reports() {
  return (
    <Container fluid className="dashboard">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col><SideNav /></Col>
        <Col sm={12} md={12} lg={12} xl={10}>
          <TeacherReports />
        </Col>
      </Row>
    </Container>
  );
}

export default Reports;
