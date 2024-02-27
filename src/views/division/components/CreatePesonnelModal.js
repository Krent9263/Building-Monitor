import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from 'react-toastify';
import departmentAPI from "../../../api/DepartmentAPI";

function CreatePesonnelModal({
  setShowCreatePersonnelModal,
  showCreatePersonnelModal,
  departments,

}) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [employeeIdNumber, setEmployeeIdNumber] = useState('')
  const [contactNumber, setContactNumber] = useState()
  const [officeId, setOfficeId] = useState()
  var email = 'gilbert.manucduc@deped.gov.ph'

  const handleClose = () => {
    setShowCreatePersonnelModal(false);
    setFirstName('')
    setLastName('')
    setMiddleName('')
    setEmployeeIdNumber('')
    setContactNumber('')
    setOfficeId(0)
  }

  const createUserAccount = async (e) => {
    e.preventDefault()
    let data = {
      "username": userName,
      "password": password,
      "roleId": 2,
      "firstName": firstName,
      "lastName": lastName,
      "middleName": middleName,
      "contactNumber": contactNumber,
      "emailAddress": email,
      "qrCode": employeeIdNumber,
      "departmentId": officeId,
      "employeeId": employeeIdNumber
    }
    let response = await new UserAccountAPI().createUserAccount(data)
    if(response.ok){
      toast.success('Successfully add employee!', {
        position: "top-center",
        autoClose: 5000,
        });
      handleClose()
    }else{
      toast.warning(response?.data?.errorMessage, {
        position: "top-center",
        autoClose: 5000,
        });
    }
  }


  return (
    <>
    <Modal
      show={showCreatePersonnelModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Personnel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={createUserAccount} > 
        <Modal.Body>
          <Row>
          <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="username"
              >
                <Form.Control type="text" placeholder="" value={userName} onChange={(e) => setUserName(e.target.value)}  />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="password"
              >
                <Form.Control type="text" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
              >
                <Form.Control type="text" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Middle Name"
              >
                <Form.Control type="text" placeholder="" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
              >
                <Form.Control type="text" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3">
          <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
              >
                <Form.Control type="email" placeholder="name@example.com" value={email} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Employee ID Number"
              >
                <Form.Control type="text" placeholder="" value={employeeIdNumber} onChange={(e) => setEmployeeIdNumber(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mt-3">
          <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Contact Number"
              >
                <Form.Control type="number" placeholder="" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Office Department"
              >
                <Form.Select placeholder="Office Department" value={officeId} onChange={(e) => setOfficeId(parseInt(e.target.value))} >
                  <option value={0} disabled> Select Department </option>
                  {departments?.map(item => {
                    return(
                      <option value={item?.id} > {item?.departmentName} </option>
                    )
                  })}

                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button type="submit" variant="primary">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  )
}

export default CreatePesonnelModal