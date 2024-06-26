import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  faBars,
  faTimes,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import SDC from "../assets/images/SDC.png";
import { UserContext } from "../context/UserContext";

const Nav = styled.div`
  background: #68942c;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;

  &:hover {
    color: #fff;
  }
`;

const CloseIcon = styled(NavIcon)`
  position: absolute;
  right: 1rem;
  top: -5rem;
`;

const SidebarNav = styled.nav`
  background: #68942c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sideBar }) => (sideBar ? "0" : "-100%")};
  transition: 700ms ease-in;
  transition: 700ms ease-out;
  z-index: 1000;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
  position: relative;
  margin-top: 5rem;
`;

const SideBar = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);
  const closeSideBar = () => setSideBar(false);

  const logout = async () => {
    await window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <FontAwesomeIcon icon={faBars} onMouseEnter={showSideBar} />
        </NavIcon>
        <span className="logout" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> <span>Logout</span>
        </span>
      </Nav>
      <SidebarNav sideBar={sideBar} onMouseLeave={closeSideBar}>
        <SidebarWrap className="school-wrap">
          <img src={SDC} height="90" className="school-logo" />
          <CloseIcon to="#">
            <FontAwesomeIcon icon={faTimes} onClick={closeSideBar} />
          </CloseIcon>
          <p className="school-name">PROJECT IN OUT</p>
          <hr />
          {SideBarData.map((item, index) => {
            switch (index) {
              case 1:
                if (
                  user?.isOfficeAdmin &&
                  user?.departmentId !== 12 &&
                  user?.departmentId !== 27
                ) {
                  return null;
                }
                break;
              case 3:
                if (user?.isOfficeAdmin && user?.departmentId != 12) {
                  return null;
                }
                break;
              case 2:
                if (user?.isOfficeAdmin && user?.roleId != 4) {
                  return null;
                }
                break;
              case 4:
                if (!user?.isSystemAdmin) {
                  return null;
                }
                break;
            }
            return (
              <SubMenu item={item} key={index} closeSideBar={closeSideBar} />
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default SideBar;
