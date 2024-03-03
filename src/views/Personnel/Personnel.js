import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import PersonnelHeader from "./components/PersonnelHeader";
import UserAccountAPI from "../../api/UserAccountAPI";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import EditPersonnel from "./components/EditPersonnel";
import departmentAPI from "../../api/DepartmentAPI";
import ChangePassword from "./components/ChangePassword";

function Personnel() {
  const [personnel, setPersonnel] = useState();
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const [employeeId, setEmployeeId] = useState();
  const [deleteNotify, setDeleteNotify] = useState(false);
  const [userAccountId, setUserAccountId] = useState();
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [departments, setDepartments] = useState([])
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleChangePassword = (id) => {
    setShowChangePassword(true)
    setEmployeeId(id)
  }

  const getAllUsers = async () => {
    let response = await new UserAccountAPI().getAllUsers();
    if (response.ok) {
      setPersonnel(
        response?.data?.filter(
          (item) =>
            (item?.roleId === 2 && item?.departmentId === 12) ||
            item?.departmentId === 27
        )
      );
    } else {
      console.error("Something went wrong while fetching all users");
    }
  };

  const deleteUserAccount = async () => {
    let response = await new UserAccountAPI().deleteUserAccount(employeeId);
    if (response.ok) {
      toast.warning("Successfully deleted employee!", {
        position: "top-center",
        autoClose: 5000,
      });
      cancelSweetAlert();
      getAllUsers();
    } else {
      alert("err");
    }
  };

  const handleEditModal = (id) => {
    setShowEditEmployee(true);
    setUserAccountId(id);
  };

  const cancelSweetAlert = () => {
    setDeleteNotify(false);
  };

  const handleDelete = (id) => {
    setDeleteNotify(true);
    setEmployeeId(id);
  };

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment();
    if (response.ok) {
      setDepartments(response?.data);
    } else {
      console.error("Something went wrong while fetching Departments");
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllDepartment();
  }, []);

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <PersonnelHeader user={user} departments={departments} getAllUsers={getAllUsers} />
            <EditPersonnel
              setUserAccountId={setUserAccountId}
              userAccountId={userAccountId}
              personnel={personnel}
              showEditEmployee={showEditEmployee}
              setShowEditEmployee={setShowEditEmployee}
              getAllUsers={getAllUsers}
            />
            <ChangePassword employeeId={employeeId} showChangePassword={showChangePassword} setShowChangePassword={setShowChangePassword} />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {personnel?.map((item) => {
                    return (
                      <tr style={{ textAlign: "center" }}>
                        <td>{item?.employeeId}</td>
                        <td>{`${item?.firstName} ${item?.middleName} ${item?.lastName}`}</td>
                        <td>{item?.departmentName}</td>
                        <td className="act-grp-btn">
                          <Button
                            variant="primary"
                            onClick={() => handleEditModal(item?.userAccountId)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleDelete(item?.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleChangePassword(item?.id)}
                          >
                            Change Password
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
        <SweetAlert
          warning
          showCancel
          show={deleteNotify}
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={deleteUserAccount}
          onCancel={cancelSweetAlert}
          focusCancelBtn
        >
          You will not be able to recover this Division!
        </SweetAlert>
      </Row>
    </Container>
  );
}

export default Personnel;
