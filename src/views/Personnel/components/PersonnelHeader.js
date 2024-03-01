import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function PersonnelHeader() {
  return (
    <div>
      <h1 className="dept-name">PERSONNEL</h1>
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
          <Button className="btn-r">
            Create Personnel
          </Button>
        </div>
      </div>
    </div>
  );
}
