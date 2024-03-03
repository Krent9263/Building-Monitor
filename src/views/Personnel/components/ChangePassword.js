import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from '../../../api/UserAccountAPI';
import { toast } from "react-toastify";



function ChangePassword({showChangePassword, setShowChangePassword, employeeId}) {
  const [newPassword, setNewPassword] = useState('')

  const handleClose = () => {
    setShowChangePassword(false)
    setNewPassword('')
  }

  const changePassword = async (e) => {
    e.preventDefault()
    let data = {
      "userAccountId": employeeId,
      "password": newPassword
    }
    let response = await new UserAccountAPI().changePassword(employeeId, data)
    if(response?.ok){
      toast.success("Successfully Change Password!", {
        position: "top-center",
        autoClose: 5000,
      });
      handleClose()
    }else{
      alert('NO GOOD')
    }
  }

  return (
    <>
     <Modal
        show={showChangePassword}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={changePassword}>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="New Password">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
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
      </Modal></>
  )
}

export default ChangePassword