import React, {Component} from 'react';
import '../css/bookings.css';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Plane_ico from '../../../assets/images/plane.png';
import {baseurl} from '../../../services/Baseurl.js';
import Twitter_icon from '../../../assets/images/Twitter-icon.png';
import Facebook_icon from '../../../assets/images/1000px-F_icon.png';
import AirlineLogo from '../../../main/OneWayBooking/AirlineLogo';
import Profilepicbig from '../../../assets/images/man (1).png';
import {ShareButtons,ShareCounts,generateShareIcon} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Bookings extends Component{
    constructor(props){
        super(props);
        this.state = {
            booking_details: [],
        }
    }
    
    componentDidMount(){
        let details = localStorage.getItem('userdata');
        if(details != null){
            details = JSON.parse(details);
            let url = baseurl + 'booking/find/' + details[0].email;
            fetch(url, { method: 'GET' }).then(response => response.json()).then(response => {
                this.setState({booking_details: response });
            });
        }
        else{
            return(<Redirect to={'/'} />);
        }
    }

    handleStatus=(departs_at,status)=>{
        if((new Date(departs_at) < new Date()) && status === "Scheduled"){
            return "Travelled";
        }
        else{
            return status;
        }
    }

    findAirline = (code) => {
        return AirlineLogo.find((val => {
            return val.code == code;
        }))
    }

    myFunction = () => {
        var x = document.getElementById("snackbar1")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    handleCancel = (booking_id) => {
        let bookingUpadteUrl = baseurl + 'booking/update/' + booking_id;
        fetch(bookingUpadteUrl, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.componentDidMount();
                this.myFunction();
            })
    }

    handleButtons = (departs_at, status, booking_id, operating_airline) => {
        if (((new Date(departs_at) < new Date()) && status === "Scheduled") || status === "Cancelled") {
            return (
                <div className="col s4 m4 l4 right">
                    <p className="col s6 m6 l6 right-align grey-text" style={{ margin: 0 }}>Web Check-in</p>
                    <p className="col s6 m6 l6 right-align grey-text" style={{ margin: 0 }}>Cancel Ticket</p>
                </div>
            );
        }
        else {
            return (
                <div className="col s4 m4 l4 right">
                    <p id="cancel_web" className="col s6 m6 l6 right-align orange-text" style={{ margin: 0 }}><a href={`https://${this.findAirline(operating_airline).url}`} target="_blank">Web Chek-in</a></p>
                    <p id="cancel_web" className="col s6 m6 l6 right-align red-text" style={{ margin: 0 }} onClick={() => { this.handleCancel(booking_id) }}>Cancel Ticket</p>
                </div>
            );
        }
    }

    render(){
        let item=localStorage.getItem('userdata');

        if(item!=null)
        {   item = JSON.parse(item)
            var username="Hi, "+ item[0].username;
        }
        else{
            return(<Redirect to={'/'} />);
        }
        const shareUrl = 'http://gotripwt.azurewebsites.net';
        const title = 'GoTrip';
        let bookingprfilepic = null;
        let item1 = localStorage.getItem('userdata');
        item1 = JSON.parse(item1);
        let mid = item1[0].email.substring(0,8);
        let mid1 = mid.toLowerCase();
        let imageurl = "https://social.mindtree.com/User%20Photos/Profile%20Pictures/"+mid1+"_LThumb.jpg";
        if(item1[0].adal){
            bookingprfilepic = <img id="profileBooking" src={imageurl} style={{height:180, width:180}}/>
        }
        else if(item1[0].profile === "null"){
            bookingprfilepic =  <img id="profileBooking" src={Profilepicbig} style={{height:180,width:180}}/>
        }
        else{
            bookingprfilepic = <img id="profileBooking" src={item1[0].profile} style={{height:180, width:180}}/>
        }
        let rows = null;
        if(this.state.booking_details.length === 0){
            rows = <div className="col s12 m12 l12 center"><p>You have not booked a flight yet</p><Link to='/'><u className="blue-text">Book a flight</u></Link></div>
        }
        else{
            rows = this.state.booking_details.map(booking => {
            return (
                <li>
                    <div class="card-panel white">
                        <div id="card_row1" className="row">
                            <div className="col s2 m1 l1">
                                <img src={Plane_ico} />
                            </div>
                            <div className="col s10 m4 l4">
                                <p className="col s8 m12 l12"><b className="col s4 m4 l4">{booking.origin_airport}</b><i className="material-icons col s4 m4 l4">arrow_forward</i><b className="col s4 m4 l4">{booking.destination_airport}</b></p>
                                <p className="col s4 m12 l12"><b className="col s12 m5 l5 grey-text">{booking.departs_at.substring(0, 10)}</b></p>
                            </div>
                            <div className="col s4 m4 l2 center">
                                <p className="col s12 m12 l12"><b className="grey-text">Total Cost</b></p>
                                <p className="col s12 m12 l12 grey-text">₹{booking.total_price}</p>
                            </div>
                            <div className="col s4 m3 l2 right">
                                <p className="col s12 m12 l12 right-align">Booking Id</p>
                                <p className="col s12 m12 l12 right-align"><b>{booking.booking_id}</b></p>
                            </div>
                        </div>
                        <div className="row" id="card_row1">
                            <div className="col s3 m3 l3"><b className="purple-text">{this.handleStatus(booking.departs_at,booking.status)}</b></div>
                            <div className="col s5 m5 l5 valign-wrapper">
                                <div className="col s12 m12 l12 valign-wrapper"><b className="col s5 m5 l4" style={{margin: 0}}>Share with:</b><FacebookShareButton url={shareUrl} quote={title} className="Demo__some-network__share-button col s1 m1 l1" style={{margin: 0}}><i className="fa fa-facebook-square" style={{margin: 0}}></i></FacebookShareButton><TwitterShareButton url={shareUrl} quote={title} className="Demo__some-network__share-button col s1 m1 l1" style={{margin: 0}}><i className="fa fa-twitter-square" style={{margin: 0}}></i></TwitterShareButton></div>
                            </div>
                            {this.handleButtons(booking.departs_at,booking.status,booking.booking_id,booking.operating_airline)}
                        </div>
                    </div>
                </li>
            );
        });}
        return(
            <div className="col s12 m12 l12 grey lighten-4">
                <div className="row">
                    <div className="row indigo darken-4">
                        <div className="row"></div>
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
                                    <p className="white-text">This is the bookings page where you can view all your flight booking history.</p>
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
                                                    <Link to={'/bookinghistory'} id="cursor" className="col s12 m12 l12 z-depth-3 orange darken-4 center"><p className="white-text">Bookings</p></Link>
                                                    <Link to={'/profile'} id="cursor" className="col s12 m12 l12 center"><p className="black-text">Profile</p></Link>
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
                                            <span class="grey-text"><b>Bookings</b></span>
                                        </div>
                                        <ul>
                                            {rows}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="snackbar1">Ticket Cancelled</div>
            </div>
        );
    }
}