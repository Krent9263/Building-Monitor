import React, { useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import Header from '../Components/Header';
import SideNav from '../Components/SideNav';
import TeacherReports from '../Components/TeacherReports';
import DvisionHeader from './components/DvisionHeader';
import CreateDivisionModal from './components/CreateDivisionModal';
import { useHistory } from "react-router-dom";


function Divisions() {
  const history = useHistory();

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleViewOffice = () => {
    history.push("/divisions/office")
  }

  return (
    <Container fluid className="dashboard">
      <CreateDivisionModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <Row>
        <Header />
      </Row>
      <Row>
        <Col><SideNav /></Col>
        <Col sm={12} md={12} lg={12} xl={10}>
          <div className="reports" >
            <DvisionHeader setShowCreateModal={setShowCreateModal} />
            <div className="table-container">
              <Table striped bordered hover className='table' >
                <thead>
                  <tr>
                    <th>Division</th>
                    <th>Divisions Description</th>
                    <th>Total Employee</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td>Add Personel<Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td>Add Personel <Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td>Add Personel <Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
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

export default Divisions