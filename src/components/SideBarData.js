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

export const SideBarData = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHouse} />
  },
  {
    title: "Departments",
    icon: <FontAwesomeIcon icon={faSitemap} />,
    iconClosed: <FontAwesomeIcon icon={faAngleDown} />,
    iconOpened: <FontAwesomeIcon icon={faAngleUp} />,
    subNav: [
      {
        title: "Department 1",
        path: "/",
        icon: <span>&#9900;</span>,
      },
      {
        title: "Department 2",
        path: "/",
        icon: <span>&#9900;</span>,
      },
      {
        title: "Department 3",
        path: "/collegedepartment",
        icon: <span>&#9900;</span>,
      }
    ],
  },
  {
    title: "Reports ",
    path: "/employee",
    icon: <FontAwesomeIcon icon={faTable} />
  },
  {
    title: "QR Screen ",
    path: "/qrscreen",
    icon: <FontAwesomeIcon icon={faQrcode} />
  },
  {
    title: "Log out",
    path: "/",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />
  },
];
