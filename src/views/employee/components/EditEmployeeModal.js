import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from "react-toastify";

function EditEmployeeModal({
  userAccountId,
  departments,
  employeeId,
  setEmployeeId,
  showEditEmployee,
  setShowEditEmployee,
  employees,
  officeId,
  divisionId,
  getAllUserAccountByDivisionIdAndOfficeId,
  setUserAccountId
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [employeeIdNumber, setEmployeeIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [departmentId, setDepartmentId] = useState(officeId);
  var email = "gilbert.manucduc@deped.gov.ph";

  useEffect(() => {
    handleEmployeeData();
  }, [userAccountId]);

  const handleClose = () => {
    setShowEditEmployee(false);
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setEmployeeIdNumber("");
    setContactNumber("");
    setUserAccountId()
  };

  const handleEmployeeData = () => {
    employees
      ?.filter((item) => item?.userAccountId === userAccountId)
      ?.map((item) => {
        console.log("item:", item);
        setFirstName(item?.firstName);
        setLastName(item?.lastName);
        setMiddleName(item?.middleName);
        setEmployeeIdNumber(item?.employeeId);
        setContactNumber(item?.contactNumber);
      });
  };

  const updateUserAccount = async (e) => {
    e.preventDefault();
    let data = {
      id: userAccountId,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      contactNumber: contactNumber,
      emailAddress: email,
      password: "string",
      qrCode: employeeIdNumber,
      departmentId: departmentId,
    };
    let response = await new UserAccountAPI().updateUserAccount(
      userAccountId,
      data
    );
    if (response.ok) {
      toast.success("Successfully add employee!", {
        position: "top-center",
        autoClose: 5000,
      });
      handleClose();
      getAllUserAccountByDivisionIdAndOfficeId(officeId, divisionId);
    } else {
      alert("err");
    }
  };

  console.log("userAccnoutId:", userAccountId);

  return (
    <>
      <Modal
        show={showEditEmployee}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateUserAccount}>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingInput" label="First Name">
                  <Form.Control
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
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employee ID Number"
                >
                  <Form.Control
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
                    type="number"
                    placeholder=""
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Division">
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

export default EditEmployeeModal;
