import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import Filter from "../../assets/images/icons/filter-solid.svg";
import AddEmployeeModal from "./components/AddEmployeeModal";
import BulkUpload from "./components/BulkUpload";
import SideBar from "../../components/SideBar";
import EmployeeHeader from "./components/EmployeeHeader";
import { useHistory, useParams } from "react-router-dom";
import departmentAPI from "../../api/DepartmentAPI";
import UserAccountAPI from "../../api/UserAccountAPI";
import { toast } from 'react-toastify';
import EditEmployeeModal from "./components/EditEmployeeModal";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';

function Employee() {
  const { officeId } = useParams();
  const { divisionId } = useParams();

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);
  const [departmentInfo, setDepartmentInfo] = useState()
  const [departments, setDepartments] = useState();

  const [employees, setEmployees] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [userAccountId, setUserAccountId] = useState();

  useEffect(() => {
    getAllDepartment();
    getDepartmentById();
  }, []);

  useEffect(() => {
    getAllUserAccountByDivisionIdAndOfficeId();
  }, [divisionId, officeId]);

  const addEmployee = () => {
    setShowAddEmployee(true);
  };

  const bulkUpload = () => {
    setShowBulkUpload(true);
  };

  const cancelSweetAlert = () => {
    setDeleteNotify(false);
  };

  const handleEditModal = (id) => {
    setShowEditEmployee(true);
    setUserAccountId(id);
  };

  const handleDelete = (id) => {
    setDeleteNotify(true);
    setEmployeeId(id);
  };

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment();
    if (response.ok) {
      let tempData = response.data.filter(i => i?.divisionId == divisionId);
      setDepartments(tempData);
    } else {
      console.error('Something went wrong while fetching Departments');
    }
  };

  const getDepartmentById = async () => {
    let response = await new departmentAPI().getDepartmentById(divisionId)
    if (response.ok) {
      setDepartmentInfo(response.data)
    } else {
      console.error('Something went wrong while fetching DepartmentById')
    }
  }

  console.log('1231',departmentInfo)

  const handleDeleteEmployee = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35482e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting employee...");
        deleteUserAccount();
      }
    });
  };

  const getAllUserAccountByDivisionIdAndOfficeId = async () => {
    let response = await new UserAccountAPI().getAllUserAccountByDivisionIdAndOfficeId(officeId, divisionId);
    if (response.ok) {
      setEmployees(response.data);
    } else {
      toast.warning(response?.data?.errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const deleteUserAccount = async () => {
    let response = await new UserAccountAPI().deleteUserAccount(employeeId);
    if(response.ok){
      toast.warning('Successfully deleted employee!', {
        position: "top-center",
        autoClose: 5000,
      });
      cancelSweetAlert();
      getAllUserAccountByDivisionIdAndOfficeId();
    } else {
      alert('err');
    }
  };

  console.log('divisionId:', divisionId);
  console.log('officeId:', officeId);

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <EditEmployeeModal setUserAccountId={setUserAccountId} userAccountId={userAccountId} divisionId={divisionId} getAllUserAccountByDivisionIdAndOfficeId={getAllUserAccountByDivisionIdAndOfficeId} officeId={officeId} employees={employees} departments={departments} employeeId={employeeId} setEmployeeId={setEmployeeId} showEditEmployee={showEditEmployee} setShowEditEmployee={setShowEditEmployee} />
            <EmployeeHeader departmentInfo={departmentInfo} divisionId={divisionId} setShowBulkUpload={setShowBulkUpload} setShowAddEmployee={setShowAddEmployee} addEmployee={addEmployee} bulkUpload={bulkUpload} />
            <BulkUpload showBulkUpload={showBulkUpload} setShowBulkUpload={setShowBulkUpload} />
            <AddEmployeeModal divisionId={divisionId} getAllUserAccountByDivisionIdAndOfficeId={getAllUserAccountByDivisionIdAndOfficeId} officeId={officeId} departments={departments} showAddEmployee={showAddEmployee} setShowAddEmployee={setShowAddEmployee} />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.employeeId}</td>
                      <td>{employee.firstName} {employee.middleName} {employee.lastName}</td>
                      <td>{employee.emailAddress}</td>
                      <td>{employee.contactNumber}</td>
                      <td className="act-grp-btn">
                        <Button variant="primary" onClick={() => handleEditModal(employee?.userAccountId)} >Edit</Button>
                        <Button variant="primary" onClick={() => handleDelete(employee?.id)} >Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
      <SweetAlert
        warning
        showCancel
        show={deleteNotify}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={handleDeleteEmployee}
        onCancel={cancelSweetAlert}
        focusCancelBtn
      >
        You will not be able to recover this Division!
      </SweetAlert>
    </Container>
  );
}

export default Employee;
