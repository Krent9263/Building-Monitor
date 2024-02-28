import React, { useContext, useState } from "react";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import { useHistory } from "react-router-dom";
import ReportsHeader from "./components/ReportsHeader"
import FilterModal from "./components/FilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";

function Reports() {
  const userContext = useContext(UserContext);
  const { user } = userContext.data
  const history = useHistory();
  const [showFilterModal, setShowFilterModal] = useState();

  const handleViewOffice = () => {
    history.push("/divisions/office/employees");
  };

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <ReportsHeader setShowFilterModal={setShowFilterModal} />
            <FilterModal showFilterModal={showFilterModal} setShowFilterModal={setShowFilterModal} user={user} />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Division</th>
                    <th>Office</th>
                    <th>Status <FontAwesomeIcon icon={faSort} /></th>
                    <th>Date <FontAwesomeIcon icon={faSort} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Juan Dela Cruz</td>
                    <td>4568457</td>
                    <td>SDS</td>
                    <td>Office OF THE PRESIDENT</td>
                    <td>Present</td>
                    <td>April 1, 2024</td>
                    {/* <td className="act-grp-btn">
                      <Button variant="primary">
                        View
                      </Button>
                      <Button variant="primary">Edit</Button>
                      <Button variant="primary">Delete</Button>
                    </td> */}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Reports;
