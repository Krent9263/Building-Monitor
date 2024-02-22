import React from 'react'
import { Button} from "react-bootstrap";


function DvisionHeader({setShowCreateModal}) {
  return (
    <div>
      <div className="dept-name">Division</div>
      <div className="reports-header">
        <div >
        </div>
        <div className="btn-group-header" style={{float:'left'}} >
          <Button  className="btn-r" onClick={() => setShowCreateModal(true)} >Create Division</Button>
        </div>
      </div>
    </div>
  )
}

export default DvisionHeader