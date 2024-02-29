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
  setUserAccountId,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [employeeIdNumber, setEmployeeIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [departmentId, setDepartmentId] = useState(officeId);
  const [email, setEmail] = useState("@deped.com.ph");
  const [showUploadProfile, setShowUploadProfile] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState("");
  const [profileDataImage, setProfileDataImage] = useState({});
  const [tempProfileImage, setTempProfileImage] = useState("");

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
    setEmail("@deped.com.ph");
    setUserAccountId();
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
        setEmail(item?.emailAddress);
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
      toast.warn("Something went wrong while updating employee");
    }
  };

  const uploadProfile = () => {
    setShowUploadProfile(!showUploadProfile);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   handleGetUploadedFile(file);
  // };

  const handlefilesUpload = (file) => {
    if (file != "") {
      getBase64(file[0]).then((data) => {
        setTempProfileImage(data);
        // let toAdd = {
        //   fileName: file[0].name,
        //   base64String: data,
        // };
        let toAdd = {
          id: userAccountId,
          profileImage: {
            fileName: file[0].name,
            base64String: data,
          },
        };
        setProfileDataImage(toAdd);
      });
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  console.log("filesToUpload:", filesToUpload);

  const uploadProfileImage = async (e) => {
    e.preventDefault();
    let response = await new UserAccountAPI().uploadEmployeeProfile(
      userAccountId,
      profileDataImage
    );
    if (response.ok) {
      handleClose();
      toast.success("Successfully uploaded the employee list.");
    } else {
      toast.error("Something went wrong while uploading employee list.");
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
            {showUploadProfile && (
              <Row className="mb-3">
                <Form>
                  <Form.Control
                    accept="image/png, image/gif, image/jpeg"
                    id="inputFile"
                    type="file"
                    required
                    onChange={(e) => handlefilesUpload(e.target.files)}
                  />
                </Form>
              </Row>
            )}
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
            {!showUploadProfile ? (
              <Button onClick={uploadProfile}>Open Upload Profile</Button>
            ) : (
              <Button onClick={uploadProfileImage}>Upload Profile Image</Button>
            )}
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
