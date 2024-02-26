import React, { useState } from "react";
import { Modal, Button, Form, useAccordionButton } from "react-bootstrap";
import UserAccountAPI from "../../../api/UserAccountAPI";
import { toast } from 'react-toastify';

function BulkUpload({setShowBulkUpload, showBulkUpload}) {
  const [filesToUpload, setFilesToUpload] = useState()

	const handleClose = () => {
    setShowBulkUpload(false);
    setFilesToUpload()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleGetUploadedFile(file);
  }

  const handleGetUploadedFile = (file) => {
    getBase64(file).then(
      data => {
        let employee = {
          "fileName": file.name,
          "base64String": `string,${data}`
        };
        setFilesToUpload({ employee });
      }
    ).catch(error => {
      console.error('Error converting file to base64:', error);
    });
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
    
  }

  

  console.log('filesToUpload:', filesToUpload)

  const uploadEmployees = async (e) => {
    e.preventDefault()
    let response = await new UserAccountAPI().uploadEmployees(filesToUpload)
    if(response.ok){
      handleClose()
      toast.success("Successfully uploaded the employee list.")
    }else{
      toast.error("Something went wrong while uploading employee list.")
    }
  }

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
        <Form onSubmit={uploadEmployees} >
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Employee Template</Form.Label>
              <Form.Control accept=".xls,.xlsx," type="file" onChange={handleFileChange} />
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
