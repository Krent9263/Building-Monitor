import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import departmentAPI from "../../../api/DepartmentAPI";
import { toast } from 'react-toastify';

function EditOfficeModal({setShowEditModal, showEditModal, divisionId, getAllDepartment, departmentId, departments, setDeparntmentId}) {

  const [officeName, setOfficeName] = useState('')
  const [officeDescritop, setOfficeDescription] = useState('')

  useEffect(() => {
    handleOffice()
  },[departmentId])

  const handleCloseModal = () => {
    setShowEditModal(false)
    setOfficeName('')
    setOfficeDescription('')
    setDeparntmentId()
  }

  const handleOffice = () => {
    departments
    ?.filter((item) => item?.id === departmentId )
    ?.map(item => {
      setOfficeName(item?.departmentName)
      setOfficeDescription(item?.departmentDescription)
    })
  }

  const updateDepartment = async (e) => {
    e.preventDefault()
    let data = {
      "id": departmentId,
      "departmentName": officeName,
      "departmentDescription": officeDescritop,
      "divisionId": divisionId
    }
    let response = await new departmentAPI().updateDepartment(departmentId, data)
    if(response.ok){
      toast.success('Successfully Created Office!', {
        position: "top-center",
        autoClose: 5000,
        });
      handleCloseModal()
      getAllDepartment()
    }else
    alert('err')
  }

  return (
    <>
      <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Office</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateDepartment} >
          <Modal.Body>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Office Name">
                  <Form.Control required type="text" placeholder="" value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Office Description"
                >
                  <Form.Control required type="text" placeholder="" value={officeDescritop} onChange={(e) => setOfficeDescription(e.target.value)} />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditOfficeModal
