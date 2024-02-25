import Base from './Base';

export default class UserAccountAPI extends Base {
  createUserAccount = async (data) => {
    return this.sendRequest({
      path: `/api/User`,
      method: 'POST',
      data
    })
  }


}