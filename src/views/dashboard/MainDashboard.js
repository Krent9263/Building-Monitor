import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Row, Col, Container, Table, Badge } from "react-bootstrap";
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
import UserAccountAPI from "../../api/UserAccountAPI";

export default function MainDashboard({
  allUsers,
  usersInSide,
  userByDivision,
  userInsideBydivision,
}) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();

  const [departments, setDepartments] = useState();
  const [divisions, setDivisions] = useState();
  const [loggedPerDepartment, setLoggedPerDepartment] = useState();
  const [employeePerOffice, setEmployeePerOffice] = useState([{}]);

  useEffect(() => {
    getAllDepartment();
    getAllDivision();
    // getLogginPerDepartment();
    getLogginPerDepartmentPerUser();
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

  // const getLogginPerDepartment = async () => {
  //   let response = await new departmentAPI().getLogginPerDepartment();
  //   if (response.ok) {
  //     setLoggedPerDepartment(response.data);
  //   } else {
  //     console.error(
  //       "Something went wrong while fetching getLogginPerDepartment"
  //     );
  //   }
  // };

  // const getAllUserAccountByDivisionIdAndOfficeId = async () => {
  //   let response =
  //     await new UserAccountAPI().getAllUserAccountByDivisionIdAndOfficeId(
  //       user?.departmentId,
  //       user?.divisionId
  //     );
  //   if (response.ok) {
  //     setEmployeePerOffice(response?.data);
  //   } else {
  //     console.error("Something went wrong while fetching data");
  //   }
  // };

  const getLogginPerDepartmentPerUser = async () => {
    let response = await new UserAccountAPI().getLogginPerDepartmentPerUser()
    if (response.ok) {
      setEmployeePerOffice(response?.data);
    } else {
      console.error("Something went wrong while fetching data");
    }
  }

  console.log("allUsers", employeePerOffice
);

  return (
    <Container fluid className="main-dashboard">
      <Row className="row-1">
        <Col className="display-total" sm={12} md={6}>
          <div className="total">
            {user?.isOfficeAdmin &&
              user?.departmentId !== 12 &&
              user?.departmentId !== 27 && (
                <>
                  {userInsideBydivision?.length}
                  <FontAwesomeIcon icon={faBuilding} />
                </>
              )}

            {user?.isOfficeAdmin &&
              (user?.departmentId === 12 || user?.departmentId === 27) && (
                <>
                  {usersInSide?.length} <FontAwesomeIcon icon={faBuilding} />
                </>
              )}

            {user?.isSystemAdmin && (
              <>
                {usersInSide?.length} <FontAwesomeIcon icon={faBuilding} />
              </>
            )}
          </div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Inside the Office</span>
          </div>
        </Col>

        <Col className="display-total">
          <div className="total">
            {user?.isSystemAdmin && (
              <>
                {allUsers?.length - usersInSide?.length}
                <FontAwesomeIcon icon={faRoute} />
              </>
            )}

            {user?.isOfficeAdmin &&
              (user?.departmentId === 12 || user?.departmentId === 27) && (
                <>
                  {allUsers?.length - usersInSide?.length}
                  <FontAwesomeIcon icon={faRoute} />
                </>
              )}

            {user?.isOfficeAdmin &&
              user?.departmentId !== 12 &&
              user?.departmentId !== 27 && (
                <>
                  {employeePerOffice?.length - userInsideBydivision?.length}
                  <FontAwesomeIcon icon={faRoute} />
                </>
              )}
          </div>
          <div className="total-text">
            <span>Total Employees</span> <br />
            <span>Outside the Office</span>
          </div>
        </Col>
      </Row>

      {user?.isSystemAdmin ||
      (user?.isOfficeAdmin &&
        (user?.departmentId === 12 || user?.departmentId === 27)) ? (
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
              {divisions?.slice(0, 3).map((item, index) => {
                let src;
                if (item.id === 2) {
                  src = CID;
                } else if (item.id === 3) {
                  src = SGOD;
                } else if (item.id === 1) {
                  src = OSDS;
                }
                return (
                  <div key={index} className="icon-holder">
                    <img className="icons" src={src} alt="" />
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
                {user?.departmentName.toUpperCase()}
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
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeePerOffice?.employeeLoginDetails?.map((item) => {
                    {console.log('HAHAHA:', item?.employeeLoginDetails)}
                    return (
                      <tr>
                        <td>ID</td>
                        <td>{item.employeeName}</td>
                        <td><Badge>Inside</Badge></td>
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
