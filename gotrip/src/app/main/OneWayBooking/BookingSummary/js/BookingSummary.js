import React, { Component } from 'react';
import $ from 'jquery';
import CouponModal from '../../../RoundTripBooking/CouponModal/js/CouponModal';
class BookingSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_tax: this.props.tax,
            total_fare: this.props.total,
            addOns: 0,
            entered_coupon: '',
            coupon: [],
            coupon_error: false,
            applied_success: false,
            coupon_error_msg: '',
            applied_coupon: null,

        }
    }
    clearCoupon = () => {
        this.setState({ applied_coupon: null });
        this.setState({ coupon_error: '' });
        this.props.changeCoupon("");
        this.setState({ applied_success: false });
        this.setState({ entered_coupon: '' });
        

    }
    applyCouponViaModal = (coupon) => {
        this.setState({ applied_coupon: coupon });
        this.setState({ applied_success: true });
        this.setState({ entered_coupon: coupon.coupon_code });
        this.setState({ coupon_error_msg: coupon.coupon_code });
        $('#coupononeway').modal('close');

    }
    applyCoupon = (event) => {
        event.preventDefault();
        this.setState({ coupon_error: false });
        this.setState({ coupon_error_msg: '' });
        this.setState({ applied_success: false });
        let entered_coupon = this.state.entered_coupon;
        console.log(entered_coupon);
        if (entered_coupon == '') {
            this.setState({ coupon_error_msg: "please enter coupon" });
            this.setState({ coupon_error: true });
            return false;
        }

        let c = this.state.coupon.find((val) => {
            return val.coupon_code == entered_coupon;

        })
        if (c) {
            this.setState({ coupon_error_msg: "" });
            this.setState({ applied_coupon: c });
            this.props.changeCoupon(c);
            this.setState({ coupon_error_msg: c.coupon_code });
            this.setState({ applied_success: true });
        }
        else {
            this.setState({ coupon_error: true });

            this.setState({ coupon_error_msg: 'Invalid coupon' });
            this.setState({ applied_coupon: null });

        }

    }
    componentDidMount = () => {
        $(document).ready(function () {
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });

        fetch("http://gotripwtapi.azurewebsites.net/coupon/all").then(res => res.json()).then(res => this.setState({ coupon: res }));



    }
    render() {
        let total_amount = (this.props.total * total_passenger);
        let base_fare = total_amount - (this.props.tax * total_passenger);;
        let addOns = 0;
        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        if (this.props.cancel_insurance) {
            addOns = total_passenger * 399;
        }


        if (this.props.travel_insurance) {
            addOns = addOns + total_passenger * 100;
        }
        total_amount = this.state.total_fare + addOns;

        if (this.state.applied_coupon != null) {
            total_amount = total_amount - parseFloat(this.state.applied_coupon.coupon_value);
        }

        return (
            <div className="col s12 m4 l4 left-align">
                <div className="card-panel">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="row borderBtm width100">
                                <span className="left-align" style={{ fontSize: "20px" }}>Booking Summary</span><br />
                                <span id="bookingsumform" className="col s12 m12 l12 left-align" style={{ fontSize: "15px", margin: 0 }}>Travelers {adult} Adult {(this.props.match.params.child != '0') ? `${this.props.match.params.child} Child ` : ''}{(this.props.match.params.infant != '0') ? `${this.props.match.params.infant} Infant` : ''}</span>

                            </div>
                            <div className="col s12 m12 l12">
                                <div className="row" style={{ marginBottom: '0px' }}>

                                    <div id="bookingsumform" className="col s7 m7 l9"><span className="left" style={{ fontSize: "20px" }}>Base Fare x {total_passenger}</span></div>
                                    <div id="bookingsumform" className="col s5 m5 l3"><span className="right" style={{ fontSize: "20px" }}>₹{this.state.total_fare - this.state.total_tax}</span></div>
                                </div>
                                <div className="row">
                                    <span className="left" style={{ fontSize: "15px" }}>Taxes</span>

                                    <span className="right" style={{ fontSize: "15px" }}>₹{this.state.total_tax}</span>
                                </div>
                            </div>
                            <div className="col s12 m12 l12" >
                                <div className="col" >
                                    <div className="row">
                                        <span className="left-align" style={{ fontSize: "20px" }}>Add Ons</span><br />
                                        <span className="left-align" style={{ fontSize: "11px" }}>Insurance</span>
                                    </div>
                                </div><span className="right" style={{ fontSize: "20px" }}>₹{addOns}</span><br />
                            </div>
                            <div className=" col s12 m12 l12">
                                <div className="col s6 m6 l6"><a class="modal-trigger" href="#coupononeway">View Coupons</a></div>
                                <div className="col s6 m6 l6">
                                    {(this.state.applied_success) ? <span className="right" style={{ backgroundColor: '#00e676' }}><p style={{ color: 'white', margin: 0, paddingLeft: '5px', paddingRight: '5px' }}>Coupon Applied</p></span> : ''}

                                    {(this.state.coupon_error) ? <span className="right" style={{ backgroundColor: '#ffcc80' }}><p style={{ color: 'white', margin: 0, paddingLeft: '5px', paddingRight: '5px' }}>{this.state.coupon_error_msg}</p></span> : ''}
                                </div>
                                <div className="row">
                                    <form id="bookingsumform" className="col s12 m12 l12 center-align">
                                        <div className="row" style={{ margin: 0 }}>
                                            <div className="input-field col s8 m12 l8">

                                                <input id="icon_prefix" type="text" placeholder="Promo Code" style={{ margin: 0 }} onChange={(event) => this.setState({ entered_coupon: event.target.value })} value={this.state.entered_coupon} />
                                                {(this.state.applied_coupon != null) ? <div class="chip" style={{ marginTop: 5 }}>{`${this.state.coupon_error_msg}`}<i class="close material-icons" onClick={this.clearCoupon}>close</i></div> : ''}



                                            </div>
                                            <div className="input-field col s4 m12 l4">
                                                <button className="col s12 m12 l12 waves-effect waves-light btn" onClick={this.applyCoupon}>Apply</button>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>

                            {(this.state.applied_coupon) ?

                                <div className=" col s12 m12 l12">


                                    <span className="left-align" style={{ fontSize: "20px" }}>Coupon</span>


                                    <span className="right" style={{ fontSize: "20px" }}>-₹{this.state.applied_coupon.coupon_value}</span>
                                </div> : ''}
                            <div className="col s12 m12 l12" style={{ paddingTop: '20px' }}>
                                <div id="bookingsumform" className="col s8 m8 l8" >

                                    <span className="left" style={{ fontSize: "20px" }}>Total Amount</span>


                                </div>
                                <div id="bookingsumform" className="col s4 m4 l4"><span id="bookingsumform" className="right" style={{ fontSize: "20px" }}><p style={{ margin: 0 }}>₹{total_amount}</p></span></div>
                            </div>

                        </div>

                    </div>
                </div>
                <CouponModal coupon={this.state.coupon} applyCouponViaModal={this.applyCouponViaModal} id={"coupononeway"} />
            </div>
        );
    }
}

export default BookingSummary;
