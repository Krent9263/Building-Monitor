import Base from './Base';

export default class QrCodeAPI extends Base {
  qrCodeScanner = async (data) =>{
    return this.sendRequest({
      path:`/api/DeviceLog`,
      method: 'POST',
      data
    })
  }

  getLogStatus = async () => {
    return this.sendRequest({
      path:`/api/DeviceLog`,
      method: 'GET'
    })
  }

  getRecentLog = async () => {
    return this.sendRequest({
      path:`/api/DeviceLog/recent`,
      method:'GET'
    })
  }

}