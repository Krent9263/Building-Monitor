import React from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";

function FilterModal({ showFilterModal, setShowFilterModal }) {
  const handleClose = () => setShowFilterModal(false);
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
