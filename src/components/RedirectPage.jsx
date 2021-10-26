import React from "react";
import { Route, Redirect } from "react-router-dom";

class RedirectPage extends React.Component {
  constructor() {
    super();

    this.state = {
      redirectLink: ''
    }
  }

  componentDidMount() {
    this.getRedirectLink().then(result => {
        this.setState({
           redirectLink: result
    }, () => {
      console.log(this.state.redirectLink);
      });
   })
  }

  async getUserInfo() {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      }
  async setUserInfo() {
        let  clientPrincipal =  await this.getUserInfo();
        console.log(clientPrincipal);
        return clientPrincipal.userRoles;
      }
  
  getRedirectLink() {
      let userRole = this.setUserInfo();
      console.log(userRole);
      var link = null;
      return userRole.then(
        (result) => {
              console.log(result);
              for (let i=0; i < result.length; i++) {
                if (result[i] == 'contributor') {
                  console.log(result[i]);
                  link = "/operatorviewer";
                  return link;
                } else if (result[i] == 'reader') {
                  console.log(result[i]);
                  link = "/clinicianviewer";
                  return link;
                }
              }
            },
        (error) => {
              console.log(error);
            }
         )
      }

  render() {
    if(this.state.redirectLink == '')
      return null;
    
    console.log(this.state.redirectLink);
    return <Redirect to= {this.state.redirectLink} />
  }
 }
export default RedirectPage;
