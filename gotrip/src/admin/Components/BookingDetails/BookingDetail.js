import React, { Component } from "react";
import $ from "jquery";
import "../../../app/main/OneWayBooking/AirlineLogo";
import {
  getAirline,
  getHoursString,
  getMinuteString
} from "../../../app/main/OneWayBooking/TicketBooking/js/SingleFlightCard";
import { DurationCalculate } from "../../../app/main/OneWayBooking/HelpingFunctions/durationCalulator";

class BookingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: [],
      sort_origin: true,
      sort_depart: true,
      sort_arrival: true,
      sort_destination:true
    };
  }

  componentWillMount() {
    fetch("http://gotripwtapi.azurewebsites.net/booking/all")
      .then(val => val.json())
      .then(val => {
        this.setState({ coupon: val });
      });
  }

  componentDidMount() {
    console.log("hello");
    $(document).ready(function() {
      $(".collapsible").collapsible();
    });
  }

  getTime(str) {
    var fields = str.split("T");
    return fields[1];
  }
  getDate(str) {
    var fields = str.split("T");
    return fields[0];
  }

  sortByArrival = () => {
    let list = this.state.coupon;
    console.log(list);
    if (list == undefined) {
      return false;
    }
    if (this.state.sort_arrival) {
      list.sort((a, b) => {
        if (new Date(a.arrives_at) > new Date(b.arrives_at)) {
          return 1;
        }
        if (new Date(a.arrives_at) < new Date(b.arrives_at)) {
          return -1;
        }
        return 0;
      });
    } else {
      list.sort((a, b) => {
        console.log(a);
        if (new Date(a.arrives_at) > new Date(b.arrives_at)) {
          return -1;
        }
        if (new Date(a.arrives_at) < new Date(b.arrives_at)) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({
      sort_depart: !this.state.sort_depart
    });
    this.setState({
      coupon: list
    });
  };

  sortByDepart = () => {
    let list = this.state.coupon;
    console.log(list);
    if (list == undefined) {
      return false;
    }
    if (this.state.sort_depart) {
      list.sort((a, b) => {
        if (new Date(a.departs_at) > new Date(b.departs_at)) {
          return 1;
        }
        if (new Date(a.departs_at) < new Date(b.departs_at)) {
          return -1;
        }
        return 0;
      });
    } else {
      list.sort((a, b) => {
        console.log(a);
        if (new Date(a.departs_at) > new Date(b.departs_at)) {
          return -1;
        }
        if (new Date(a.departs_at) < new Date(b.departs_at)) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({
      sort_depart: !this.state.sort_depart
    });
    this.setState({
      coupon: list
    });
  };

  sortByOrigin=()=> {
    let list = this.state.coupon;
    if (list == undefined) {
      return false;
    }
    if (this.state.sort_origin) {
      list.sort((a, b) => {
        if (a.origin_airport < b.origin_airport) {
          return -1;
        }
        if (a.origin_airport > b.origin_airport) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    } else {
      list.sort((a, b) => {
        if (a.origin_airport < b.origin_airport) {
          return 1;
        }
        if (a.origin_airport > b.origin_airport) {
          return -1;
        }

        // names must be equal
        return 0;
      });
    }
    this.setState({
      sort_origin: !this.state.sort_origin
    });
    this.setState({
      coupon: list
    });
  }

  sortByDestination=()=> {
    let list = this.state.coupon;
    if (list == undefined) {
      return false;
    }
    if (this.state.sort_destination) {
      list.sort((a, b) => {
        if (a.destination_airport < b.destination_airport) {
          return -1;
        }
        if (a.destination_airport > b.destination_airport) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    } else {
      list.sort((a, b) => {
        if (a.destination_airport < b.destination_airport) {
          return 1;
        }
        if (a.destination_airport > b.destination_airport) {
          return -1;
        }

        // names must be equal
        return 0;
      });
    }
    this.setState({
      sort_destination: !this.state.sort_destination
    });
    this.setState({
      coupon: list
    });
  }

  render() {
    console.log(this.props.coupon.length != 0);
    return (
      <div>
        <div className="row container">
        <br/>
          <div className="col l12 m12 s12 ">
            <div
              className="col l3 m3 s3 center"
              onClick={this.sortByOrigin}
            >
              <h6 className="valign-wrapper">
                Source <i class="material-icons">unfold_more</i>
              </h6>
            </div>
            <div className="col l3 m3 s3 center"  onClick={this.sortByDestination}>
              <h6 className="valign-wrapper">
                Destination<i class="material-icons">unfold_more</i>
              </h6>
            </div>
            <div className="col l3 m3 s3 center" onClick={this.sortByDepart}>
              <h6 className="valign-wrapper">
                Departure Date<i class="material-icons">unfold_more</i>
              </h6>
            </div>
            <div className="col l3 m3 s3 center" onClick={this.sortByArrival}>
              <h6 className="valign-wrapper">
                Arrival Date<i class="material-icons">unfold_more</i>
              </h6>
            </div>
            <br />
          </div>
        </div>
        <div class="row container">
          <ul class="collapsible popout" data-collapsible="accordion">
            {this.props.coupon.length != 0 ? (
              this.props.coupon.map((val, index) => {
                console.log(val);
                return (
                  <li>
                    <div class="collapsible-header active">
                      <div className="col 112 m12">
                        <div className="col m2 l2">
                          <img src={getAirline(val.operating_airline).image} />
                        </div>
                        <div className="col m2 l2">
                          <b>{val.origin_airport}</b>
                        </div>
                        <div className="col m2 l2">
                          <b>{val.destination_airport}</b>
                        </div>
                        <div className="col  m3 l3">
                          <b>
                            {this.getDate(val.departs_at)}

                            <br />
                            {this.getTime(val.departs_at)}
                          </b>
                        </div>
                        <div className="col  m3 l3">
                          <b>
                            {this.getTime(val.arrives_at)}
                            <br />
                            {this.getDate(val.arrives_at)}
                          </b>
                        </div>
                      </div>
                    </div>

                    <div
                      class="collapsible-body"
                      style={{ backgroundColor: "#e5e5e5" }}
                    >
                      <div className="row">
                        <div className="col m1 l1" />
                        <div className="col m4 l4">
                          <div className="row">
                            <span>Booking ID: </span>
                            <span className="right">{val.booking_id}</span>
                          </div>
                          <div className="row">
                            <span>Travel Class: </span>
                            <span className="right">{val.travel_class}</span>
                          </div>
                        </div>
                        <div className="col m2 l2" />

                        <div className="col m4 l4">
                          <div className="row">
                            <span>Total Price: </span>
                            <span className="right">
                              {val.total_fare_flight}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              this.state.coupon.map((val, index) => {
                console.log(val);
                return (
                  <li>
                    <div class="collapsible-header active">
                      <div className="col 112 m12">
                        <div className="col m2 l2">
                          <img src={getAirline(val.operating_airline).image} />
                        </div>
                        <div className="col  m2 l2">
                          <b>{val.origin_airport}</b>
                        </div>
                        <div className="col m2 l2">
                          <b>{val.destination_airport}</b>
                        </div>
                        <div className="col  m3 l3">
                          <b>
                            {this.getDate(val.departs_at)}
                            <br />
                            {this.getTime(val.departs_at)}
                          </b>
                        </div>
                        <div className="col  m3 l3">
                          <b>
                            {this.getDate(val.arrives_at)}
                            <br />

                            {this.getTime(val.arrives_at)}
                          </b>
                        </div>
                      </div>
                    </div>

                    <div
                      class="collapsible-body"
                      style={{ backgroundColor: "#e5e5e5" }}
                    >
                      <div className="row">
                        <div className="col m1 l1" />
                        <div className="col m4 l4">
                          <div className="row">
                            <span>Booking ID: </span>
                            <span className="right">{val.booking_id}</span>
                          </div>
                          <div className="row">
                            <span>Travel Class: </span>
                            <span className="right">{val.travel_class}</span>
                          </div>
                        </div>
                        <div className="col m2 l2" />

                        <div className="col m4 l4">
                          <div className="row">
                            <span>Total Price: </span>
                            <span className="right">
                              {val.total_fare_flight}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default BookingDetail;
