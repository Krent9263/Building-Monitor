import React, { useContext, useEffect, useState } from "react";
import {Badge, Row, Col, Container, Table, Button } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import { useHistory } from "react-router-dom";
import ReportsHeader from "./components/ReportsHeader"
import FilterModal from "./components/FilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import ReportAPI from "../../api/ReportAPI";
import departmentAPI from "../../api/DepartmentAPI";
import DivisionAPI from "../../api/DivisionAPI";
import moment from "moment/moment";
import * as XLSX from 'xlsx';



function Reports() {
  const userContext = useContext(UserContext);
  const { user } = userContext.data
  const history = useHistory();
  const [showFilterModal, setShowFilterModal] = useState();

  const [divisionId, setDivisionId] = useState(null)
  const [departmentId, setDepartmentId] = useState(null)
  const [logsByDivisions, setLogsByDivisions] = useState()

  const [departments, setDepartments] = useState()
  const [departmentsPersonnel, setDepartmentsPersonnel] = useState()


  const [divisions, setDivisions] = useState()

  const [today, setTOday] = useState(new Date().toISOString().split('T')[0])

  const [filter, setFilter] = useState(false)


  const handleViewOffice = () => {
    history.push("/divisions/office/employees");
  };

  const handleClose = () => {
    setShowFilterModal(false);
    setFilter(false)
    setDivisionId(null)
    setDepartmentId(null)
  }

  useEffect(() => {
    getAllDepartment()
  }, [divisionId])

  useEffect(() => {
    getAllDivision()
    getAllDepartmentPersonnel()
  }, [])

  const getLogByDivision = async (divisionId) => {
    let res = await new ReportAPI().getLogByDivision(divisionId)
    if (res.ok) {
      // const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      // const logsToday = res.data.filter(log => log.createdDate.split('T')[0] === today);
      setLogsByDivisions(res.data)
      handleClose()
      // console.log('Logs for today:', logsToday);
    } else {
      // alert('err')
    }
  }

  const getAllDepartment = async () => {
    let res = await new departmentAPI().getAllDepartment()
    if (res.ok) {
      let tempData = res?.data?.filter(i => i?.divisionId == divisionId)
      setDepartments(tempData)
      console.log('temp', tempData)
    } else {
      // alert('err')
    }
  }

  const getAllDepartmentPersonnel = async () => {
    let res = await new departmentAPI().getAllDepartment()
    if (res.ok) {
      let tempData = res?.data?.filter(i => i?.divisionId == user?.divisionId)
      setDepartmentsPersonnel(tempData)
      console.log('temp', tempData)
    } else {
      // alert('err')
    }
  }

  const getAllDivision = async () => {
    let res = await new DivisionAPI().getAllDivision()
    if (res?.ok) {
      setDivisions(res?.data)
    } else {
      // alert('err')
    }
  }
  
  const getLogByDivisionAndDepartment = async (divisionId, departmentId) => {
    let res = await new ReportAPI().getLogByDivisionAndDepartment(divisionId, departmentId)
    if(res.ok){
      setLogsByDivisions(res?.data)
      handleClose()
    }else{
    }
  }

  

const exportToExcel = () => {

  const table = document.querySelector('table');


  const wb = XLSX.utils.table_to_book(table);

  const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });


  const saveAs = (blob, fileName) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
  };


  const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
  };


  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'data.xlsx');
};


  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="reports">
            <ReportsHeader user={user} setFilter={setFilter} setShowFilterModal={setShowFilterModal} exportToExcel={exportToExcel} />
            <FilterModal
              departmentsPersonnel={departmentsPersonnel}
              handleClose={handleClose}
              getLogByDivisionAndDepartment={getLogByDivisionAndDepartment}
              setTOday={setTOday}
              setFilter={setFilter}
              filter={filter}
              getLogByDivision={getLogByDivision}
              divisionId={divisionId}
              departmentId={departmentId}
              setDepartmentId={setDepartmentId}
              setDivisionId={setDivisionId}
              divisions={divisions}
              departments={departments}
              showFilterModal={showFilterModal}
              setShowFilterModal={setShowFilterModal}
              user={user}
            />
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Division</th>
                    <th>Office</th>
                    <th>Time in</th>
                    <th>Time out</th>
                    <th >Date</th>
                  </tr>
                </thead>
                <tbody>
                  {logsByDivisions
                    ?.filter(log => log.createdDate.split('T')[0] === today)
                    ?.map(item => {
                      return (
                        <tr style={{textAlign:'center' }}  >
                          <td>{item?.employeeIdNumber}</td>
                          <td>{item?.firstName} {item?.lastName}</td>
                          <td>{item?.divisionName}</td>
                          <td>{item?.departmentName}</td>
                          <td>{ <Badge bg="success">{moment(item?.timeId).format("h:mm a")}</Badge>}</td>
                          <td>{item?.timeOut === null ? <><Badge bg="danger">No Time Out</Badge></>:<><Badge bg="success">{moment(item?.timeOut).format("h:mm a")}</Badge></>}</td>
                          <td>{moment(item?.createdDate).format("MMMM DD YYYY")}</td>
                        </tr>
                      )
                    })}
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
