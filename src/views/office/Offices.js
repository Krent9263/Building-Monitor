import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import { useHistory, useParams } from "react-router-dom";
import OfficeHeader from "./components/OfficeHeader";
import CreateOfficeModal from "./components/CreateOfficeModal";
import departmentAPI from "../../api/DepartmentAPI";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import EditOfficeModal from "./components/EditOfficeModal";
import Swal from "sweetalert2";
import DivisionAPI from "../../api/DivisionAPI";

function Offices() {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();
  const { divisionId } = useParams();
  const [showCreateModal, setShowCreateModal] = useState();
  const [deleteNotify, setDeleteNotify] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [division, setDivision] = useState();

  const [departments, setDepartments] = useState();
  const [departmentId, setDeparntmentId] = useState();

  useEffect(() => {
    getAllDepartment();
  }, [divisionId]);

  const handleViewOffice = (departmentId) => {
    history.push(`/divisions/${divisionId}/office/${departmentId}/employee`);
  };

  const cancelSweetAlert = () => {
    setDeleteNotify(false);
  };

  const handleDelete = (id) => {
    setDeleteNotify(true);
    setDeparntmentId(id);
  };

  const handleEdit = (id) => {
    setDeparntmentId(id);
    setShowEditModal(true);
  };

  useEffect(() => {
    getDivisionById();
  }, []);

  const getDivisionById = async () => {
    let response = await new DivisionAPI().getDivisionById(
      user?.isOfficeAdmin ? user?.divisionId : divisionId
    );
    if (response.ok) {
      setDivision(response.data);
    } else {
      console.error("Something went wrong while fetching division");
    }
  };

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment();
    if (response.ok) {
      let tempData = response?.data?.filter(
        (item) => item?.divisionId == divisionId
      );
      setDepartments(tempData);
    } else {
      console.error("Something went wrong while fetching offices");
    }
  };

  console.log("asdasda", departments);

  const deleteDepartment = async () => {
    let response = await new departmentAPI().deleteDepartment(departmentId);
    if (response.ok) {
      toast.success("Successfully Deleted Office!", {
        position: "top-center",
        autoClose: 5000,
      });
      cancelSweetAlert();
      getAllDepartment();
    } else {
      alert("err");
    }
  };

  return (
    <Container fluid className="dashboard">
      <CreateOfficeModal
        getAllDepartment={getAllDepartment}
        divisionId={divisionId}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
      <EditOfficeModal
        setDeparntmentId={setDeparntmentId}
        departments={departments}
        departmentId={departmentId}
        getAllDepartment={getAllDepartment}
        divisionId={divisionId}
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
      />
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <OfficeHeader
              setShowCreateModal={setShowCreateModal}
              division={division}
            />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Office ID</th>
                    <th>Office</th>
                    <th>Office Description</th>
                    {/* <th>Total Employee</th> */}
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.id}</td>
                        <td>{item?.departmentName}</td>
                        <td>{item?.departmentDescription}</td>
                        <td className="act-grp-btn">
                          <Button
                            onClick={() => handleViewOffice(item?.id)}
                            variant="primary"
                          >
                            View
                          </Button>
                          {user?.isOfficeAdmin && (user?.departmentId === 27 || user?.departmentId === 12) ? (
                            <></>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => handleEdit(item?.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => handleDelete(item?.id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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
        onConfirm={() => deleteDepartment()}
        onCancel={cancelSweetAlert}
        focusCancelBtn
      >
        You will not be able to recover this Division!
      </SweetAlert>
    </Container>
  );
}

export default Offices;
