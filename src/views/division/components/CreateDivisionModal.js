import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import DivisionAPI from '../../../api/DivisionAPI';
import { toast } from 'react-toastify';

function CreateDivisionModal({ showCreateModal, setShowCreateModal, getAllDivision }) {

  const [divisionName, setDivisionName] = useState('')
  const [divisionDescription, setDivisionDescription] = useState('')

  const handleCloseModa = () =>{
    setShowCreateModal(false)
    setDivisionDescription('')
    setDivisionName('')
  }

  const createDivision = async(e) => {
   
    e.preventDefault()
    let data = {
      "divisionName": divisionName,
      "divisionDescription": divisionDescription
    }
    let response = await new DivisionAPI().createDivision(data)
    if(response.ok){
      getAllDivision()
      handleCloseModa()
      toast.success('Successfully Created Division!', {
        position: "top-center",
        autoClose: 5000,
        });
    }else{
      alert('no good')
    }
  }

  return (
    <>
      <Modal
        show={showCreateModal}
        onHide={handleCloseModa}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Division</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createDivision} >
          <Modal.Body>
            <Row className="mt-3">
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Division Name"
                >
                  <Form.Control type="tex" placeholder="" value={divisionName} onChange={(e) => setDivisionName(e.target.value)} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Division Description"
                >
                  <Form.Control type="tex" placeholder="" value={divisionDescription} onChange={(e) => setDivisionDescription(e.target.value)} />
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

export default CreateDivisionModal