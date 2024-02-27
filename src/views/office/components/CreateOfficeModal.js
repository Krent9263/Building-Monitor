import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import departmentAPI from "../../../api/DepartmentAPI";
import { toast } from 'react-toastify';

function CreateOfficeModal({ showCreateModal, setShowCreateModal, divisionId, getAllDepartment }) {

  const [officeName, setOfficeName] = useState('')
  const [officeDescritop, setOfficeDescription] = useState('')

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setOfficeName('')
    setOfficeDescription('')
  };

  const createDepartment = async (e) => {
    e.preventDefault()
    let data = {
      "departmentName": officeName,
      "departmentDescription": officeDescritop,
      "divisionId": divisionId
    }
    let response = await new departmentAPI().createDepartment(data)
    if(response.ok){
      toast.success('Successfully Created Office!', {
        position: "top-center",
        autoClose: 5000,
        });
      handleCloseModal()
      getAllDepartment()
    }else{
      alert('err')
    }
  }

  return (
    <>
      <Modal
        show={showCreateModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Office</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createDepartment} >
          <Modal.Body>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Office Name">
                  <Form.Control type="text" placeholder="" value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Office Description"
                >
                  <Form.Control type="text" placeholder="" value={officeDescritop} onChange={(e) => setOfficeDescription(e.target.value)} />
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
  );
}

export default CreateOfficeModal;
