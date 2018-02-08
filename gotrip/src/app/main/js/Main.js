import React, { Component } from 'react';
import FlightSearch from '../FlightSearch/js/FlightSearch';
import '../css/Main.css';
import $ from 'jquery';
import plane1 from '../../assets/images/plane1.png';
import rupee from '../../assets/images/rupee.png';
import gift from '../../assets/images/gift.png';
import support from '../../assets/images/support.png';
import { authContext } from '../../../adalConfig';
import Recommend from '../Recommendations/js/recommend.js';

var colors = ["#00897b","#fdd835","#6d4c41","#e53935","#1e88e5"];

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      coupons: [],
      indexStart: 0,
      indexEnd: 0,
    };
  }

  componentDidMount() {
    $(document).ready(function () {
      $('.tooltipped').tooltip({ delay: 50 });
    });
    $(document).ready(function () {
      $('ul.tabs').tabs();
    });

    $(document).ready(function () {
      $('select').material_select();
    });
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    fetch('http://gotripwtapi.azurewebsites.net/coupon/all',{
      method: 'get',
    }).then(response => response.json())
    .then(response => {
      this.setState({coupons : response});
      let length = this.state.coupons.length;
    });
  }

  clickEventPrevious = () => {
    if (this.state.indexStart - 1 >= 0) {
      this.setState({ indexStart: ((this.state.indexStart) - 1) });
      this.setState({ indexEnd: ((this.state.indexEnd) - 1) });
    }
    if(this.state.indexStart===0)
    {
       this.setState({ indexStart: ((this.state.coupons.length) - 1) });
      this.setState({ indexEnd: ((this.state.coupons.length) - 1) });
    }
    
  }

  clickEventNext = () => {
    if (this.state.indexEnd <= this.state.coupons.length - 2) {
      this.setState({ indexStart: ((this.state.indexStart) + 1) });
      this.setState({ indexEnd: ((this.state.indexEnd) + 1) });
    }
    if(this.state.indexStart===((this.state.coupons.length) - 1))
    {
       this.setState({ indexStart: 0 });
      this.setState({ indexEnd: 0 });
    }
  }

  render() {
    // console.log(authContext._user.profile.name)
    let warning = null;
    let isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) {
      warning = <div className="col s12 m12 l12 orange lighten-1 center">Browser not supported. Some functionalities may not work properly.</div>;
    }
    if ((!(window.ActiveXObject) && "ActiveXObject" in window)) {
      warning = <div className="col s12 m12 l12 orange lighten-1 center">Browser not supported. Some functionalities may not work properly.</div>;
    }

    let rows = this.state.coupons.filter((coupons,index)=>{return index >= this.state.indexStart && index <= this.state.indexEnd}).map(coupons => {
      let color_value = colors[Math.floor(Math.random() * Math.floor(5))];
      //console.log(color_value);
      return(
        <div className="col s12 m12 l12">
          <div className="card-panel" style={{backgroundColor: color_value}}>
            <div className="row center" style={{margin: 0}}>
              <div className="col s12 m12 l12">
                <h5 className="white-text">Discounts on all flights</h5>
                <p className="white-text">Use Coupon Code: {coupons.coupon_code}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  
    return (
      <main className="Main">
        <div>{warning}</div>
        <FlightSearch />
        <div className="row" style={{ margin: 0 }}>
          <div className="col s12 m12 l12 center"><h4>Best Flight Offers</h4></div>
        </div>
        <div id="discounts" className="row container indigo lighten-5 valign-wrapper">
          <div id="arrows" className="col s2 m2 l2 center" onClick={this.clickEventPrevious}><i className="material-icons medium">keyboard_arrow_left</i></div>
          <div className="col s10 m10 l10">
            {rows}
          </div>
          <div id="arrows" className="col s2 m2 l2 center" onClick={this.clickEventNext}><i className="material-icons medium">keyboard_arrow_right</i></div>
        </div>
        <div className="row" style={{ margin: 0 }}>
          <div className="col s12 m12 l12 center" style={{ marginBottom: 10 }}><h4>Best Flight Deals of the Day</h4></div>
        </div>
        <div id="discounts" className="row container indigo lighten-5">
          <Recommend />
        </div>
        <div className="row" style={{ margin: 0 }}>
          <div className="col s12 m12 l12 center" style={{ marginBottom: 10 }}><h4>Why Choose Us</h4></div>
        </div>
        <div className="row container">
          <div className="col s12 m12 l12">
            <div className="col s12 m3 l3 center">
              <img src={plane1} style={{ width: 60, height: 60 }} />
              <h4 className="col s12 m12 l12">Easy Booking</h4>
              <p className="col s12 m12 l12">We offer easy and convenient flight bookings with attractive offers.</p>
            </div>
            <div className="col s12 m3 l3 center">
              <img src={rupee} style={{ width: 60, height: 60 }} />
              <h4 className="col s12 m12 l12">Lowest Price</h4>
              <p className="col s12 m12 l12">We ensure low rates on flight tickets.</p>
            </div>
            <div className="col s12 m3 l3 center">
              <img src={gift} style={{ width: 60, height: 60 }} />
              <h4 className="col s12 m12 l12">Exciting Deals</h4>
              <p className="col s12 m12 l12">Enjoy some of the most exciting deals on flights.</p>
            </div>
            <div className="col s12 m3 l3 center">
              <img src={support} style={{ width: 60, height: 60 }} />
              <h4 className="col s12 m12 l12">24/7 Support</h4>
              <p className="col s12 m12 l12">Get assistance 24*7 on any kind of travel related query. We are happy to assist you.</p>
            </div>
          </div>
        </div>
        <div className="row container">
          <div className="col s12 m12 l12">
            <div className="col s12 m12 l12"><h4>Fly Anywhere in India with GoTrip</h4></div>
            <p className="col s12 m12 l12">GoTrip offers great deals on flight tickets and discounts on lowest airfares along with seamless flight booking experiences. You can grab here cheap flight tickets here. We also ensure our customers great air travel experience and a friendly support. You can book air tickets for all major airlines flying across the country with us. Offering competitive airfare, GoTrip promises you a journey of lifetime.</p>
          </div>
        </div>
        <div className="fixed-action-btn hide-on-med-and-down">
          <a className="btn-floating btn-large waves-effect waves-light red modal-trigger tooltipped" href="#modalfeedback" data-position="top" data-delay="50" data-tooltip="Feedback">
            <i className="large material-icons">feedback</i>
          </a>
        </div>
      </main>
    );
  }
}

export default Main;
