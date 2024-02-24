import React, { useState } from "react";
import { Button, InputGroup, Form, Table } from "react-bootstrap";
import Filter from "../../assets/images/icons/filter-solid.svg";
import AddEmployeeModal from "../Components/Modals/AddEmployeeModal";
import BulkUpload from "../Components/Modals/BulkUpload";

function TeacherReports() {
	const [showAddEmployee, setShowAddEmployee] = useState(false)
	const [showBulkUpload, setShowBulkUpload] = useState(false)

	const addEmployee = () => {
		setShowAddEmployee(true)
	}

	const bulkUpload = () => {
		setShowBulkUpload(true)
	}


  return (
    <div className="reports">
			<div className="dept-name">OFFICE OF THE PRESIDENT</div>
      <div className="reports-header">
        <div className="filter">
          <img className="f-img" src={Filter} alt="" />
          Filter Office
        </div>
        <div className="btn-group-header">
					<BulkUpload showBulkUpload={showBulkUpload} setShowBulkUpload={setShowBulkUpload} />
					<AddEmployeeModal setShowAddEmployee={setShowAddEmployee} showAddEmployee={showAddEmployee} />
          <Button className="btn-r" onClick={() => addEmployee()}>Add Employee</Button>
					<Button className="btn-r" onClick={() => bulkUpload()}>Bulk Upload	</Button>
          <Button className="btn-r">Generate Report</Button>
          <InputGroup className="searchbar">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control />
          </InputGroup>
        </div>
      </div>
			<div>
				
			<div className="table-container">
          <Table striped bordered hover className='table' >
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Employee No.</th>
                <th>Office</th>
								<th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
			</div>
    </div>
  );
}

export default TeacherReports;
