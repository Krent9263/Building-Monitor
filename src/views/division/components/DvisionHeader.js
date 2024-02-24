import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function DvisionHeader({ setShowCreateModal }) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push("/home")
  }

  return (
    <div>
      <div className="dept-name">Division</div>
      <div className="reports-header">
        <div>
          <Button className="btn-r" onClick={handleBackButton}>Back</Button>
        </div>
        <div className="btn-group-header" style={{ float: "left" }}>
          <Button className="btn-r" onClick={() => setShowCreateModal(true)}>
            Create Division
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DvisionHeader;
