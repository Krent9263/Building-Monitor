import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BulkUpload({setShowBulkUpload, showBulkUpload}) {
	const handleClose = () => setShowBulkUpload(false);
  return (
    <>
      <Modal
        show={showBulkUpload}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bulk Upload Employee</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Employee Template</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
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

export default BulkUpload;
