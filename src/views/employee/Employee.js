import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import Filter from "../../assets/images/icons/filter-solid.svg";
import AddEmployeeModal from "./components/AddEmployeeModal";
import BulkUpload from "./components/BulkUpload";
import SideBar from "../../components/SideBar";
import EmployeeHeader from "./components/EmployeeHeader";
import { useHistory, useParams } from "react-router-dom";
import departmentAPI from "../../api/DepartmentAPI";


function Employee() {
  const {divisionId, departmentId } = useParams();

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  const [departments, setDepartments] = useState()

  useEffect(() => {
    getAllDepartment()
  },[])

  const addEmployee = () => {
    setShowAddEmployee(true);
  };

  const bulkUpload = () => {
    setShowBulkUpload(true);
  };

  const employees = [
    {
      name: "Juan Dela Cruz",
      position: "teacher",
      id: "123456",
      email: "Sample@email.com",
      contact: "09123456789"
    },
    {
      name: "Maria Garcia",
      position: "engineer",
      id: "789012",
      email: "Sample@email.com",
      contact: "09123456789"
    },
    {
      name: "John Smith",
      position: "developer",
      id: "345678",
      email: "Sample@email.com",
      contact: "09123456789"
    },
    {
      name: "Emily Johnson",
      position: "designer",
      id: "901234",
      email: "Sample@email.com",
      contact: "09123456789"
    }
  ];

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment()
    if(response.ok){
      let tempData = response.data.filter(i => i?.divisionId == divisionId)
      setDepartments(tempData)
    }else{
      alert('err')
    }
  }
  


  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <EmployeeHeader divisionId={divisionId} setShowBulkUpload={setShowBulkUpload} setShowAddEmployee={setShowAddEmployee} addEmployee={addEmployee} bulkUpload={bulkUpload}  />
            <BulkUpload showBulkUpload={showBulkUpload} setShowBulkUpload={setShowBulkUpload} />
            <AddEmployeeModal departmentId={departmentId} departments={departments} showAddEmployee={showAddEmployee} setShowAddEmployee={setShowAddEmployee} />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Position</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.contact}</td>
                      <td>{employee.position}</td>
                      <td className="act-grp-btn">
                        <Button variant="primary">View</Button>
                        <Button variant="primary">Edit</Button>
                        <Button variant="primary">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    // <div className="reports">
    // 	<div className="dept-name">OFFICE OF THE PRESIDENT</div>
    //   <div className="reports-header">
    //     <div className="filter">
    //       <img className="f-img" src={Filter} alt="" />
    //       Filter Office
    //     </div>
    //     <div className="btn-group-header">
    // 			<BulkUpload showBulkUpload={showBulkUpload} setShowBulkUpload={setShowBulkUpload} />
    // 			<AddEmployeeModal setShowAddEmployee={setShowAddEmployee} showAddEmployee={showAddEmployee} />
    //       <Button className="btn-r" onClick={() => addEmployee()}>Add Employee</Button>
    // 			<Button className="btn-r" onClick={() => bulkUpload()}>Bulk Upload	</Button>
    //       <Button className="btn-r">Generate Report</Button>
    //       <InputGroup className="searchbar">
    //         <InputGroup.Text>$</InputGroup.Text>
    //         <Form.Control />
    //       </InputGroup>
    //     </div>
    //   </div>
    // 	<div>

    // 	<div className="table-container">
    //       <Table striped bordered hover className='table' >
    //         <thead>
    //           <tr>
    //             <th>Name</th>
    //             <th>Position</th>
    //             <th>Employee No.</th>
    //             <th>Office</th>
    // 						<th>Department</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td>1</td>
    //             <td>Mark</td>
    //             <td>Otto</td>
    //             <td>@mdo</td>
    //           </tr>
    //           <tr>
    //             <td>2</td>
    //             <td>Jacob</td>
    //             <td>Thornton</td>
    //             <td>@fat</td>
    //           </tr>
    //           <tr>
    //             <td>3</td>
    //             <td colSpan={2}>Larry the Bird</td>
    //             <td>@twitter</td>
    //           </tr>
    //         </tbody>
    //       </Table>
    //     </div>
    // 	</div>
    // </div>
  );
}

export default Employee;
