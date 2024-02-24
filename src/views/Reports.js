import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import Header from './dashboard/Header';
import SideNav from './dashboard/SideNav';
import TeacherReports from './employee/TeacherReports';

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
