import React, { useContext } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";

function FilterModal({ showFilterModal, setShowFilterModal, user }) {
  const handleClose = () => setShowFilterModal(false);

  console.log('USER:', user)

  return (
    <>
      <Modal
        show={showFilterModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Report</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {user?.roleId === 1 ? 
            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Division">
                  <Form.Select aria-label="Floating label select example">
                    <option selected disabled>
                      Choose an option
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Office">
                  <Form.Select aria-label="Floating label select example">
                    <option selected disabled>
                      Choose an option
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            :
            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Date">
                  <Form.Control type="date" />
                </FloatingLabel>
              </Col>
            </Row>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Filter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FilterModal;
