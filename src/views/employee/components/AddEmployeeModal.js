import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from "react-toastify";

export default function AddEmployeeModal({
  setShowAddEmployee,
  showAddEmployee,
  departments,
  officeId,
  getAllUserAccountByDivisionIdAndOfficeId,
  divisionId,
  departmentInfo,
  user
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [employeeIdNumber, setEmployeeIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [departmentId, setDepartmentId] = useState(officeId);
  const [email, setEmail] = useState("@deped.com.ph");
  // const [role, setRole] = useState(3)

  const handleClose = () => {
    setShowAddEmployee(false);
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setEmployeeIdNumber("");
    setContactNumber("");
    setEmail("@deped.com.ph");
    // setRole(3)
  };

  const createUserAccount = async (e) => {
    e.preventDefault();
    let data = {
      username: "string",
      password: "string",
      roleId: 3,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      contactNumber: contactNumber,
      emailAddress: email,
      qrCode: employeeIdNumber,
      departmentId: departmentId,
      employeeId: employeeIdNumber,
    };
    let response = await new UserAccountAPI().createUserAccount(data);
    if (response.ok) {
      toast.success("Successfully add employee!", {
        position: "top-center",
        autoClose: 5000,
      });
      handleClose();
      getAllUserAccountByDivisionIdAndOfficeId(officeId, divisionId);
    } else {
      toast.warning(response?.data?.ErrorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

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
        <Form onSubmit={createUserAccount}>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="First Name">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Middle Name">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Last Name">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            {/* {user?.isSystemAdmin &&
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Role">
                  <Form.Select
                    required
                    type="text"
                    placeholder=""
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option disabled>Select Role</option>
                    <option value={2}>ADMIN of {departmentInfo?.departmentName}</option>
                    <option value={3}>Employee</option>
                    <option value={4}>Front Desk</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            } */}
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Email">
                  <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employee ID Number"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={employeeIdNumber}
                    onChange={(e) => setEmployeeIdNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Contact Number">
                  <Form.Control
                    required
                    type="number"
                    placeholder=""
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Department">
                  <Form.Select
                    placeholder="Office Department"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                  >
                    <option disabled> Select Department </option>
                    {departments?.map((item) => {
                      return (
                        <option value={item?.id}>
                          {" "}
                          {item?.departmentName}{" "}
                        </option>
                      );
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
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
