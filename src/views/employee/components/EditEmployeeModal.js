import React from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function EditEmployeeModal({
  setShowEditEmployee,
  showEditEmployee,
}) {
  const handleClose = () => setShowEditEmployee(false);

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
        <Form>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
							<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Middle Name"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
							<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
            </Row>

						<Row className="mt-3">
						<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
							<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Employee ID Number"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
						</Row>

						<Row className="mt-3">
						<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Contact Number"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
							<Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Office Department"
                >
                  <Form.Select placeholder="Office Department">
										<option disabled> Select Department </option>
										<option > Office of the President </option>
										<option > Office of the Vice President </option>
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
