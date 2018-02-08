import React, { Component } from "react";
import {baseurl} from '../../../app/services/Baseurl';
import FullScreenSpinner from '../../../app/main/RoundTripBooking/spinner/js/FullScreenSpinner';
import './style.css'
class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      fetching:true
    };
  }
  componentWillMount() {
    fetch("http://gotripwtapi.azurewebsites.net/user/all")
      .then(val => val.json())
      .then(val => {
        this.setState({ user: val });
        this.setState({fetching:false});
      });
  }

  promoteuser(e, val) {
    this.setState({fetching:true})
    let details = "";
    let admin="admin";
    let superadmin ="superadmin";
    var item = localStorage.getItem("admindata");
    let role = JSON.parse(item)[0].role;
    console.log(role);

    if (role == "superadmin") {
      if (val.role == "admin") {
          console.log('1');
        details = {
          role: superadmin
        };
      }
      if (val.role == "user") {
          console.log('2');
        details = {
          role: admin
        };
      }
    } 
    
    else {
      if (role == "admin") {
        if (val.role == "user") {
            console.log('3');
          details = {
            role: admin
          };
        }
      }
    }

    let urlpost =
      "http://gotripwtapi.azurewebsites.net/user/upgrade/" + val.email;
    fetch(urlpost, {
      method: "PUT",
      body: JSON.stringify(details),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {console.log("Success:", response);
      this.componentWillMount();
    });
    console.log("upgrade");
    console.log(val.email);
 
 
  }

  demoteuser(e,val) {
    this.setState({fetching:true});
    let details ="";
    let admin="admin";
    let user ='user';
    var item = localStorage.getItem("admindata");
    let role = JSON.parse(item)[0].role;
    console.log(role);

    if (role == "superadmin") {
      if (val.role == "admin") {
          console.log('1');
        details = {
          role: 'user'
        }
      }
     
    } 
    
    

    let urlpost =
     "http://gotripwtapi.azurewebsites.net/user/upgrade/" + val.email;
    fetch(urlpost, {
      method: "PUT",
      body: JSON.stringify(details),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {console.log("Success:", response);
    this.componentWillMount();
  });
    

      
  }
  render() {
    // console.log(this.state.user);
    return (
      <div class="row" id="background" style={{ margin: "0", padding:20}}>

        {(!this.state.fetching)?<div> 
        {this.state.user.map((val, index) => {
          return (
            
    <div class="col s12 m4 l2" style={{padding:"20px"}}>
      <div class="card hoverable">
        <div class="card-image">
        {console.log(val.profile)}
          <img  id="img" class="responsive-img" style={{height:"240px"}} src={(val.profile=='null')?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpt7qY-enyS3zEcwPFrjFN_lImWGkoKuJZrzLWzAFvwL78BoSS4A":val.profile}/>
         
          
          
        </div>
        <div class="card-content">
           <span class="col s12 m12 l12 center"><b>{val.role}</b></span>
           <p className="center" style={{fontSize:"0.8em"}}>{val.email}</p>
          
        </div>
        <div  class="card-action white-text" style={{padding: "0"}}>
          <div class="row center" style={{margin: "0"}}>
          <div id='tap' class="col l6 m6 s6"><h6 style={{cursor: "pointer"}} onClick={event => {this.promoteuser(event, val);}}><b>Promote</b></h6></div>
          <div  id='tap' class="col l6 m6 s6"><h6  style={{cursor: "pointer"}} onClick={event => {this.demoteuser(event, val);}}><b>Demote</b></h6></div>
          </div>
        </div>
      </div>
  
  </div>
            
          );
        })}
        </div>
:<FullScreenSpinner/>}

      </div>
    );
  }
}
export default AddAdmin;
