import React, { useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import Header from '../dashboard/Header';
import SideNav from '../dashboard/SideNav';
// import TeacherReports from '../dashboard/TeacherReports';
import DvisionHeader from './components/DvisionHeader';
import CreateDivisionModal from './components/CreateDivisionModal';
import { useHistory } from "react-router-dom";
import SideBar from '../../components/SideBar';


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
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports" >
            <DvisionHeader setShowCreateModal={setShowCreateModal} />
            <div className="table-container">
              <Table striped bordered hover className='table'>
                <thead>
                  <tr>
                    <th className='table-titles'>Division</th>
                    <th className='table-titles'>Divisions Description</th>
                    <th className='table-titles'>Total Employee</th>
                    <th className='table-titles'>Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td className='act-grp-btn'>Add Personel<Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
                  </tr>
                  <tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td className='act-grp-btn'>Add Personel<Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
                  </tr><tr>
                    <td>Division 1</td>
                    <td>Division OF THE PRESIDENT</td>
                    <td>120</td>
                    <td className='act-grp-btn'>Add Personel<Button  onClick={() => handleViewOffice()} variant="primary">View</Button></td>
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