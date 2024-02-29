import Base from './Base';

export default class DivisionAPI extends Base {
  getAllDivision = async () => {
    return this.sendRequest({
      path: `/api/Division`,
      method: 'GET'
    })
  }

  createDivision = async (data) => {
    return this.sendRequest({
      path: `/api/Division`,
      method: 'POST',
      data
    })
  }

  deleteDivision = async (id) => {
    return this.sendRequest({
      path: `/api/Division/${id}`,
      method:'DELETE'
    })
  }

  updateDivision = async (id, data) => {
    return this.sendRequest({
      path: `/api/Division/${id}`,
      method: 'PUT',
      data
    })
  }

  getDivisionById = async (id) => {
    return this.sendRequest ({
      path: `/api/Division/${id}`,
      method: 'GET'
    })
  }

}