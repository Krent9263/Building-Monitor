import React from 'react'
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function EmployeeHeader({setShowBulkUpload, setShowAddEmployee, addEmployee, bulkUpload, divisionId}) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push(`/divisions/${divisionId}/office/`)
  }

  // const handleCreateOffice = () => {
  //   setShowCreateModal(true);
  // }

  return (
    <div>
    <h1 className="dept-name">OFFICE EMPLOYEES</h1>
    <div className="reports-header">
      <div >
      <Button className="btn-r" onClick={handleBackButton}>Back</Button>
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