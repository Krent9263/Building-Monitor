import React from 'react'
import { Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


function OfficeHeader({setShowFilterModal}) {
  const history = useHistory();

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const handleDownload = () => {
    alert('Downloading')
  }

  const handleBackButton = () => {
    history.pushState('/division/office')
  } 

  return (
    <div>
    <h1 className="dept-name">REPORTS</h1>
    <h2 className="dept-name">OFFICE OF ACCOUNTING</h2>
    <div className="reports-header">
      <div>
      <Button className="btn-r" onClick={handleFilter}><FontAwesomeIcon icon={faFilter} /> Filter Reports</Button>
      </div>
      <div className="btn-group-header" >
        <Button className="btn-r" onClick={handleDownload}>Generate Report</Button>
      </div>
    </div>
  </div>
  )
}

export default OfficeHeader