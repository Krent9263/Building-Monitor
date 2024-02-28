import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Row, Col, Container, Table } from "react-bootstrap";
import CID from "../../assets/images/CID.png";
import SGOD from "../../assets/images/SGOD.png";
import OSDS from "../../assets/images/OSDS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faBuilding,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import departmentAPI from "../../api/DepartmentAPI";

export default function MainDashboard() {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();
  const [departments, setDepartments] = useState();

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment()
    if (response.ok) {
      let tempData = response?.data?.filter(item => item?.divisionId == user?.divisionId)
      setDepartments(tempData)
    }
  }

  useEffect(() => {
    getAllDepartment();
  }, []);

  return (
    <Container fluid className="main-dashboard">
      <Row className="row-1">
        <Col className="display-total" sm={12} md={6}>
          <div className="total">
            45 <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Inside the Office</span>
          </div>
        </Col>
        <Col className="display-total">
          <div className="total">
            45 <FontAwesomeIcon icon={faRoute} />
          </div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Outside the Office</span>
          </div>
        </Col>
      </Row>
      {user?.roleId === 1 ? (
        <Row className="row-2">
          <div className="sdo-department">
            <span className="header-sdo">
              <span className="title-holder">
                <FontAwesomeIcon icon={faSitemap} className="dept-ficon" />
                DIVISION
              </span>
              <span
                className="see-all"
                onClick={() => history.push("/divisions")}
              >
                See all division
              </span>
            </span>
            <div className="departments">
              <div className="icon-holder">
                <img className="icons" src={CID} alt="" />
                <span className="titles">Office of the President</span>
              </div>
              <div className="icon-holder">
                <img className="icons" src={SGOD} alt="" />
                <span className="titles">Office of the President</span>
              </div>
              <div className="icon-holder">
                <img className="icons" src={OSDS} alt="" />
                <span className="titles">Office of the President</span>
              </div>
            </div>
          </div>
        </Row>
      ) : (
        <Row className="row-2">
          <div className="sdo-department">
            <span className="header-sdo">
              <span className="title-holder">
                <FontAwesomeIcon icon={faSitemap} className="dept-ficon" />
                {user?.divisionName.toUpperCase()}
              </span>
              <span
                className="see-all"
                onClick={() => history.push(`/office/${user?.divisionId}`)}
              >
                See all offices
              </span>
            </span>
            <div className="table-div">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Office ID</th>
                    <th>Office</th>
                    <th>Office Description</th>
                    {/* <th>Total Employee</th> */}
                    {/* <th>Action </th> */}
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((item) => {
                    return (
                      <tr key={item?.id}>
                        <td>{item?.id}</td>
                        <td>{item?.departmentName}</td>
                        <td>{item?.departmentDescription}</td>
                        {/* <td className="act-grp-btn">
                          <Button
                            onClick={() => handleViewOffice(item?.id)}
                            variant="primary"
                          >
                            View
                          </Button>
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
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      )}
    </Container>
  );
}
