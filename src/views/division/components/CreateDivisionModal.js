import React from 'react'
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";

function CreateDivisionModal({ showCreateModal, setShowCreateModal }) {

  const handleCloseModa = () =>{
    setShowCreateModal(false)
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
        <Form>
          <Modal.Body>
            <Row className="mt-3">
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Division Name"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Division Description"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
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