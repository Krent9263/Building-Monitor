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

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLogStatus(allUsers);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [allUsers]);

  useEffect(() => {
    getLogStatus(allUsers);
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

  console.log("123", userByDivision);

  const getLogStatus = async (data) => {
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
          ?.find((i) => i?.userAccountId == item?.id && i?.status == false);
        if (tempInSide !== undefined) {
          return tempDataInSide.push(tempInSide);
        }
        if (tempOutSide !== undefined) {
          return tempDataInOutSide.push(tempOutSide);
        }
      });
      console.log("tempDataInSide:", tempDataInSide);
      setUsersInSide(tempDataInSide);
      setUsersOutSide(tempDataInOutSide);
    } else {
      console.log("err");
    }
  };

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <MainDashboard allUsers={allUsers} usersInSide={usersInSide} userByDivision={userByDivision} />
        </Col>
        <Col className="right-history" sm={12} md={12} lg={12} xl={3}>
          <History usersInSide={usersInSide} usersOutSide={usersOutSide} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
