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


function Divisions() {
  const history = useHistory();

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteNotify, setDeleteNotify] = useState(false)

  const [divisions, setDivisions] = useState()
  const [divisionId, setDivisionId] = useState()


  useEffect(() => {
    getAllDivision()
  }, [])

  const handleViewOffice = (divisionId) => {
    history.push(`/divisions/${divisionId}/office/`)
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
      alert('delete')
      getAllDivision()
    }else{
      alert('no good')
    }
  }



  return (
    <Container fluid className="dashboard">
      <CreateDivisionModal getAllDivision={getAllDivision} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <EditDivisiionModal setDivisionId={setDivisionId} showEditModal={showEditModal} setShowEditModal={setShowEditModal} divisionId={divisionId} getAllDivision={getAllDivision} divisions={divisions}   />
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