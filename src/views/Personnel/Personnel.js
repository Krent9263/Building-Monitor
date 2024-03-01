import React from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import PersonnelHeader from "./components/PersonnelHeader";

function Personnel() {
  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <PersonnelHeader />

            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Division</th>
                    <th>Office</th>
                    <th>Time in</th>
                    <th>Time out</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Personnel;
