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
import DivisionAPI from "../../api/DivisionAPI";

export default function MainDashboard({allUsers, usersInSide, userByDivision, userInsideBydivision}) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();

  const [departments, setDepartments] = useState();
  const [divisions, setDivisions] = useState();

  useEffect(() => {
    getAllDepartment();
    getAllDivision();
  }, [user]);

  const getAllDepartment = async () => {
    let response = await new departmentAPI().getAllDepartment();
    if (response.ok) {
      let tempData = response?.data?.filter(
        (item) => item?.divisionId == user?.divisionId
      );
      setDepartments(tempData);
    } else {
      console.log("err");
    }
  };

  const getAllDivision = async () => {
    let response = await new DivisionAPI().getAllDivision();
    if (response?.ok) {
      setDivisions(response?.data);
    }
    console.log("err");
  };

  console.log('allUsers', user)

  return (
    <Container fluid className="main-dashboard">
      <Row className="row-1">
        <Col className="display-total" sm={12} md={6}>
          <div className="total">
            {user?.isOfficeAdmin && <>{userInsideBydivision?.length}</>}
            {user?.isSystemAdmin && <>{usersInSide?.length}</>}
          </div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Inside the Office</span>
          </div>
        </Col>
        <Col className="display-total">
          <div className="total">
            {user?.isSystemAdmin && <> {allUsers?.length - usersInSide?.length} <FontAwesomeIcon icon={faRoute} /> </>}
            {user?.isOfficeAdmin && <> {userByDivision?.length - userInsideBydivision?.length} <FontAwesomeIcon icon={faRoute} />  </>}
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
                See all
              </span>
            </span>
            <div className="departments">
              {divisions?.slice(0, 3)
              .map((item) => {
                return (
                  <div className="icon-holder">
                    <img className="icons" src={CID} alt="" />
                    <span className="titles">{item?.divisionName}</span>
                  </div>
                );
              })}
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
                See all
              </span>
            </span>
            <div className="table-div">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Office ID</th>
                    <th>Office</th>
                    <th>Office Description</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((item) => {
                    return (
                      <tr key={item?.id}>
                        <td>{item?.id}</td>
                        <td>{item?.departmentName}</td>
                        <td>{item?.departmentDescription}</td>
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
