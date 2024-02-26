import React from 'react'
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmployeeHeader({setShowBulkUpload, setShowAddEmployee, addEmployee, bulkUpload}) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push("/divisions/office")
  }

  // const handleCreateOffice = () => {
  //   setShowCreateModal(true);
  // }

  return (
    <div>
    <h1 className="dept-name">OFFICE EMPLOYEES</h1>
    <div className="reports-header">
      <div >
      <Button onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /> Back</Button> &nbsp;
      </div>
      <div className="btn-group-header" >
        <Button className="btn-r" onClick={addEmployee}>Create Employee</Button>
        <Button className="btn-r" onClick={bulkUpload}>Bulk Upload</Button>
      </div>
    </div>
  </div>
  )
}

export default EmployeeHeader