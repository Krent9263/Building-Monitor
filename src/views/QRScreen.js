import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import IN from "../assets/images/icons/arrow-in.svg";
import OUT from "../assets/images/icons/arrow-out.svg";
import User from "../assets/images/icons/user-solid.svg";
import Check from "../assets/images/icons/circle-check-in.svg";
import Checkout from "../assets/images/icons/circle-check-out.svg";
import useScanDetection from "use-scan-detection";
import QrCodeAPI from "../api/QrCodeAPI";
import Auth from "../api/Auth";
import moment from "moment";
import { toast } from "react-toastify";

function QRScreen() {
  const [qrCode, setQrCode] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState();
  const [allUsersLog, setAllUsersLog] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [usersInSide, setUsersInSide] = useState();
  const [usersOutSide, setUsersOutSide] = useState();

  const dateCompareNow = moment().format("h:mm A | MMMM DD YYYY");

  useEffect(() => {
    if (qrCode !== null) return qrCodeScanner(), setQrCode(null);
  }, [qrCode]);

  useEffect(() => {
    getLogStatus(allUsers);
  }, [allUsers]);

  useEffect(() => {
    getAllUsers();
  }, [])

  useScanDetection({
    onComplete: setQrCode,
  });

  const qrCodeScanner = async () => {
    let data = {
      deviceId: 1,
      qrCode: qrCode,
    };
    let res = await new QrCodeAPI().qrCodeScanner(data);
    if (res.ok) {
      if (res?.data?.status === true) {
        setUserInfo(res.data);
        getLogStatus(allUsers);
        toast.success("Successfully Login!", {
          position: "top-center",
          autoClose: 5000,
        });
        console.log("allUsers:", res.data);
      } else {
        setUserInfo(res.data);
        getLogStatus(allUsers);
        toast.success("Successfully Logout!", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } else {
      toast.warning("Wrong QRCODE please Contact Admin!", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const getAllUsers = async () => {
    let res = await new Auth().getAllUsers();
    if (res.ok) {
      console.log("res.data1:", res.data?.length);

      setAllUsers(res.data);
    }
  };

  const getLogStatus = async (data) => {
    let res = await new QrCodeAPI().getRecentLog();
    if (res.ok) {
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
      setUsersInSide(tempDataInSide);
      setUsersOutSide(tempDataInOutSide);
      console?.log("res.data1", allUsers?.length - tempDataInSide?.length);
    } else {
    }
  };

  console.log('userOUTSIDE', usersOutSide)

  return (
    <Container fluid>
      <Row className="qr-screen">
        <Row>
          <Col>
            <h2 className="date">{dateCompareNow}</h2>
          </Col>
        </Row>
        <Col sm={12} md={12} lg={8} xl={8}>
          <div className="display">
            <div className="id">
              <div className="img-holder">
                <img className="img" src={userInfo?.profileImage === null ? User : userInfo?.profileImage} alt="" />
              </div>
              {userInfo != null ? (
                <div className="details-holder">
                  <div className="name">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </div>
                  <div className="office">{userInfo?.divisionName}</div>
                  <div className="department">{userInfo?.departmentName}</div>
                </div>
              ) : (
                <div className="details-holder">
                  <div className="name">Please Scan Your QR Code</div>
                  <div className="office"></div>
                  <div className="department"></div>
                  {/* <Button onClick={qrCodeScanner}>123</Button> */}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col className="display-history" sm={12} md={12} lg={4} xl={4}>
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
              {usersInSide && usersInSide.length > 0 ? (
                usersInSide
                  .sort((a, b) => b?.id - a?.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div className="users mt-2">
                      <div className="column1">
                        <div className="frame">
                          <img className="user-img" src={usersInSide?.profileImage} alt="" />
                        </div>
                      </div>
                      <div className="column2">
                        <span>
                          {item?.firstName} {item?.lastName}
                        </span>
                        <span className="department">
                          {moment(item?.createdDate).format(
                            "MMMM DD YYYY h:mm a"
                          )}
                        </span>
                      </div>
                      <div className="column3">
                        <img className="check-img" src={Check} alt="" />
                        <span className="success">Inside</span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center">NO EMPLOYEE DATA AVAILABLE</div>
              )}
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
              {usersOutSide && usersOutSide.length > 0 ? (
                usersOutSide
                  .sort((a, b) => b?.id - a?.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div className="users mt-2">
                      <div className="column1">
                        <div className="frame">
                          <img className="user-img" src={usersOutSide?.profileImage} alt="" />
                        </div>
                      </div>
                      <div className="column2">
                        <span>
                          {item?.firstName} {item?.lastName}
                        </span>
                        <span className="department">
                          {moment(item?.updatedDate).format(
                            "MMMM DD YYYY h:mm a"
                          )}
                        </span>
                      </div>
                      <div className="column3">
                        <img className="check-img" src={Checkout} alt="" />
                        <span className="failed">Outside</span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center">NO EMPLOYEE DATA AVAILABLE</div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className="date">{dateCompareNow}</div>
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
      </div> */}
    </Container>
  );
}

export default QRScreen;
