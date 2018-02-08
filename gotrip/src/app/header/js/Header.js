import React, { Component } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import Banner from '../../assets/images/banner.png';
import { baseurl } from '../../services/Baseurl.js';
import Profilepic from '../../assets/images/man.png';
import Profilepicbig from '../../assets/images/man (1).png';
import AzureLogo from '../../assets/images/microsoft.png';
import { runWithAdal } from 'react-adal';
import { authContext } from '../../../AzureAd';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signuptoggle: false,
            username: "",
            password: "",
            userdetails: [],
            login_error: false,
            field_empty: false,
            redirect_admin: false,
            same_password: true,
            user_reg: false,
            signuperror: false,
            forgot_toggle: false,
            forgot_email: false,
            forgot_error: false,
            fetch_forget: false,
        };
    }
    // Login function
    login = () => {
        authContext.login();
    };

    // Logout function
    logout = () => {
        localStorage.removeItem('userdata');
        authContext.logOut();
        // fetch("Your Logout Page", {
        //   method: 'POST'
        // });
    };

    componentDidMount() {
        $(document).ready(function () {
            $('.modal').modal();
        });
        $('.button-collapse').sideNav({
            menuWidth: 300,
            edge: 'left',
            closeOnClick: true
        }
        );
        $(document).ready(function () {
            $('.dropdown-button').dropdown({
                hover: false, // Activate on hover
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
            }
            );
        });
    }

    myFunction = () => {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    HandleForgotSubmit = e => {
        e.preventDefault();
        this.setState({ fetch_forget: true });
        this.setState({ forgot_email: false });
        this.setState({ forgot_error: false });
        let useremail = document.getElementById("email").value;
        var data = {
            email: useremail
        };
        fetch(`${baseurl}user/settoken`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(response => {
                //console.log("Success:", response);
                if (response.status == 200) {
                    this.setState({ fetch_forget: false });
                    this.setState({ forgot_email: true });
                    this.setState({ forgot_error: false });
                }
                if (response.status == 400) {
                    this.setState({ fetch_forget: false });
                    this.setState({ forgot_email: false });
                    this.setState({ forgot_error: true });
                }
            });
    }
    checkLogin = () => {
        var item = localStorage.getItem('userdata');

        if (item != null) {
            item = JSON.parse(item)
            let username = "Hi, " + item[0].username;
            let mid = item[0].email.substring(0,8);
            let mid1 = mid.toLowerCase();
            let imageurl = "https://social.mindtree.com/User%20Photos/Profile%20Pictures/"+mid1+"_LThumb.jpg";
            if (item[0].adal) {
                return (<div>
                    <li id="userpic1" className="valign-center"><img id="profileadal" src={imageurl} style={{ height: 60, width: 60, padding: "5px 0px 0px 0px" }} /></li>
                    <li className="center"><a className="dropdown-button black-text" data-activates="dropdown1"><b>{username}</b><i className="material-icons right">arrow_drop_down</i></a></li>
                </div>);
            }
            else if(item[0].profile === "null"){
                return (<div>
                    <li id="userpic1" className="valign-center"><img src={Profilepic} style={{ padding: "5px 0px 0px 0px" }} /></li>
                    <li className="center"><a className="dropdown-button black-text" data-activates="dropdown1"><b>{username}</b><i className="material-icons right">arrow_drop_down</i></a></li>
                </div>);
            }
            else{
                return (<div>
                    <li id="userpic1" className="valign-center"><img id="profileadal" src={item[0].profile} style={{ height: 60, width: 60, padding: "5px 0px 0px 0px" }} /></li>
                    <li className="center"><a className="dropdown-button black-text" data-activates="dropdown1"><b>{username}</b><i className="material-icons right">arrow_drop_down</i></a></li>
                </div>);
            }
        }
        else {
            return (<div>
                <li className="center"><a className="waves-effect waves-light modal-trigger black-text" href="#modal1">SignIn</a></li></div>
            );
        }
    }
    checkLogin1 = () => {
        var item = localStorage.getItem('userdata');

        if (item != null) {
            item = JSON.parse(item)
            let username = item[0].username;
            let midside = item[0].email.substring(0,8);
            let midside1 = midside.toLowerCase();
            let imageurlside = "https://social.mindtree.com/User%20Photos/Profile%20Pictures/"+midside1+"_LThumb.jpg";
            let image;
            if(item[0].adal){
                image = <img id="profileadal" src={imageurlside}/>
            }
            else if(item[0].profile === "null"){
                image = <img id="profileadal" src={Profilepicbig} />
            }
            else{
                image = <img id="profileadal" src={item[0].profile} style={{height:300, width: 237}}/>
            }
            return (
                <div>
                    <li className="center grey lighten-3">{image}</li>
                    <li className="center black-text"><b>{username}</b></li>
                    <li className="divider"></li>
                    <li className="center"><Link to={'/bookinghistory'} className="waves-effect waves-light black-text center">Bookings</Link></li>
                    <li className="divider"></li>
                    <li className="center"><Link to={'/profile'} className="waves-effect waves-light black-text center">Profile</Link></li>
                    <li className="divider"></li>
                    <li className="center"><a className="waves-effect waves-light black-text center modal-trigger" href="#modalfeedback">Feedback</a></li>
                    <li className="divider"></li>
                    <li className="center"><span className="black-text" onClick={this.userlogout}>Sign Out</span></li>
                </div>
            );
        }
        else {
            return (<div>
                <li className="center"><a className="waves-effect waves-light modal-trigger black-text" href="#modal1">SignIn</a></li>
                <li className="center"><a className="waves-effect waves-light modal-trigger black-text" href="#modalfeedback">Feedback</a></li>
            </div>
            );
        }
    }
    userlogout = () => {
        let data = JSON.parse(localStorage.getItem('userdata'));
        if (data.adal) {
            this.logout();
            return;
        }
        localStorage.removeItem('userdata');
        //localStorage.removeItem('details');
        localStorage.clear();
        document.location.reload(true);
    }
    handleSignupForm = (e) => {
        e.preventDefault();
        let username = document.getElementById("signup_username").value;
        let email = document.getElementById("signup_email").value;
        let mobile = document.getElementById("signup_mob").value;
        let password = document.getElementById("signup_password").value;
        let password_confirm = document.getElementById("signup_confirm_password").value;
        if (password === password_confirm) {
            this.setState({ same_password: true });
        }
        else {
            this.setState({ same_password: false });
            return false;
        }
        let signDetails = {
            username: username,
            email: email,
            mobile: mobile,
            password: password,
        };
        let urlregister = baseurl + 'user';
        fetch(urlregister, {
            method: 'POST',
            body: JSON.stringify(signDetails),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .then(response => {
                if (response.message === "User Exists") {
                    this.setState({ user_reg: false });
                    this.setState({ signuperror: true });
                }
                if (response.message === "User Added") {
                    this.setState({ user_reg: true });
                    this.setState({ signuperror: false });
                }
            });
    }
    handleForm = (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        this.setState({ username: username });
        this.setState({ password: password });
        if (username === "" || password === "") {
            this.setState({ field_empty: true });
            this.setState({ login_error: false });
            return false;
        }

        let url = baseurl + 'user/login/' + username + '/' + password;
        fetch(url, { method: 'GET' }).then(res => res.json()).then(res => {
            this.setState({
                userdetails: res
            });
        }).then(result => {
            //console.log(this.state.userdetails);
            let response = this.state.userdetails;
            if (response.length === 1) {
                this.setState({ login_error: false });
                //console.log(response[0].role);
                if (response[0].role === "user") {
                    localStorage.setItem('userdata', JSON.stringify(response));
                    localStorage.setItem('details', JSON.stringify(response));
                    document.location.reload(true);
                }
                if (response[0].role === "admin" || response[0].role === "superadmin") {
                    localStorage.setItem('admindata', JSON.stringify(response));
                    $('#modal1').modal('close');
                    this.setState({ redirect_admin: true });

                }

            }
            else if (response.length === 0) {
                this.setState({ login_error: true });
            }
            else {
                return false;
            }
        });
    }
    handleSignup = () => {
        if (this.state.signuptoggle)
            this.setState({ signuptoggle: false });
        else
            this.setState({ signuptoggle: true });
    }
    handleClose = () => {
        if (this.state.signuptoggle) {
            document.getElementById("signupform").reset();
        }
        else if (this.state.forgot_toggle) {
            document.getElementById("forgotform").reset();
            this.setState({ forgot_toggle: false });
        }
        else {
            document.getElementById("loginForm").reset();
        }
        this.setState({ login_error: false });
        this.setState({ field_empty: false });
    }
    handlepassword = (e) => {
        e.preventDefault();
        if (this.state.forgot_toggle) {
            this.setState({ forgot_toggle: false });
        }
        else {
            this.setState({ forgot_toggle: true });
        }
    }

    handleFeedback = (e) => {
        e.preventDefault();
        let email = document.getElementById("email_feedback").value;
        let subject = document.getElementById("subject_feedback").value;
        let message = document.getElementById("message_feedback").value;
        let feedback = {
            email: email,
            subject: subject,
            message: message
        };
        let urlfeedback = baseurl + 'feedback';
        fetch(urlfeedback, {
            method: 'post',
            body: JSON.stringify(feedback),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.myFunction();
                document.getElementById("feedback_form").reset();
                $('#modalfeedback').modal('close');
            })
    }

    handleAdal = (e) => {
        e.preventDefault();
        //localStorage.setItem('url',window.location)
        // runWithAdal(authContext);
        // runWithAdal(authContext, () => {
        //       require('../../../index.js');
        // });
        this.login();
    }

    render() {
        let q = localStorage.getItem('userdata');
        console.log(JSON.parse(q));
        let userName = undefined;

        // Check for authentication and store username when 
        let user = authContext.getCachedUser();
        if (user) {
            console.log("Authenticated User: ", user);
            userName = user.profile.name;
            localStorage.setItem('details',JSON.stringify([{
personal_details:{
    firstname:user.profile.given_name,
    lastname:user.profile.family_name
}
            }]));
            localStorage.setItem('userdata', JSON.stringify([{
                adal: true,
                email: user.userName,
                username: user.profile.given_name,
                personal_details: {
                    title: "",
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    address_line1: "",
                    address_line2: "",
                    city: " ",
                    state: "",
                    pincode: '',
                    dob: ""
                },
            }]));
        } else {
            console.log("User not authenticated");
        }



        if (this.state.redirect_admin) {
            return <Redirect to="/admin" />
        }
        let data = this.checkLogin();
        let data1 = this.checkLogin1();

        let samepass = null;
        let signup_error = null;
        let signup_confirm = null;

        if (!this.state.same_password) {
            samepass = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>* Password and Confirm Password must be same.</p></div>
        }
        else if (this.state.user_reg) {
            signup_confirm = <div id="error_div" className="row green lighten-5"><p className="col s12 m12 l12 green-text center" style={{ margin: 0 }}>Registration Successfull. To login switch to Sign In page.</p></div>
        }
        else if (this.state.signuperror) {
            signup_error = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>Email ID already exists.</p></div>
        }
        else {
            samepass = null;
            signup_error = null;
            signup_confirm = null;
        }


        let forgot_err = null;
        let forgot_em = null;

        if (this.state.forgot_email) {
            forgot_em = <div id="error_div" className="row green lighten-5"><p className="col s12 m12 l12 green-text center" style={{ margin: 0 }}>Resent link is sent to your Email ID.</p></div>
        }
        else if (this.state.forgot_error) {
            forgot_err = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>* Email ID not registered.</p></div>
        }
        else {
            forgot_em = null;
            forgot_err = null;
        }

        let login_error = null;
        let field_empty = null;

        if (this.state.login_error) {
            login_error = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>* Incorrect Email or Password.</p></div>
        }
        else if (this.state.field_empty) {
            field_empty = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>* Email or password cannot be empty.</p></div>
        }
        else {
            login_error = null;
            field_empty = null;
        }
        let form = null;
        let formHeader = null;
        let formChange = null;
        if (this.state.forgot_toggle) {
            formChange = null;
            formHeader = <div className="col s12 m12 l12 center" style={{ fontSize: "200%", margin: 0 }}>Forgot Password</div>
            form = <form id="forgotform" className="col s12 l12 m12" onSubmit={this.HandleForgotSubmit}>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="email" type="email" className="validate" required pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" title="Enter valid email address" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                {(this.state.fetch_forget) ? <div class="progress">
                    <div class="indeterminate"></div>
                </div> : ''}
                {forgot_err}{forgot_em}
                <div className="row">
                    <div className="input-field">
                        <button type="submit" className="waves-effect waves-light btn btn-default orange darken-4 col s12 m12 l12">SUBMIT</button>
                    </div>
                </div>
            </form>
        }
        else if (this.state.signuptoggle) {
            formChange = <div className="row"><div className="col s12 m12 l12 right-align">Already have an account?<span id="sign-up-text" className="orange-text" onClick={this.handleSignup}><b>SIGN IN</b></span></div></div>
            formHeader = <div className="col s12 m12 l12 center" style={{ fontSize: "200%", margin: 0 }}>Create your account</div>
            form = <form id="signupform" className="col s12 l12 m12" onSubmit={this.handleSignupForm}>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="signup_username" type="text" className="validate" pattern="[a-zA-Z0-9.@&]{6,10}" required title="Username can have characters, numbers and special characters (@,.,$) within 6 to 10 letters" />
                        <label htmlFor="signup_username">Username</label>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="signup_email" type="email" className="validate" required pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" title="Enter valid email address" />
                        <label htmlFor="signup_email">Email</label>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">phone</i>
                        <input id="signup_mob" type="tel" className="validate" required pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="Enter a valid number starting with country code or 7, 8 or 9" />
                        <label htmlFor="signup_mob">Mobile</label>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="signup_password" type="password" className="validate" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}" title="Password to be entered which should have at least one capital alphabet, one special character and numbers and should be at least 8 characters and maximum 15 characters" />
                        <label htmlFor="signup_password">Password</label>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="signup_confirm_password" type="password" className="validate" required />
                        <label htmlFor="signup_confirm_password">Confirm Password</label>
                    </div>
                </div>
                {signup_confirm}{signup_error}{samepass}
                <div className="row">
                    <p id="terms" className="col s12 m12 l12">By clicking on register, I understand & agree to GoTrip <u className="orange-text">terms of use</u> and <u className="orange-text">privacy policy</u>.</p>
                </div>
                <div className="row">
                    <div className="input-field">
                        <button type="submit" className="waves-effect waves-light btn btn-default orange darken-4 col s12 m12 l12">REGISTER</button>
                    </div>
                </div>

            </form>;
        }
        else {
            formChange = <div className="row"><div className="col s12 m12 l12 right-align">Don't have an account?<span id="sign-up-text" className="orange-text" onClick={this.handleSignup}><b>SIGN UP</b></span></div></div>
            formHeader = <div className="col s12 m12 l12 center" style={{ fontSize: "200%", margin: 0 }}>Sign in to your account</div>
            form = <form id="loginForm" className="col s12 l12 m12" onSubmit={this.handleForm}>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="username" type="email" className="validate" required pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" title="Enter valid email address" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="password" type="password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col s12 m12 l12"></div>
                </div>
                <div className="row">
                    <span className="col s12 m12 l12 left-align"><a id="forgot" className="left-align orange-text" onClick={this.handlepassword}>Forgot password ?</a></span>
                </div>
                {login_error}{field_empty}
                <div className="row">
                    <p id="terms" className="col s12 m12 l12">By logging in, I understand & agree to <u className="orange-text">GoTrip</u> terms of use and <u className="orange-text">privacy policy</u>.</p>
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="col s12 m5 l5">
                        <button type="submit" className="waves-effect waves-light btn btn-default orange darken-4 col s12 m12 l12">LOGIN</button>
                    </div>
                    <p className="col s12 m2 l2 center" style={{ marginTop: 10 }}><b>OR</b></p>
                    <div className="col s12 m5 l5">
                        <button type="button" className="waves-effect waves-dark btn btn-default white col s12 m12 l12 valign-wrapper" onClick={this.handleAdal}><img src={AzureLogo} style={{ height: 35 }} /></button>
                    </div>
                </div>
            </form>
        }
        return (
            <div>
                <nav className="white">
                    <ul id="slide-out" className="side-nav">
                        {data1}
                    </ul>
                    <a href="#" data-activates="slide-out" className="button-collapse show-on-med-and-small"><i className="material-icons black-text">menu</i></a>
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo black-text" title="Go to Home Page"  >GoTrip</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {data}
                        </ul>
                    </div>
                    <div className="orange lighten-1"></div>
                </nav>
                <ul id="dropdown1" className="dropdown-content">
                    <li className="center"><Link to={'/bookinghistory'} className="waves-effect waves-light black-text center">Bookings</Link></li>
                    <li className="divider"></li>
                    <li className="center"><Link to={'/profile'} className="waves-effect waves-light black-text center">Profile</Link></li>
                    <li className="divider"></li>
                    <li className="orange lighten-1 "><span className="waves-effect waves-light white-text center" onClick={this.userlogout}>Sign Out</span></li>
                </ul>
                <div id="modal1" className="modal">
                    <div className="modal-content col s12 m12 l12">
                        <div id="banner" className="row" style={{ margin: 0 }}>
                            <div className="col s12 m12 l12">
                                <div id="close_row" className="row"><div id="close" className="col s12 m12 l12 right-align"><i className="material-icons modal-action modal-close" onClick={this.handleClose}>close</i></div></div>
                                {formChange}
                                <div className="row">
                                    {formHeader}
                                </div>
                                <div className="row" style={{ paddingRight: 30, paddingLeft: 30 }}>
                                    {form}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modalfeedback" className="modal">
                    <div className="modal-content center">
                        <h4 style={{ padding: 10 }}>You are important to us. Help us with your feedback.</h4>
                        <form id="feedback_form" onSubmit={this.handleFeedback}>
                            <div className="divider col s12 m12 l12"></div>
                            <div className="row container">
                                <div className="col s12 m12 l12">
                                    <div className="row" style={{ margin: 0 }}>
                                        <div className="input-field col s12 m12 l12">
                                            <input id="email_feedback" type="email" className="validate" required pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" title="Enter valid email address" />
                                            <label htmlFor="email_feedback">Email*</label>
                                        </div>
                                    </div>
                                    <div className="row" style={{ margin: 0 }}>
                                        <div className="input-field col s12 m12 l12">
                                            <input id="subject_feedback" type="text" className="validate" required title="Subject of the feedback" />
                                            <label htmlFor="subject_feedback">Subject*</label>
                                        </div>
                                    </div>
                                    <div className="row" style={{ margin: 0 }}>
                                        <div className="input-field col s12 m12 l12">
                                            <textarea id="message_feedback" className="materialize-textarea validate" required pattern="^.{20,400}$" title="Message can have characters, numbers and within 20 to 400 letters"></textarea>
                                            <label htmlFor="message_feedback">Message*</label>
                                        </div>

                                    </div>
                                    <button type="submit" className="col s12 m12 l12  indigo darken-4 waves-effect waves-light btn">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="snackbar">Feedback Submitted</div>
            </div>
        );
    }
}

export default Header;
