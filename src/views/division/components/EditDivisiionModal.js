import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import DivisionAPI from '../../../api/DivisionAPI';
import { toast } from 'react-toastify';

function EditDivisiionModal({
  showEditModal,
  setShowEditModal,
  divisionId,
  getAllDivision,
  divisions,
  setDivisionId
}) {
  const [divisionName, setDivisionName] = useState('')
  const [divisionDescription, setDivisionDescription] = useState('')

  useEffect(() => {
    handleDivision()
  },[divisionId])

  const handleCloseModa = () => {
    setShowEditModal(false)
    setDivisionDescription('')
    setDivisionName('')
    setDivisionId(null)
  }

  const handleDivision = () => {
    divisions
    ?.filter((item) => item?.id === divisionId )
    ?.map(item => {
      console.log('item:', item)
      setDivisionName(item?.divisionName)
      setDivisionDescription(item?.divisionDescription)
    })
  }

  const updateDivision = async (e) => {
    e.preventDefault()
    let data = {
      "id": divisionId,
      "divisionName": divisionName,
      "divisionDescription": divisionDescription
    }
    let response = await new DivisionAPI().updateDivision(divisionId, data)
    if(response.ok){
      getAllDivision()
      handleCloseModa()
      toast.success('Successfully Edited Division!', {
        position: "top-center",
        autoClose: 5000,
        });
    }else{
      alert('err')
    }
  }


  return (
    <>
    <Modal
      show={showEditModal}
      onHide={handleCloseModa}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Division</Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateDivision} >
        <Modal.Body>
          <Row className="mt-3">
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Division Name"
              >
                <Form.Control required type="tex" placeholder="" value={divisionName} onChange={(e) => setDivisionName(e.target.value)} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Division Description"
              >
                <Form.Control required type="tex" placeholder="" value={divisionDescription} onChange={(e) => setDivisionDescription(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
  )
}

export default EditDivisiionModal