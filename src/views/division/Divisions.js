import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap'
import Header from '../dashboard/Header';
import SideNav from '../dashboard/SideNav';
import DvisionHeader from './components/DvisionHeader';
import CreateDivisionModal from './components/CreateDivisionModal';
import { useHistory } from "react-router-dom";
import SideBar from '../../components/SideBar';
import DivisionAPI from '../../api/DivisionAPI';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditDivisiionModal from './components/EditDivisiionModal';
import { toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';
import CreatePesonnelModal from './components/CreatePesonnelModal';
import departmentAPI from '../../api/DepartmentAPI';


function Divisions() {
  const history = useHistory();

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [showCreatePersonnelModal, setShowCreatePersonnelModal] = useState(false)

  const [divisions, setDivisions] = useState()
  const [divisionId, setDivisionId] = useState()
  const [departments, setDepartments] = useState()

  useEffect(() => {
    getAllDivision()
    getAllDepartment()
  }, [])

  const handleViewOffice = (divisionId) => {
    history.push(`/divisions/${divisionId}/office/`)
  }

  const handlePersonnelModal = () =>{
    setShowCreatePersonnelModal(true)
  }

  const handleDelete = (id) =>{
    setDeleteNotify(true)
    setDivisionId(id)
  }

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const handleOpenEditModal = (id) => {
    setShowEditModal(true)
    setDivisionId(id)
  }

  const getAllDivision = async () => {
    let response = await new DivisionAPI().getAllDivision()
    if (response.ok) {
      setDivisions(response.data)
      console.log('div:', response.data)
    } else {
      console.log('err')
    }
  }

  const deleteDivision = async () => {
    let response = await new DivisionAPI().deleteDivision(divisionId)
    if(response.ok){
      toast.success('Successfully Deleted Division!', {
        position: "top-center",
        autoClose: 5000,
        });
      getAllDivision()
      cancelSweetAlert()
    }else{
      alert('no good')
    }
  }

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment()
    if(response.ok){
      setDepartments(response.data)
    }else{
      alert('err12123')
    }
  }



  return (
    <Container fluid className="dashboard">
      <CreatePesonnelModal departments={departments}   setShowCreatePersonnelModal={setShowCreatePersonnelModal} showCreatePersonnelModal={showCreatePersonnelModal} />
      <CreateDivisionModal getAllDivision={getAllDivision} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <EditDivisiionModal setDivisionId={setDivisionId} showEditModal={showEditModal} setShowEditModal={setShowEditModal} divisionId={divisionId} getAllDivision={getAllDivision} divisions={divisions}   />
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports" >
            <DvisionHeader handlePersonnelModal={handlePersonnelModal} setShowCreateModal={setShowCreateModal} />
            <div className="table-container">
              <Table striped bordered hover className='table'>
                <thead>
                  <tr>
                    <th className='table-titles'>Division</th>
                    <th className='table-titles'>Divisions Description</th>
                    {/* <th className='table-titles'>Total Employee</th> */}
                    <th className='table-titles'>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {divisions?.map(item => {
                    return (
                      <tr>
                        <td>{item?.divisionName}</td>
                        <td>{item?.divisionDescription}</td>
                        {/* <td>120</td> */}
                        <td className='act-grp-btn'>
                       <Button onClick={() => handleViewOffice(item?.id)} variant="primary">View</Button>
                       <Button onClick={() => handleOpenEditModal(item?.id)} variant="primary">Edit</Button>
                       <Button onClick={() => handleDelete(item?.id)} variant="primary">Delete</Button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
      <SweetAlert
        warning
        showCancel
        show={deleteNotify}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => deleteDivision()}
        onCancel={cancelSweetAlert}
        focusCancelBtn
          >
            You will not be able to recover this Division!
      </SweetAlert>
    </Container>
  )
}

export default Divisions