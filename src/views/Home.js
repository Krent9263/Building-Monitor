import "../assets/index.scss";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./dashboard/Header";
import MainDashboard from "./dashboard/MainDashboard";
import History from "./dashboard/History";
import SideBar from "../components/SideBar";
import moment from "moment";
import QrCodeAPI from "../api/QrCodeAPI";
import Auth from "../api/Auth";

function Home() {
  
  const [usersInSide, setUsersInSide] = useState()
  const [usersOutSide, setUsersOutSide] = useState()

  const [allUsers, setAllUsers] = useState()

  useEffect(() => {
    getLogStatus(allUsers)
    getAllUsers()
  }, [])


  const getAllUsers = async () => {
    let res = await new Auth().getAllUsers()
    if (res.ok) {
      console.log('res.data:', res.data);

      setAllUsers(res.data)
    }else{
      console.log('err')
    }
  }

  const getLogStatus = async (data) => {
    let res = await new QrCodeAPI().getRecentLog()
    if (res.ok) {
      console.log('data:', data)
      let tempDataInSide = []
      let tempDataInOutSide = []
      data?.map(item => {

        let tempInSide = res?.data
          ?.find(i => i?.userAccountId == item?.id && i?.status == true);
        let tempOutSide = res?.data?.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate))?.find(i => i?.userAccountId == item?.id && i?.status == false)
        if (tempInSide !== undefined) {
          return tempDataInSide.push(tempInSide)
        }
        if (tempOutSide !== undefined) {
          return tempDataInOutSide.push(tempOutSide)
        }
      })
      console.log('tempDataInSide:', tempDataInSide)
      setUsersInSide(tempDataInSide)
      setUsersOutSide(tempDataInOutSide)
    } else {
      console.log('err')
    }
  }


  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <MainDashboard />
        </Col>
        <Col className="right-history" sm={12} md={12} lg={12} xl={3}>
          <History usersInSide={usersInSide} usersOutSide={usersOutSide} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
