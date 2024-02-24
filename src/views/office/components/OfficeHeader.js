import React from 'react'
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function OfficeHeader({setShowCreateModal}) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push("/divisions")
  }

  const handleCreateOffice = () => {
    setShowCreateModal(true);
  }

  return (
    <div>
    <div className="dept-name">Division Office</div>
    <div className="reports-header">
      <div >
      <Button className="btn-r" onClick={handleBackButton}>Back</Button>
      </div>
      <div className="btn-group-header" >
        <Button className="btn-r" onClick={handleCreateOffice}>Create Office</Button>
      </div>
    </div>
  </div>
  )
}

export default OfficeHeader