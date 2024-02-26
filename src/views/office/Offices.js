import React, { useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import SideBar from '../../components/SideBar';
import { useHistory } from "react-router-dom";
import OfficeHeader from './components/OfficeHeader';
import CreateOfficeModal from './components/CreateOfficeModal';
import EditOfficeModal from './components/EditOfficeModal';
import Swal from 'sweetalert2'

function Offices() {
  const history = useHistory();
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleViewOffice = () => {
    history.push("/divisions/office/employees")
  }

  const handleEditOffice = () => {
    setShowEditModal(true)
  }

  const handleDeleteOffice = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35482e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting office...");
        Swal.fire({
          title: "Deleted!",
          text: "Your office has been deleted.",
          icon: "success",
          confirmButtonColor: "#35482e",  
        });
      }
    });
  }

  <Button onClick={handleDeleteOffice} variant="primary">Delete</Button>


  return (
    <Container fluid className="dashboard">
      <CreateOfficeModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <EditOfficeModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
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
                    <td className='act-grp-btn'>
                      <Button onClick={handleViewOffice} variant="primary">View</Button>
                      <Button onClick={handleEditOffice} variant="primary">Edit</Button>
                      <Button onClick={handleDeleteOffice} variant="primary">Delete</Button>
                      </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td className='act-grp-btn'><Button onClick={handleViewOffice} variant="primary">View</Button><Button onClick={handleEditOffice} variant="primary">Edit</Button><Button variant="primary">Delete</Button></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>120</td>
                    <td className='act-grp-btn'><Button onClick={handleViewOffice} variant="primary">View</Button><Button onClick={handleEditOffice} variant="primary">Edit</Button><Button variant="primary">Delete</Button></td>
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