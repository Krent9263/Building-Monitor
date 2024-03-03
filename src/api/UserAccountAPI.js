import Base from './Base';

export default class UserAccountAPI extends Base {
  createUserAccount = async (data) => {
    return this.sendRequest({
      path: `/api/User`,
      method: 'POST',
      data
    })
  }
  getAllUserAccountByDivisionIdAndOfficeId = async (departmentId, divisionId) => {
    return this.sendRequest({
      path: `/api/User/${departmentId}/department/${divisionId}/division`,
      method: 'GET'
    })
  }

  updateUserAccount = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}`,
      method: 'PUT',
      data
    })
  }

  deleteUserAccount = async (id) => {
    return this.sendRequest({
      path: `/api/User/${id}`,
      method: 'DELETE'
    })
  }

  uploadEmployees = async (data) => {
    return this.sendRequest({
      path: `/api/User/uploadEmployeeViaExcel`,
      method: 'POST',
      data
    })
  }

  uploadEmployeeProfile = async (id, data) => {
    return this.sendRequest ({
      path: `/api/User/${id}/uploadimage`,
      method: 'PUT',
      data
    })
  }

  getLogginPerDepartmentPerUser = async () => {
    return this.sendRequest ({
      path: `/api/DeviceLog/logginPerDeparmentByLoginUser`,
      method: 'GET'
    })
  }

  getAllUsers = async () => {
    return this.sendRequest ({
      path: `/api/User`,
      method: 'GET'
    })
  }

  changePassword = async (userAccountId, data) =>{
    return this.sendRequest({
      path:`/api/User/${userAccountId}/changepassword`,
      method: 'PUT',
      data
    })
  }

}