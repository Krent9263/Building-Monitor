import React, { useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import Header from '../dashboard/Header';
import SideNav from '../dashboard/SideNav';
import { useHistory } from "react-router-dom";
import OfficeHeader from './components/OfficeHeader';
import CreateOfficeModal from './components/CreateOfficeModal';

function Offices() {
  const [showCreateModal, setShowCreateModal] = useState()
  
  return (
    <Container fluid className="dashboard">
      <CreateOfficeModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <Row>
        <Header />
      </Row>
      <Row>
        <Col><SideNav /></Col>
        <Col sm={12} md={12} lg={12} xl={10}>
          <div className="reports" >
            <OfficeHeader setShowCreateModal={setShowCreateModal} />
            <div className="table-container">
              <Table striped bordered hover className='table' >
                <thead>
                  <tr>
                    <th>Office ID</th>
                    <th>Office</th>
                    <th>Office Description</th>
                    <th>Total Employee</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td><Button variant="primary">Delete</Button><Button variant="primary">Edit</Button><Button variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td><Button variant="primary">Delete</Button><Button variant="primary">Edit</Button><Button variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>3</td>
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