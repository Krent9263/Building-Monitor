import Base from './Base';

export default class Auth extends Base {
  login = async data => {
    return this.sendRequest({
      path: `/api/Login`,
      method: 'POST',
      data,
    });
  };

  profile = async () => {
    return this.sendRequest({
      path: `/api/Login`,
      method:'GET'
    });
  };

  theme = async () => {
    return this.sendRequest({
      path: `/api/School/Theme`,
    });
  };

  getAllUsers = async () => {
    return this.sendRequest({
      path:`/api/User`,
      method: 'GET'
    })
  }
}
