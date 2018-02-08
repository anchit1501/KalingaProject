import React, { Component } from "react";
import "./Login_Page.css";
// import background from '../../images/login_back.jpg';
class Login extends Component {
  render() {
    return (
      // <div className="row">
      //   <div className="col l6" />
      //   <div className="col l6">
      //     <form class="col s12">
      //       <div class="row">
      //         <div class="input-field col s12">
      //           <input id="email" type="email" class="validate" />
      //           <label for="email">Email</label>
      //         </div>
      //       </div>
      //       <div class="row">
      //         <div class="input-field col s12">
      //           <input id="password" type="password" class="validate" />
      //           <label for="password">Password</label>
      //         </div>
      //       </div>
      //     </form>
      //   </div>
      // </div>
      <div class="flex-container tint">
      
       

        <br />
        <div class="login">
          <input type="text" placeholder="username" name="user" />
          <br />
          <input type="password" placeholder="password" name="password" />
          <br />
          <input type="button" value="Login" />
        </div>
      </div>
    );
  }
}
export default Login;
