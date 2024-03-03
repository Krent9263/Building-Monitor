import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from "react-toastify";

export default function AddPersonnel({
  setShowAddPersonnel,
  showAddPersonnel,
  departments,
  officeId,
  divisionId,
  getAllUsers,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [employeeIdNumber, setEmployeeIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [email, setEmail] = useState("@deped.com.ph");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setShowAddPersonnel(false);
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setEmployeeIdNumber("");
    setContactNumber("");
    setEmail("@deped.com.ph");
    setUsername("");
    setPassword("");
  };

  const createUserAccount = async (e) => {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
      roleId: 2,
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
      getAllUsers();
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
        show={showAddPersonnel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Personnel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createUserAccount}>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Password (Must be at least 8 characters)">
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-3">
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
                    {departments
                      ?.filter((item) => item?.id === 12 || item?.id === 27)
                      .map((item) => {
                        return (
                          <option value={item?.id}>
                            {item?.departmentName}
                          </option>
                        );
                      })}
                  </Form.Select>
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
