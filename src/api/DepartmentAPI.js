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

}