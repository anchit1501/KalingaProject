import React, { Component } from "react";
import $ from "jquery";
import BookingDetail from "../BookingDetails/BookingDetail";
import AirportList from "../../../app/main/FlightSearch/AirportDropdown/js/AirportList";
import Materialize from "../../../../node_modules/materialize-css/dist/js/materialize.min";
class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: []
    };
  }

  componentDidMount() {
    $(".datepicker").pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 10, // Creates a dropdown of 15 years to control year,
      today: "Today",
      clear: "Clear",
      close: "Ok",
      closeOnSelect: false, // Close upon selecting a date,
      select: "yyyy-mm-dd"
    });

    var elementPosition = $("#search").offset();

    $(window).scroll(function() {
      if ($(window).scrollTop() > elementPosition.top) {
        $("#search")
          .css("position", "fixed")
          .css("top", "0");
      } else {
        $("#search").css("position", "static");
      }
    });
  }
  FormatDate = depart_date => {
    let month = (depart_date.getMonth() + 1).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    let date = depart_date.getDate().toString();
    if (date.length == 1) {
      date = "0" + date;
    }
    let year = depart_date.getFullYear().toString();
    return `${year}-${month}-${date}`;
  };

  getdata = e => {
    e.preventDefault();
    console.log("helo");
    let src = document.getElementById("Source").value;
    let dest = document.getElementById("Destination").value;
    let date = document.getElementById("Date").value;
    let date1 = this.FormatDate(new Date(date));
    console.log(src);
    console.log(dest);
    console.log(date);
    let url =
      "http://gotripwtapi.azurewebsites.net/booking/find/" +
      src +
      "/" +
      dest +
      "/" +
      date1;

    fetch(url)
      .then(val => val.json())
      .then(val => {
        console.log(val);
        if (val.length === 0) {
          Materialize.toast("No Results Found", 4000);
        }

        this.setState({ coupon: val });
      });
  };

  render() {
    return (
      <div id="background" style={{ margin: "0px" }}>
        <div>
          <form onSubmit={this.getdata}>
            <div id="search" style={{ width: "100%" }}>
              <div class="container">
                <div class="card-panel" style={{ margin: 0, zDepth: 4 }}>
                  <div class="row " style={{ margin: 0 }}>
                    <div class="input-field col s6 l3 m6">
                      <input
                        id="Source"
                        type="text"
                        class="validate"
                        required
                        title="Only IATA Codes"
                        pattern="[A-Z ]+"
                        minLength="3"
                        maxLength="3"
                      />
                      <label htmlFor="source">Source(IATA code)</label>
                    </div>
                    <div class="input-field col s6 l3 m6">
                      <input
                        id="Destination"
                        type="text"
                        class="validate"
                        required
                        minLength="3"
                        maxLength="3"
                        title="Only IATA Codes"
                        pattern="[A-Z ]+"
                      />
                      <label htmlFor="source">Destination(IATA code)</label>
                    </div>
                    <div class="input-field col col s6 l3 m6">
                      <input
                        placeholder="Date"
                        id="Date"
                        type="Date"
                        required
                        maxLength="3"
                        minLength="3"
                      />
                    </div>
                    <div class=" col s6 l2 m6 center-align">
                      <button
                        class="waves-effect waves-light btn center-align"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                    <div className="col 1" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <BookingDetail coupon={this.state.coupon} />
      </div>
    );
  }
}
export default BookingHistory;
