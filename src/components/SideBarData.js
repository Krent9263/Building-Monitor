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


export const SideBarData = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHouse} />
  },
  {
    title: "Departments",
    path: '/divisions',
    icon: <FontAwesomeIcon icon={faSitemap} />
  },
  {
    title: "QR Screen",
    path: "/qrscreen",
    icon: <FontAwesomeIcon icon={faDisplay} />
  },
  {
    title: "QR Generator ",
    path: "/qrcode",
    icon: <FontAwesomeIcon icon={faQrcode} />
  },
  {
    title: "Reports ",
    path: "/reports",
    icon: <FontAwesomeIcon icon={faTable} />
  },
];
