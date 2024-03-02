import Base from './Base';

export default class departmentAPI extends Base {
  getAllDepartment = async () => {
    return this.sendRequest({
      path: `/api/Department`,
      method: 'GET'
    })
  }

  deleteDepartment = async (id) => {
    return this.sendRequest({
      path: `/api/Department/${id}`,
      method: 'DELETE'
    })
  }

  createDepartment = async (data) => {
    return this.sendRequest({
      path: `/api/Department`,
      method: 'POST',
      data
    })
  } 

  updateDepartment = async (id, data) => {
    return this.sendRequest({
      path: `/api/Department/${id}`,
      method: 'PUT',
      data
    })
  }

  getDepartmentById = async (id) => {
    return this.sendRequest ({
      path: `/api/Department/${id}`,
      method: 'GET'
    })
  }

  getLogginPerDepartment = async () => {
    return this.sendRequest ({
      path: `/api/DeviceLog/logginPerDeparment`,
      method: 'GET'
    })
  }

}