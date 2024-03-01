import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DvisionHeader({ setShowCreateModal, handlePersonnelModal }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const history = useHistory();

  const handleBackButton = () => {
    history.push("/home")
  }

  return (
    <div>
      <h1 className="dept-name">DIVISIONS</h1>
      <div className="reports-header">
        <div>
          <Button onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /> Back</Button> &nbsp;
        </div>
        <div className="btn-group-header" style={{ float: "left" }}>
          {/* <Button className="btn-r" onClick={() => handlePersonnelModal()} >
            Add Personnel
          </Button> */}
          {!user?.isOfficeAdmin &&
          <Button className="btn-r" onClick={() => setShowCreateModal(true)}>
            Create Division
          </Button>
          }
        </div>
      </div>
    </div>
  );
}

export default DvisionHeader;
