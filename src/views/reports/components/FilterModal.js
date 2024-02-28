import React, { useContext } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";

function FilterModal({
  showFilterModal,
  handleClose, user,
  getLogByDivision,
  departments,
  divisions,
  setDivisionId,
  setDepartmentId,
  departmentId,
  divisionId,
  filter,
  setFilter,
  setTOday,
  getLogByDivisionAndDepartment,
  departmentsPersonnel
}) {

  console.log('USER:', user)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user?.isSystemAdmin === true) {
      if (departmentId === null && divisionId !== null) {
        return (
          getLogByDivision(divisionId)
        )
      } else {
        getLogByDivisionAndDepartment(divisionId, departmentId)
      }
    } else {
      if (departmentId === null) {
        
        return (
          
          getLogByDivision(user?.divisionId)
        )
      } else {
        
        getLogByDivisionAndDepartment(user?.divisionId, departmentId)
      }

    }

  }

  return (
    <>
      <Modal
        show={showFilterModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Report</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {filter === false ?
              <Row>
                {user?.isSystemAdmin === true ?
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Division">
                      <Form.Select aria-label="Floating label select example" value={divisionId} onChange={(e) => setDivisionId(parseInt(e.target.value))}>

                        <option selected disabled>
                          Choose an option
                        </option>
                        {divisions?.map(item => {
                          return (
                            <option key={item.id} value={item?.id}>{item?.divisionName}</option>
                          )
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  :
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Division">
                      <Form.Select aria-label="Floating label select example" value={user?.divisionId} onChange={(e) => setDivisionId(parseInt(e.target.value))}>

                        <option selected disabled value={user?.divisionId}>
                          {user?.divisionName}
                        </option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>}
                {user?.isSystemAdmin === true ? <Col>
                  <FloatingLabel controlId="floatingSelect" label="Office">
                    <Form.Select aria-label="Floating label select example" value={departmentId} onChange={(e) => setDepartmentId(parseInt(e.target.value))} >
                      <option selected value={null}>
                        Choose an option
                      </option>
                      {departments?.map(item => {
                        return (
                          <option value={item?.id}>{item?.departmentName}</option>
                        )
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </Col> : <Col>
                  <FloatingLabel controlId="floatingSelect" label="Office">
                    <Form.Select aria-label="Floating label select example" value={departmentId} onChange={(e) => setDepartmentId(parseInt(e.target.value))} >
                      <option selected value={null}>
                        Choose an option
                      </option>
                      {departmentsPersonnel?.map(item => {
                        return (
                          <option value={item?.id}>{item?.departmentName}</option>
                        )
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </Col>}
              </Row>
              :
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingSelect" label="Date">
                    <Form.Control type="date" onChange={(e) => setTOday(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
            }
          </Modal.Body>
          <Modal.Footer>
            {filter === false ?
              <Button type="submit" variant="primary">
                Filter
              </Button> : <></>}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FilterModal;
