import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import $ from "jquery";
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }
  adminLogout = () => {
    localStorage.removeItem("admindata");
    localStorage.clear();
    document.location.reload(true);
  };

  componentDidMount() {
    $(document).ready(function() {
      $(".dropdown-button").dropdown({
        hover: false, // Activate on hover
        belowOrigin: true, // Displays dropdown below the button
        alignment: "left" // Displays dropdown with edge aligned to the left of button
      });

      $(".button-collapse").sideNav();
    });
    $(".modal").modal("close");
  }
  componentWillMount() {
    this.checkLogin();
  }
  checkLogin = () => {
    var item = localStorage.getItem("admindata");
    console.log(item);
    if (item != null) {
      this.setState({ login: true });
    }
  };
  render() {
    if (!this.state.login) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
       
        <nav className="indigo darken-4">
    <div class="nav-wrapper z-depth-2">
      <Link to="/admin" class="brand-logo">GoTrip</Link>
      <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><Link to="/admin/admin">Promote/Demote</Link></li>
        <li><Link to="/admin/bookinghistory">Booking History</Link></li>
        <li><Link to="/admin/vas" >VAS</Link></li>
        <li><Link to="/admin/feedback" >Feedback</Link></li>
       
        
        
        <li><a onClick={this.adminLogout}>Logout</a></li>
      </ul>
      <ul class="side-nav" id="mobile-demo">
         <li><Link to="/admin/admin">Promote/Demote Admin</Link></li>
        <li><Link to="/admin/bookinghistory">Booking History</Link></li>
        <li><Link to="/admin/vas" >VAS</Link></li>
        <li><Link to="/admin/feedback" >Feedback</Link></li>
       
        <li><a onClick={this.adminLogout}>Logout</a></li>
      </ul>
    </div>
  </nav>

      </div>
    );
  }
}

// export default Navbar;
