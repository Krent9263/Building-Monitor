import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import SideBar from '../../components/SideBar';
import { useHistory, useParams } from "react-router-dom";
import OfficeHeader from './components/OfficeHeader';
import CreateOfficeModal from './components/CreateOfficeModal';
import departmentAPI from '../../api/DepartmentAPI';

function Offices() {
  const history = useHistory();
  const { divisionId } = useParams();
  const [showCreateModal, setShowCreateModal] = useState()

  const [departments, setDepartments] = useState()

  useEffect(() => {
    getAllDepartment()
  }, [divisionId])

  const handleViewOffice = () => {
    history.push("/divisions/office/employees")
  }

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment()
    if (response.ok) {
      let tempData = response?.data?.filter(item => item?.divisionId == divisionId)
      setDepartments(tempData)
    }
  }

  console.log('divisionId:', divisionId)
  console.log('departments:', departments)

  return (
    <Container fluid className="dashboard">
      <CreateOfficeModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
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
                    {/* <th>Total Employee</th> */}
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map(item => {
                    return (
                      <tr>
                        <td>{item?.id}</td>
                        <td>{item?.departmentName}</td>
                        <td>{item?.departmentDescription}</td>
                        {/* <td>120</td> */}
                        <td className='act-grp-btn'>
                          <Button onClick={handleViewOffice} variant="primary">View</Button>
                          <Button variant="primary">Edit</Button>
                          <Button variant="primary">Delete</Button></td>
                      </tr>
                    )
                  })}
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