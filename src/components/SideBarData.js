import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faHouse,
  faTable,
  faSitemap,
  faQrcode,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

const logout = async () => {
  await window.localStorage.clear()
  window.location.href = "/";
}

export const SideBarData = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHouse} />
  },
  {
    title: "Departments",
    path: '/divisions',
    icon: <FontAwesomeIcon icon={faSitemap} />,
    iconClosed: <FontAwesomeIcon icon={faAngleDown} />,
    iconOpened: <FontAwesomeIcon icon={faAngleUp} />,
  },
  {
    title: "Reports ",
    path: "/employee",
    icon: <FontAwesomeIcon icon={faTable} />
  },
  {
    title: "QR Generator ",
    path: "/qrcode",
    icon: <FontAwesomeIcon icon={faQrcode} />
  },
  {
    title: "Log out",
    path: "/",
    icon: <FontAwesomeIcon onClick={() => logout()} icon={faRightFromBracket} />
  },
];
