import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faHouse,
  faTable,
  faSitemap,
  faQrcode,
  faRightFromBracket,
  faDisplay
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
    path: "/reports",
    icon: <FontAwesomeIcon icon={faTable} />
  },
  {
    title: "QR Generator ",
    path: "/qrcode",
    icon: <FontAwesomeIcon icon={faQrcode} />
  },
  {
    title: "QR Screen",
    path: "/qrscreen",
    icon: <FontAwesomeIcon icon={faDisplay} />
  },
  // {
  //   title: "Log out",
  //   path: "/",
  //   icon: <FontAwesomeIcon icon={faRightFromBracket} />
  // },
];
