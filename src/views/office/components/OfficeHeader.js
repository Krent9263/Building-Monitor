import React from 'react'
import { Button} from "react-bootstrap";

function OfficeHeader() {
  return (
    <div>
    <div className="dept-name">Division Office</div>
    <div className="reports-header">
      <div >
      </div>
      <div className="btn-group-header" style={{float:'left'}} >
        <Button  className="btn-r" >Create Office</Button>
      </div>
    </div>
  </div>
  )
}

export default OfficeHeader