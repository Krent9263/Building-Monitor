import "../assets/index.scss";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./dashboard/Header";
import MainDashboard from "./dashboard/MainDashboard";
import History from "./dashboard/History";
import SideBar from "../components/SideBar";
import moment from "moment";
import QrCodeAPI from "../api/QrCodeAPI";
import Auth from "../api/Auth";

function Home() {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const [usersInSide, setUsersInSide] = useState();
  const [usersOutSide, setUsersOutSide] = useState();
  const [userByDivision, setUserByDivision] = useState();
  const [allUsers, setAllUsers] = useState();
  const [userInsideBydivision, setUserInsideByDivision] = useState()

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLogStatus(allUsers, userByDivision);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [allUsers]);

  useEffect(() => {
    getLogStatus(allUsers, userByDivision);
  }, [allUsers]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let res = await new Auth().getAllUsers();
    if (res.ok) {
      console.log("res.data:", res.data);
      setAllUsers(res.data);
      let temp = res.data.filter((i) => i?.divisionId === user?.divisionId);
      setUserByDivision(temp)
    } else {
      console.log("err");
    }
  };

  const getLogStatus = async (data, data2) => {
    let res = await new QrCodeAPI().getRecentLog();
    if (res.ok) {
      console.log("data:", data);
      let tempDataInSide = [];
      let tempDataInOutSide = [];
      data?.map((item) => {
        let tempInSide = res?.data?.find(
          (i) => i?.userAccountId == item?.id && i?.status == true
        );
        let tempOutSide = res?.data
          ?.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate))
          ?.find((i) => i?.userAccountId == item?.userAccountId && i?.status == false);
        if (tempInSide !== undefined) {
          return tempDataInSide.push(tempInSide);
        }
        if (tempOutSide !== undefined) {
          return tempDataInOutSide.push(tempOutSide);
        }
      });

      console.log('data2:', res?.data)

      let tempDataByDivision = []
      data2?.map(item => {
        let tempByDivisionInside = res?.data?.find(i => i?.userAccountId == item?.userAccountId && i?.status == true && i?.departmentId == user?.departmentId)
        if (tempByDivisionInside !== undefined) {
          return tempDataByDivision.push(tempByDivisionInside)
        }
      })
      setUserInsideByDivision(tempDataByDivision)
      setUsersInSide(tempDataInSide);
      setUsersOutSide(tempDataInOutSide);
    } else {
      console.log("err");
    }
  };

  console.log('USER:', user)

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <MainDashboard userInsideBydivision={userInsideBydivision} allUsers={allUsers} usersInSide={usersInSide} userByDivision={userByDivision} />
        </Col>
        <Col className="right-history" sm={12} md={12} lg={12} xl={3}>
          <History usersInSide={usersInSide} usersOutSide={usersOutSide} user={user} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
