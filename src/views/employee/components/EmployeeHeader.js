import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";
// import Template from "../../../assets/template/";

function EmployeeHeader({
  setShowBulkUpload,
  setShowAddEmployee,
  addEmployee,
  bulkUpload,
  divisionId,
  departmentInfo,
  officeId,
  user,
}) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push(`/divisions/${divisionId}/office/`);
  };

  const downloadExcel = () => {
    // Data to be converted to Excel
    const data = [
      [
        "username",
        "password",
        "roleid",
        "employeeIdno",
        "FirstName",
        "LastName",
        "MiddleName",
        "EmailAddress",
        "ContactNumber",
        "DepartmentId",
      ],
      // Add your data rows here
    ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a binary XLSX file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the array buffer
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "template.xlsx");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  console.log("departmentInfo", officeId, departmentInfo);

  return (
    <div>
      <h1 className="dept-name">{departmentInfo?.departmentName} Employees</h1>
      <div className="reports-header">
        <div>
          <Button onClick={handleBackButton}>
            <FontAwesomeIcon icon={faArrowLeftLong} /> Back
          </Button>{" "}
          &nbsp;
        </div>
        <div className="btn-group-header">
          {user?.isOfficeAdmin && user?.departmentId === 27 ? (
            <></>
          ) : (
            <>
              <Button className="btn-r" onClick={addEmployee}>
                Create Employee
              </Button>
              <Button onClick={downloadExcel}>Download Template</Button>
              <Button className="btn-r" onClick={bulkUpload}>
                Bulk Upload
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeHeader;
