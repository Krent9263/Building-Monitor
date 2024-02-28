import Base from './Base';

export default class ReportAPI extends Base {
  getLogByDivision = async (id) => {
    return this.sendRequest({
      path:`/api/DeviceLog/${id}/device`,
      method: 'GET'
    })
  }

  getLogByDivisionAndDepartment = async (divisionId, departmentId) => {
    return this.sendRequest({
      path: `/api/DeviceLog/${divisionId}/division/${departmentId}/department`,
      method: 'GET'
    })
  }

}