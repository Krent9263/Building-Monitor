import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from 'react-toastify';

export default function AddEmployeeModal({
  setShowAddEmployee,
  showAddEmployee,
  departments,
  officeId,
  getAllUserAccountByDivisionIdAndOfficeId,
  divisionId
}) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [employeeIdNumber, setEmployeeIdNumber] = useState('')
  const [contactNumber, setContactNumber] = useState()
  const [departmentId, setDepartmentId] = useState(officeId)
  var email = 'gilbert.manucduc@deped.gov.ph'

  const handleClose = () => {
    setShowAddEmployee(false);
    setFirstName('')
    setLastName('')
    setMiddleName('')
    setEmployeeIdNumber('')
    setContactNumber('')
  }

  const createUserAccount = async (e) => {
    e.preventDefault()
    let data = {
      "username": "string",
      "password": "string",
      "roleId": 3,
      "firstName": firstName,
      "lastName": lastName,
      "middleName": middleName,
      "contactNumber": contactNumber,
      "emailAddress": email,
      "qrCode": employeeIdNumber,
      "departmentId": departmentId,
      "employeeId": employeeIdNumber
    }
    let response = await new UserAccountAPI().createUserAccount(data)
    if(response.ok){
      toast.success('Successfully add employee!', {
        position: "top-center",
        autoClose: 5000,
        });
      handleClose()
      getAllUserAccountByDivisionIdAndOfficeId(officeId, divisionId)
    }else{
      toast.warning(response?.data?.ErrorMessage, {
        position: "top-center",
        autoClose: 5000,
        });
    }
  }


  return (
    <>
      <Modal
        show={showAddEmployee}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
				size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createUserAccount} > 
          <Modal.Body>
            <Row>
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
                  label="Division"
                >
                  <Form.Select placeholder="Office Department" value={departmentId} onChange={(e) => setDepartmentId(parseInt(e.target.value))} >
										<option disabled> Select Department </option>
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
  );
}
