import React, { Component } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Plane_ico from '../../../assets/images/plane.png';
import { baseurl } from '../../../services/Baseurl.js';
import Twitter_icon from '../../../assets/images/Twitter-icon.png';
import Facebook_icon from '../../../assets/images/1000px-F_icon.png';
import ProfilePic from '../../../assets/images/man.png';
import Profilepicbig from '../../../assets/images/man (1).png';
import $ from 'jquery';
//import axios from 'axios';
//import {baseurl} from '../../../services/Baseurl.js';

//var data_title,data_firstname,data_lastname,data_address_line1,data_city,data_state,data_pincode,data_dob,data_username,data_email,data_mobile,data_password;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: '',
            firstname: '',
            lastname: '',
            dob: '',
            email: '',
            mobile: '',
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            updateProb: false,

        }
        this.state = {
            profile: ''
        }
        this.loadFile = this.loadFile.bind(this)

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        $(document).ready(function () {
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });
        let item1 = localStorage.getItem('details');
        if (item1 != null) {
            item1 = JSON.parse(item1);
            if (item1[0].personal_details.title !== "null") {
                this.setState({ title: item1[0].personal_details.title });
            }
            if (item1[0].personal_details.firstname !== "null") {
                this.setState({ firstname: item1[0].personal_details.firstname });
            }
            if (item1[0].personal_details.lastname !== "null") {
                this.setState({ lastname: item1[0].personal_details.lastname });
            }
            if (item1[0].personal_details.middlename !== "null") {
                this.setState({ middlename: item1[0].personal_details.middlename });
            }
            if (item1[0].personal_details.address_line1 !== "null") {
                this.setState({ address_line1: item1[0].personal_details.address_line1 });
            }
            if (item1[0].personal_details.address_line2 !== "null") {
                this.setState({ address_line2: item1[0].personal_details.address_line2 });
            }
            if (item1[0].personal_details.city !== "null") {
                this.setState({ city: item1[0].personal_details.city });
            }
            if (item1[0].personal_details.state !== "null") {
                this.setState({ state: item1[0].personal_details.state });
            }
            if (item1[0].personal_details.pincode !== 0) {
                this.setState({ pincode: item1[0].personal_details.pincode });
            }
            if (item1[0].email !== "null") {
                this.setState({ email: item1[0].email });
            }
            if (item1[0].mobile !== "null") {
                this.setState({ mobile: item1[0].mobile });
            }
            if (item1[0].personal_details.dob !== "null") {
                this.setState({ dob: item1[0].personal_details.dob });
            }
        }
    }

    handleEdit = () => {
        if (!this.state.edit) {
            this.setState({ edit: true });
        }
    }
    handleDiscard = () => {
        if (this.state.edit) {
            this.setState({ edit: false });
            document.getElementById("profile_form").reset();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let fname = document.getElementById("first_name").value;
        let lname = document.getElementById("last_name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let addr = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let pin = document.getElementById("pin").value;
        let dob = document.getElementById("dob").value;
        let details = {
            title: title,
            firstname: fname,
            lastname: lname,
            address_line1: addr,
            city: city,
            state: state,
            pincode: pin,
            dob: dob,
            email: email,
            mobile: phone
        };
        let item1 = localStorage.getItem('userdata');
        item1 = JSON.parse(item1);
        let urlpost = baseurl + 'user/update/' + item1[0].email;
        fetch(urlpost, {
            method: 'put',
            body: JSON.stringify(details),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                //console.log(response);
                let res = JSON.stringify([response]);
                localStorage.setItem('details', res);
                this.componentDidMount();
                this.setState({ edit: false });
            });

    }

    loadFile(e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = () => this.setState({ profile: reader.result });
        console.log(reader.result);
        reader.readAsDataURL(e.target.files[0]);
    };
    myFunction = () => {
        var x = document.getElementById("snackbar3")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
    handleimageSubmit = (e) => {
        let item1 = localStorage.getItem('userdata');
        item1 = JSON.parse(item1);
        if(this.state.profile === ''){
            this.setState({updateProb: true});
        }
        else{
            $('#modal4').modal('close');
        }

        let profile_img = {

            profile: this.state.profile
        };
        //console.log(profile_img);
        let urlpost = baseurl + 'user/update/' + item1[0].email;

        fetch(urlpost, {
            method: "put",
            body: JSON.stringify(profile_img),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(response => response.json())
            .catch(error => console.error("Error:", error))
            .then(response => {
                this.myFunction();
            });

    };


    render() {
        let maxdate = new Date().toISOString().split('T')[0];
        let date = new Date();
        let year = parseInt(date.getFullYear()) - 150;
        let month = date.getMonth();
        let date1 = date.getDate();
        let mindate = new Date(year, month, date1).toISOString().split('T')[0];

        var item = localStorage.getItem('userdata');
        if (item != null) {
            item = JSON.parse(item);
            var username = "Hi, " + item[0].username;
        }
        else {
            return (<Redirect to={'/'} />);
        }

        let editDetails = null;
        if (this.state.edit) {
            editDetails = <div className="row">
                <div className="col s12 m12 l12">
                    <div className="divider col s12 m12 l12"></div>
                    <form id="profile_form" className="col s12 m12 l12" onSubmit={this.handleSubmit}>
                        <div className="col s12 m12 l12">
                            <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Personal Details</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="col l1 hide-on-med-and-down"></div>
                            <select id="title" defaultValue={this.state.title} className="col s6 m2 l2 browser-default" style={{ marginTop: 17 }}>
                                <option value="" disabled>Title</option>
                                <option value="Ms">Ms</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Mstr">Mstr</option>
                            </select>
                            <div className="col s6 m3 l3">
                                <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>First Name*</p>
                                <input id="first_name" type="text" defaultValue={this.state.firstname} className="validate" pattern="[a-zA-Z ]+" title="Please Enter Character only" />
                            </div>
                            <div className="col s6 m3 l3">
                                <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Last Name*</p>
                                <input id="last_name" type="text" defaultValue={this.state.lastname} className="validate" pattern="[a-zA-Z ]+" title="Please Enter Character only" />
                            </div>
                            <div className="col s6 m4 l3">
                                <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Date of Birth</p>
                                <input id="dob" type="date" defaultValue={this.state.dob} min={mindate} max={maxdate} className="validate" />
                            </div>
                        </div>
                        <div className="divider col s12 m12 l12"></div>
                        <div className="col s12 m12 l12">
                            <div className="col s12 m12 l12">
                                <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Contact Details</h5>
                            </div>
                            <div className="row" style={{ margin: 0 }}>
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s6 m7 l6">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Email*</p>
                                    <input disabled id="email" type="email" defaultValue={this.state.email} className="validate" />
                                </div>
                                <div className="col s6 m5 l5">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Mobile Number*</p>
                                    <input id="phone" type="text" maxLength={10} defaultValue={this.state.mobile} className="col s12 m12 l12 validate" pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="Enter a valid number starting with country code or 7, 8 or 9" />
                                </div>
                                <div className="col s2 m2 l2"></div>
                            </div>
                            <div className="row" style={{ margin: 0 }}>
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s12 m12 l11">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Address</p>
                                    <input id="address" type="text" defaultValue={this.state.address_line1} className="validate" pattern="[a-zA-Z0-9., ]+" />
                                </div>
                            </div>
                            <div className="row" style={{ margin: 0 }}>
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s4 m4 l3">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>City</p>
                                    <input id="city" type="text" defaultValue={this.state.city} className="validate" pattern="[a-zA-Z ]+" title="Please Enter Character only" />
                                </div>
                                <div className="col s4 m4 l4">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>State</p>
                                    <input id="state" type="text" defaultValue={this.state.state} className="validate" pattern="[a-zA-Z ]+" title="Please Enter Character only" />
                                </div>
                                <div className="col s4 m4 l4">
                                    <p id="labelPadding" className="col s12 m12 l12" style={{ margin: 0, fontSize: 12 }}>Pincode</p>
                                    <input id="pin" type="text" maxLength={6} defaultValue={this.state.pincode} className="validate" pattern="[0-9]+" />
                                </div>
                            </div>
                        </div>
                        <div className="divider col s12 m12 l12"></div>
                        <div className="row"></div>
                        <div className="row" style={{ margin: 0 }}>
                            <div className="col s12 m12 l12">
                                <div className="col l4 hide-on-med-and-down"></div>
                                <div className="col s6 m6 l4"><a class="col s12 m12 l12 waves-effect waves-dark btn red lighten-3" onClick={this.handleDiscard}>Cancel</a></div>
                                <div className="col s6 m6 l4"><button class="col s12 m12 l12 waves-effect waves-dark btn orange lighten-3" type="submit">Save</button></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }
        if (!this.state.edit && item[0].adal) {
            editDetails = <div className="row">
                <div className="col s12 m12 l12">
                    <div className="divider col s12 m12 l12"></div>
                    <form className="col s12 m12 l12">
                        <div className="col s12 m12 l12">
                            <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Personal Details</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s6 m2 l2"><b>Title:</b></div>
                                <div className="col s6 m3 l3"><b>First Name:</b> {this.state.firstname}</div>
                                <div className="col s6 m3 l3"><b>Last Name:</b> {this.state.lastname}</div>
                                <div className="col s6 m4 l3"><b>DOB:</b></div>
                            </div>
                        </div>
                        <div className="divider col s12 m12 l12"></div>
                        <div className="col s12 m12 l12">
                            <div className="col s12 m12 l12">
                                <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Contact Details</h5>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s6 m7 l6"><b>Email:</b> {item[0].email}</div>
                                <div className="col s6 m5 l5"><b>Mobile Number:</b></div>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s12 m12 l11"><b>Address:</b></div>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s4 m4 l3"><b>City:</b></div>
                                <div className="col s4 m4 l4"><b>State:</b></div>
                                <div className="col s4 m4 l4"><b>Pincode:</b></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }
        if (!this.state.edit && !item[0].adal) {
            editDetails = <div className="row">
                <div className="col s12 m12 l12">
                    <div className="divider col s12 m12 l12"></div>
                    <form className="col s12 m12 l12">
                        <div className="col s12 m12 l12">
                            <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Personal Details</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s6 m2 l2"><b>Title:</b> {this.state.title}</div>
                                <div className="col s6 m3 l3"><b>First Name:</b> {this.state.firstname}</div>
                                <div className="col s6 m3 l3"><b>Last Name:</b> {this.state.lastname}</div>
                                <div className="col s6 m4 l3"><b>DOB:</b> {this.state.dob}</div>
                            </div>
                        </div>
                        <div className="divider col s12 m12 l12"></div>
                        <div className="col s12 m12 l12">
                            <div className="col s12 m12 l12">
                                <h5 className="col s12 m12 l12 valign-wrapper indigo-text"><i className="material-icons">keyboard_arrow_right</i>Contact Details</h5>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s12 m7 l6"><b>Email:</b> {this.state.email}</div>
                                <div className="col s12 m5 l5"><b>Mobile Number:</b> {this.state.mobile}</div>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s12 m12 l11"><b>Address:</b> {this.state.address_line1}</div>
                            </div>
                            <div className="row">
                                <div className="col l1 hide-on-med-and-down"></div>
                                <div className="col s6 m4 l3"><b>City:</b> {this.state.city}</div>
                                <div className="col s6 m4 l4"><b>State:</b> {this.state.state}</div>
                                <div className="col s6 m4 l4"><b>Pincode:</b> {this.state.pincode}</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        }
        let bookingprfilepic = null;
        let profilepic = null;
        let item1 = localStorage.getItem('userdata');
        item1 = JSON.parse(item1);
        let mid = item1[0].email.substring(0, 8);
        let mid1 = mid.toLowerCase();
        let edit;
        let imageurl = "https://social.mindtree.com/User%20Photos/Profile%20Pictures/" + mid1 + "_LThumb.jpg";
        if (item1[0].adal) {
            bookingprfilepic = <img id="profileBooking" src={imageurl} style={{ height: 180, width: 180 }} />
            profilepic = <img id="profileBooking" src={imageurl} style={{ height: 45, width: 45 }} />
            edit = null;
        }
        else if (item1[0].profile === "null") {
            bookingprfilepic = <div className="imagediv"><img id="profileBooking" className="image" src={Profilepicbig} /><div className="middle"><div className="text"><i id="picedit" className="material-icons modal-trigger" href="#modal4">mode_edit</i></div></div></div>
            edit = <div><i className="col s6 m6 l3 material-icons">create</i><p className="col s6 m6 l9" style={{ margin: 0 }}><u style={{ cursor: 'pointer', color: 'orange' }} onClick={this.handleEdit}>Edit</u></p></div>
            profilepic = <img id="profileBooking" src={ProfilePic} />
        }
        else {
            bookingprfilepic = <div className="imagediv"><img id="profileBooking" className="image" src={item1[0].profile} style={{ height: 180, width: 180 }} /><div className="middle"><div className="text"><i id="picedit" className="material-icons modal-trigger" href="#modal4">mode_edit</i></div></div></div>
            profilepic = <img id="profileBooking" src={item1[0].profile} style={{ height: 45, width: 45 }} />
            edit = <div><i className="col s6 m6 l3 material-icons">create</i><p className="col s6 m6 l9" style={{ margin: 0 }}><u style={{ cursor: 'pointer', color: 'orange' }} onClick={this.handleEdit}>Edit</u></p></div>
        }
        let picUpload = null;
        if(this.state.updateProb){
            picUpload = <div id="error_div" className="row red lighten-5"><p className="col s12 m12 l12 red-text center" style={{ margin: 0 }}>* Select a picture</p></div>
        }
        else{
            picUpload = null;
        }
        return (
            <div className="col s12 m12 l12 grey lighten-4">
                <div id="margin_remove1" className="row">
                    <div className="row indigo darken-4">
                        <div className="row">
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="row container">
                                <div className="col s12 m12 l12">
                                    <div className="col s12 m12 l12 left">
                                        <div className="row">
                                            {bookingprfilepic}
                                        </div>
                                    </div>
                                    <div className="col s12 m12 l12 left">
                                        <div className="col s12 m12 l12 white-text">
                                            {username}
                                        </div>
                                        <div className="col s12 m12 l12">
                                            <p className="white-text">This is your profile page where your can save your details which will ease your booking process.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="margin_remove1" className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m3 l3 hide-on-small-only">
                                <div class="row" style={{ margin: 0 }}>
                                    <div class="col s12 m12 l12">
                                        <div class="card-panel white" style={{ margin: 0 }}>
                                            <div className="row" style={{ margin: 0 }}>
                                                <ul className="col s12 m12 l12">
                                                    <Link to={'/bookinghistory'} id="cursor" className="col s12 m12 l12 center"><p className="black-text">Bookings</p></Link>
                                                    <Link to={'/profile'} id="cursor" className="col s12 m12 l12 z-depth-3 orange darken-4 center"><p className="white-text">Profile</p></Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m9 l9">
                                <div class="row">
                                    <div class="col s12 m12 l12">
                                        <div class="card-panel white" style={{ margin: 0 }}>
                                            <span class="grey-text"><b>My Profile</b></span>
                                        </div>
                                        <div class="card-panel lime lighten-5 hoverable">
                                            <div className="row valign-wrapper" style={{ margin: 0 }}>
                                                <div className="col s3 m2 l2" style={{ margin: 0 }}>
                                                    {profilepic}
                                                </div>
                                                <div className="col s6 m8 l8" style={{ margin: 0 }}>
                                                    <p style={{ margin: 0, fontSize: 20 }}><b>{item[0].username}</b></p>
                                                </div>
                                                <div className="col s3 m2 l2" style={{ margin: 0 }}>
                                                    {edit}
                                                </div>
                                            </div>
                                            {editDetails}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal4" class="modal">
                    <div id="modalcontent" class="modal-content center">
                        <h4>Change Your Profile Picture</h4>
                        <p className="col s12 m12 l12">Choose a picture: <input type="file" accept="image/*;capture=camera" onChange={this.loadFile} /></p>
                        {picUpload}
                    </div>
                    <div class="modal-footer">
                        <a class="modal-action modal-close waves-effect waves-red btn-flat" onClick={()=> {this.setState({updateProb: false})}}>Cancel</a>
                        <a class="modal-action waves-effect waves-green btn-flat" onClick={this.handleimageSubmit}>Save</a>
                    </div>
                </div>
                <div id="snackbar3">Profile pic chaged. To see the change please login again.</div>
            </div>
        );
    }
}