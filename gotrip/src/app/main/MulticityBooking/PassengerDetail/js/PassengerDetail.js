import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import { baseurl } from '../../../../services/Baseurl';
import FullScreenSpinner from '../../../RoundTripBooking/spinner/js/FullScreenSpinner';
var randomize = require('randomatic');
class PassengerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      alternate_email: '',
      mobile: '',
      passenger_detail: {

        booking_button: false,
        redirect: false
      },
      post_0: false,
      post_1: false,
      post_2: false,
      post_3: false,

      redirect: false
    }
  }
  componentDidMount() {
    this.setState({ pnr: randomize('A', 10) });
    this.setState({ booking_id: randomize('0', 12) });
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });

  }
componentWillMount(){
    var item = JSON.parse(localStorage.getItem('details'));
    var data = JSON.parse(localStorage.getItem('userdata'));
     if(data!=null)
    {
      this.setState({email:data[0].email});
      if(data[0].mobile!=null){
        this.setState({mobile:data[0].mobile});
      }
    }
    
   if(item!=null)
   {
      console.log(item);
    let first="";
    let last="";
    if(item[0].personal_details.firstname!=null || item[0].personal_details.firstname!=undefined)
    {
      first=item[0].personal_details.firstname;
    
    }
    if(item[0].personal_details.lastname!=null || item[0].personal_details.lastname!=undefined)
    {
      last=item[0].personal_details.lastname;
    
    }
    this.setState({adult_0_first:first});
    this.setState({adult_0_last:last});
   }
    
  }
  changeFirstName = (event, cat, id) => {
    let json = `{"${cat}_${id}_first": {"first_name":"${event.target.value}"}}`;
    let data = { ...this.state.passenger_detail, ...JSON.parse(json) };
    this.setState({ passenger_detail: data });
  }


  changeLastName = (event, cat, id) => {
    let json = `{"${cat}_${id}_last": {"last_name":"${event.target.value}"}}`;
    let data = { ...this.state.passenger_detail, ...JSON.parse(json) };
    this.setState({ passenger_detail: data });

  }
  changeTitle = (event, cat, id) => {
    let json = `{"${cat}_${id}_title": {"title":"${event.target.value}"}}`;

    let data = { ...this.state.passenger_detail, ...JSON.parse(json) };

    this.setState({ passenger_detail: data });

  }
  HandlePaynow = (event) => {
    event.preventDefault();

  }
  getFlightById = (list, id) => {
    console.log(list);
    let arr = id.split('_');
    let ele = list.results.find(val => {
      return val.id == id;
    });
    return ele;
  }
  PostBooking = (result, id) => {

    console.log(result);
    let len = result.itineraries[0].outbound.flights.length - 1;
    let detail = result.itineraries[0].outbound;
    this.setState({ airline: detail.flights[0].marketing_airline });
    let data = {
      vas: {
        coupon_used: (this.props.coupon != ''),
        coupon_code: (this.props.coupon != '') ? this.props.coupon.coupon_code : '',
        addons_ammount: this.props.addons,
        cancel_insurance: this.props.cancel_insurance,
        travel_insurance: this.props.travel_insurance,
      },
      tax: result.fare.price_per_adult.tax,
      total_price: this.props.total + this.props.addons,
      total_fare_flight: this.props.total,
      email: this.state.email,
      mobile: this.state.mobile,
      passenger_list: [this.state.passenger_detail],
      departs_at: detail.flights[0].departs_at,
      arrives_at: detail.flights[len].arrives_at,
      origin_airport: detail.flights[0].origin.airport,
      origin_terminal: detail.flights[0].origin.terminal,
      destination_airport: detail.flights[len].destination.airport,
      destination_terminal: detail.flights[len].destination.terminal,
      operating_airline: detail.flights[0].marketing_airline,
      flight_number: detail.flights[0].flight_number,
      aircraft: detail.aircraft,
      pnr: this.state.pnr,
      booking_id: randomize('0', 12),
      travel_class: this.props.class,
      booking_type: 'RoundTrip'
    }
    var item = localStorage.getItem('userdata');
    if (item != null) {
      data.user_email = JSON.parse(item)[0].email;
    }
    fetch(baseurl + 'booking', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        let arr = id.split('_');
        this.setState({ [`post_${arr[1]}`]: true });
      });
  }


  HandleSubmit = (event) => {
    event.preventDefault();

    let total = 0;

    let data = JSON.parse(sessionStorage.getItem('multicitybooking'));
    let add = data.add;
    // console.log(this.props.addons);
    // return false;
    this.setState({ booking_button: true });

    for (let i = 0; i < add; i++) {
      this.PostBooking((this.getFlightById(data[`result_${i}`], data[`selected_${i}_id`])), data[`selected_${i}_id`]);
    }

    // this.PostBooking(this.props.roundout,true,total);


  }
  openLogin = () => {
    $('#modal1').modal('open');

  }
  render() {
    var item = localStorage.getItem('userdata');
    console.log(this.props.cancel_insurance, this.props.travel_insurance);
    let button = '';
    if (item != null) {
      button = <button className="col s12 m7 l7 btn btn-default right" type="submit" disabled={this.state.booking_button} >PayNow</button>;
    }
    else {
      button = <div className="col s12 m7 l7" style={{ marginTop: "10px" }}>
          <button className="col s8 m8 l8 btn btn-default" type="submit" disabled={this.state.booking_button}  >Checkout as Guest</button>
          <button className="col s4 m4 l4 btn btn-default right" id="login" type="button" onClick={this.openLogin} disabled={this.state.booking_button} >Login</button>
      </div>;
    }
    if (this.state.post_0 && this.state.post_1) {
      return <Redirect to={`/booked/${this.state.booking_id}/${this.state.airline}`} />
    }
    console.log(this.state);

    return (
      <div className="col s12 m12 l12">
        {(this.state.booking_button) ? <FullScreenSpinner /> : ''}
        <div className="card-panel">

          <div className="borderBtm width100"><span className="badge" style={{ color: "white" }}><b>2</b></span> Passenger Details</div>

          <form onSubmit={this.HandleSubmit}>
            {this.props.adult.map((val, index) => {
              return (
                <div className="row valign-wrapper" key={`adult_${index}`}>
                  <span className="col s12 l2 center-align"> <i className="material-icons prefix">person</i> Adult {index + 1}</span>
                  <div className="col s12 l2" style={{ marginTop: "10px" }}>
                    <select className="browser-default" onChange={(event) => { this.changeTitle(event, 'adult', index) }} required>
                      <option value="" >Title</option>
                      <option value="1">Ms</option>
                      <option value="2">Mr</option>
                      <option value="2">Mrs</option>
                    </select>
                  </div>
                  <div className="input-field col s12 l4">
                    <input key={`adult_first_${index}`} required type="text" placeholder="First Name" defaultValue={this.state[`adult_${index}_first`]} className="validate" pattern="[a-zA-Z\s]+" title="Please Enter Character only" id={index} onChange={(event) => { this.changeFirstName(event, 'adult', index) }} />
                    
                  </div>
                  <div className="input-field col s12 l4">
                    <input id={`adult_last_${index}`} required type="text" placeholder="Last Name" defaultValue={this.state[`adult_${index}_last`]} className="validate" pattern="[a-zA-Z]+" title="Please Enter Character only" onChange={(event) => { this.changeLastName(event, 'adult', index) }} />
                    
                  </div>

                </div>



              );
            })}
            {this.props.child.map((val, index) => {
              return (
                <div className="row valign-wrapper" key={`child_${index}`}>
                  <span className="col s12 l2 center-align"> <i className="material-icons prefix">person</i> Child {index + 1}</span>
                  <div className="col s12 l2" style={{ marginTop: "10px" }}>
                    <select className="browser-default" onChange={(event) => { this.changeTitle(event, 'child', index) }} required>
                      <option value="" >Title</option>
                      <option value="1">Miss</option>
                      <option value="2">Master</option>
                    </select>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id={`child_first_${index}`} required type="text" className="validate" pattern="[a-zA-Z\s]+" title="Please Enter Character only" onChange={(event) => { this.changeFirstName(event, 'child', index) }} />
                    <label htmlFor={`child_first_${index}`}>First Name</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id={`child_last_${index}`} required type="text" className="validate" pattern="[a-zA-Z]+" title="Please Enter Character only" onChange={(event) => { this.changeLastName(event, 'child', index) }} />
                    <label htmlFor={`child_last_${index}`}>Last Name</label>
                  </div>

                </div>



              );
            })}
            {this.props.infant.map((val, index) => {
              return (
                <div className="row valign-wrapper" key={`infant_${index}`}>
                  <span className="col s12 l2 center-align"> <i className="material-icons prefix">person</i> Infant {index + 1}</span>
                  <div className="col s12 l2" style={{ marginTop: "10px" }}>
                    <select className="browser-default" onChange={(event) => { this.changeTitle(event, 'infant', index) }} required>
                      <option value="" >Title</option>
                      <option value="1">Miss</option>
                      <option value="2">Master</option>
                    </select>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id={`infant_first_${index}`} required type="text" className="validate" pattern="[a-zA-Z\s]+" title="Please Enter Character only" onChange={(event) => { this.changeFirstName(event, 'infant', index) }} />
                    <label htmlFor={`infant_first_${index}`}>First Name</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id={`infant_last_${index}`} required type="text" className="validate" pattern="[a-zA-Z]+" title="Please Enter Character only" onChange={(event) => { this.changeLastName(event, 'infant', index) }} />
                    <label htmlFor={`infant_last_${index}`}>Last Name</label>
                  </div>

                </div>



              );
            })}
            <div className="row">

              <div className="row">
                <div className="input-field col s6">
                  <i className="material-icons prefix">email</i>
                  <input id="email" type="email" className="validate" defaultValue={this.state.email} placeholder="Email" onChange={(event) => { this.setState({ email: event.target.value }) }} />
                  
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">phone</i>
                  <input disabled={this.state.booking_button} id="mobile" defaultValue={this.state.mobile} type="text" placeholder="Mobile" maxLength={10} className="validate" required pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="Enter a valid number starting with country code or 7, 8 or 9" onChange={(event) => { this.setState({ mobile: event.target.value }) }} />
                  
                </div>
              </div>
              <div class="input-field col s12">
                <div className="divider"></div>
                <div className="col s12 m5 l5" style={{ marginTop: "10px" }}>
                  <select className="browser-default" required id="paymentmethod">
                    <option value="" >Select Payment Method</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="net">NetBanking</option>
                    <option value="wallet">Wallet</option>
                  </select>
                </div>
                {button}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PassengerDetail;
