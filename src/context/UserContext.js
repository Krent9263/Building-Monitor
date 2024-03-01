import React, {Component} from 'react';
import Auth from '../api/Auth';


export const UserContext = React.createContext();
export class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      loading: true,
    };
    this.connection = React.createRef();
  }

  refreshUser = async () => {
    await this.setState({loading: true})
    let response = await new Auth().profile()
    if(response.ok) {
      let user = response?.data
      console.log('res', response?.data) 

      user.role = user?.roleName || user?.roleId
      switch (user.role) {
        case "Administrator":
          user.userAccountId = user.userAccountId
          user.firstName =  user?.firstName
          user.isSystemAdmin = true
          break;
          case "Office Admin":
            user.userAccountId = user.userAccountId
            user.firstName =  user?.firstName
            user.isOfficeAdmin = true
            break;
            case "Front Desk Personel":
              user.userAccountId = user.userAccountId
              user.firstName =  user?.firstName
              user.isFrontDesk= true
              break;
        default:
          user.name = 'No name'
          break;
      }

      await this.setState({loading: false, user})
    } else  {
      await this.setState({ loading: false, user: null})
    // Admin
      // const id = localStorage.getItem("id")
      // let response = await new Auth().profileAdmin(id)

      // if (response.ok) {
      //   let user = response?.data

      //   user.name = `${user.first_name} ${user.middle_name}`
      //   user.isAssessment_status = window.localStorage.getItem('assessment_status');
      //   user.isAdmin = true
      //   await this.setState({loading: false, user})
      // }else{
      //   await this.setState({loading: false, user: null})
      // }
    }
  };

  // setLoading = (loading) => {
  //   this.setState({loading});
  // };

  render() {
    const {children} = this.props;
    const {
      user,
      loading
    } = this.state;
    return (
      <UserContext.Provider
        value={{
          data: {
            user,
            loading,
            refreshUser: this.refreshUser
          },
        }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
