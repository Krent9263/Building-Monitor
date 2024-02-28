import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import User from "../../assets/images/icons/user-solid.svg";
import IN from "../../assets/images/icons/arrow-in.svg";
import OUT from "../../assets/images/icons/arrow-out.svg";
import Check from "../../assets/images/icons/circle-check-in.svg";
import Checkout from "../../assets/images/icons/circle-check-out.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonShelter, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import QrCodeAPI from "../../api/QrCodeAPI";
import Auth from "../../api/Auth";
import moment from "moment";

export default function History({usersOutSide, usersInSide}) {


  return (
    <div className="display-history mt-3">
      <div className="container">
        <span className="history-header">
          <FontAwesomeIcon className="logo" icon={faPersonShelter} />
          <span className="h-header-title">In Scan:</span>
        </span>
        {usersInSide
                ?.sort((a, b) => b?.id - a?.id)
                ?.slice(0, 3)
                ?.map((item) => {
          return (
            <div className="teacher">
              <span className="name">
                <img src={User} className="logo" />
                <span className="text-name">
                {item?.firstName} {item?.lastName} <br />
                <span className="department">{moment(item?.createdDate).format("MMMM DD YYYY h:mm a")}</span>
                </span>
              </span>
              <span className="in">
                <img className="logo-in" src={Check} alt="IN" />
                <span>Inside</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="container mt-3">
        <span className="history-header">
          <FontAwesomeIcon className="logo" icon={faArrowRightFromBracket} />
          <span className="h-header-title">Out Scan:</span>
        </span>
        {usersOutSide
                ?.sort((a, b) => b?.id - a?.id)
                ?.slice(0, 3)
                ?.map((item) => {
          return (
            <div className="teacher">
              <span className="name">
                <img src={User} className="logo" />
                <span className="text-name">
                {item?.firstName} {item?.lastName} <br />
                <span className="department">{moment(item?.updatedDate).format("MMMM DD YYYY h:mm a")}</span>
                </span>
              </span>
              <span className="out">
                <img className="logo-in" src={Checkout} alt="OUT" />
                <span>Outside</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
