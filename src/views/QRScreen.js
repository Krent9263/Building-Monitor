import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import IN from "../assets/images/icons/arrow-in.svg";
import OUT from "../assets/images/icons/arrow-out.svg";
import User from "../assets/images/icons/user-solid.svg";
import Check from "../assets/images/icons/circle-check-in.svg";
import Checkout from "../assets/images/icons/circle-check-out.svg";
import useScanDetection from 'use-scan-detection';
import QrCodeAPI from "../api/QrCodeAPI";
import Auth from "../api/Auth";
import moment from "moment";
import { toast } from 'react-toastify';



function QRScreen() {

  const [qrCode, setQrCode] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [allUsers, setAllUsers] = useState()
  const [allUsersLog, setAllUsersLog] = useState()
  const [filteredData, setFilteredData] = useState([]);
  const [usersInSide, setUsersInSide] = useState()
  const [usersOutSide, setUsersOutSide] = useState()

  const dateCompareNow = moment().format('MMMM DD YYYY h:mm a')


  useEffect(() => {
    if (qrCode !== null)
      return (
        qrCodeScanner(),
        setQrCode(null)
      )
  }, [qrCode])

  useEffect(() => {
    getLogStatus(allUsers)
    getAllUsers()
  }, [allUsers])

  useScanDetection({
    onComplete: setQrCode,
  })


  const qrCodeScanner = async () => {
    let data = {
      "deviceId": 1,
      "qrCode": qrCode
    }
    let res = await new QrCodeAPI().qrCodeScanner(data)
    if (res.ok) {
      if (res?.data?.status === true) {
        setUserInfo(res.data)
        getLogStatus(allUsers)
        toast.success('Successfully Login!', {
          position: "top-center",
          autoClose: 5000,
        });
        console.log('allUsers:', res.data)
      } else {
        setUserInfo(res.data)
        getLogStatus(allUsers)
        toast.success('Successfully Logout!', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } else {
      toast.warning('Wrong QRCODE please Contact Admin!', {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }

  const getAllUsers = async () => {
    let res = await new Auth().getAllUsers()
    if (res.ok) {
      console.log('res.data:', res.data);

      setAllUsers(res.data)
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
    }
  }

  return (
    <Container fluid>
      <div className="date">{dateCompareNow}</div>
      <div className="qr-screen">
        <Col className="display" sm={12} md={12} lg={8} xl={8}>
          <div className="id">
            <div className="img-holder">
              <img className="img" src={User} alt="" />
            </div>
            {userInfo != null ?
              <div className="details-holder">
                <div className="name">{userInfo?.firstName} {userInfo?.lastName}</div>
                <div className="office">{userInfo?.divisionName}</div>
                <div className="department">
                  {userInfo?.departmentName}
                </div>
              </div> :
              <div className="details-holder">
                <div className="name">Please Scan Your QRcode</div>
                <div className="office"></div>
                <div className="department">
                </div>
              </div>
            }

          </div>
        </Col>

        <Col className="display-history">
          <div className="in">
            <span className="header">
              <img className="icon" src={IN} alt="" /> <h3>In Scan:</h3>{" "}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {usersInSide
                ?.sort((a, b) => b?.id - a?.id)
                ?.slice(0, 3)
                ?.map((item) => {
                  return (
                    <div className="users mt-2">
                      <div className="column1">
                        <div className="frame">
                          <img className="user-img" src={User} alt="" />
                        </div>
                      </div>
                      <div className="column2">
                        <span>{item?.firstName} {item?.lastName}</span>
                        <span className="department">{moment(item?.createdDate).format("MMMM DD YYYY h:mm a")}</span>

                      </div>
                      <div className="column3">
                        <img className="check-img" src={Check} alt="" />
                        <span className="success">Inside</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="in">
            <span className="header">
              <img className="icon" src={OUT} alt="" /> <h3>Out Scan:</h3>{" "}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {usersOutSide
                ?.sort((a, b) => b?.id - a?.id)
                ?.slice(0, 3)
                ?.map((item) => {
                  return (
                    <div className="users mt-2">
                      <div className="column1">
                        <div className="frame">
                          <img className="user-img" src={User} alt="" />
                        </div>
                      </div>
                      <div className="column2">
                        <span>{item?.firstName} {item?.lastName}</span>
                        <span className="department">{moment(item?.updatedDate).format("MMMM DD YYYY h:mm a")}</span>
                      </div>
                      <div className="column3">
                        <img className="check-img" src={Checkout} alt="" />
                        <span className="failed">Outside</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </div>
    </Container>
  );
}

export default QRScreen;
