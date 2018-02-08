import React, { Component } from "react";
import { Navbar } from "./Components/Navbar/Navbar.js";
import { Tabs } from "./Components/Menu/Tabs";
import Stats from "./Components/Views/Stats";
import Login from "./Components/Login_Page/Login";
import Vas from "./Components/Views/Vas";
import BookingHistory from "./Components/Views/BookingHistory";
import Main from "./Components/Views/Main";
import "./Admin.css";

class Admin extends Component {
  render() {
    return (
      
        <div className="col l12 m12 s12" id="background">
          <Main />
          
        </div>
      
    );
  }
}

export default Admin;
// <i class=" small material-icons right">more_horiz</i>
