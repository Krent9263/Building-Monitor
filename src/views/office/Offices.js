import React, { useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import Header from '../Components/Header';
import SideNav from '../Components/SideNav';
import { useHistory } from "react-router-dom";
import OfficeHeader from './components/OfficeHeader';

function Offices() {
  const [showCreateModal, setShowCreateModal] = useState()
  
  return (
    <Container fluid className="dashboard">
      {/* <CreateDivisionModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} /> */}
      <Row>
        <Header />
      </Row>
      <Row>
        <Col><SideNav /></Col>
        <Col sm={12} md={12} lg={12} xl={10}>
          <div className="reports" >
            <OfficeHeader />
            <div className="table-container">
              <Table striped bordered hover className='table' >
                <thead>
                  <tr>
                    <th>Division</th>
                    <th>Office</th>
                    <th>Office Description</th>
                    <th>Total Employee</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Division 1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td><Button variant="primary">Delete</Button><Button variant="primary">Edit</Button><Button variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>Division 1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td><Button variant="primary">Delete</Button><Button variant="primary">Edit</Button><Button variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>Division 1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td><Button variant="primary">Delete</Button><Button variant="primary">Edit</Button><Button variant="primary">View</Button></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Offices