import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import AddPersonnel from './AddPersonnel';

export default function PersonnelHeader({user, departments, getAllUsers}) {
  const [showAddPersonnel, setShowAddPersonnel] = useState(false)
  

  const handleAddPersonnel = () => {
    setShowAddPersonnel(true)
  }

  return (
    <div>
      <h1 className="dept-name">PERSONNEL LISTS</h1>
      {/* <h2 className="dept-name">OFFICE OF ACCOUNTING</h2> */}
      <div className="reports-header">
        <div>
          {/* <Button className="btn-r" >
            <FontAwesomeIcon icon={faFilter} /> Filter By Division and
            Department
          </Button>
          <Button className="btn-r" >
            <FontAwesomeIcon icon={faFilter} /> Filter By Date
          </Button> */}
        </div>
        <div className="btn-group-header">
          <AddPersonnel showAddPersonnel={showAddPersonnel} setShowAddPersonnel={setShowAddPersonnel} departments={departments} getAllUsers={getAllUsers} />
          <Button className="btn-r" onClick={handleAddPersonnel}>
            Create Personnel
          </Button>
        </div>
      </div>
    </div>
  );
}
