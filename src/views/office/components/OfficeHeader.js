import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../context/UserContext";

function OfficeHeader({ setShowCreateModal, division }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();

  const handleBackButton = () => {
    history.push("/divisions");
  };

  const handleCreateOffice = () => {
    setShowCreateModal(true);
  };

  return (
    <div>
      <h1 className="dept-name">{division?.divisionName} Offices</h1>
      <div className="reports-header">
        {user?.isSystemAdmin || user?.isOfficeAdmin && (user?.departmentId === 12 || user?.departmentId === 27) ? (
          <div>
            <Button onClick={handleBackButton}>
              <FontAwesomeIcon icon={faArrowLeftLong} /> Back
            </Button>
            &nbsp;
          </div>
        ) : (
          <></>
        )}
        {user?.isOfficeAdmin ? (
          <></>
        ) : (
          <div className="btn-group-header">
            <Button className="btn-r" onClick={handleCreateOffice}>
              Create Office
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficeHeader;
