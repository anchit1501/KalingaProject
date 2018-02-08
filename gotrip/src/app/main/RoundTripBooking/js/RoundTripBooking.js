import React, { Component } from 'react';
import BookingSummaryRound from './BookingSummary/js/BookingSummary';
import PassengerDetail from '../PassengerDetail/js/PassengerDetail';
import TicketBooking from '../TicketBooking/js/TicketBooking';
import Header from '../../../header/js/Header';
import Footer from '../../../footer/js/footer.js';
import '../css/RoundTripBooking.css';

import { connect } from 'react-redux';
import { key } from '../../../../apikey';
import { withRouter, Redirect } from 'react-router-dom';
import Spinner from '../../FlightResults/spinner/js/spinner';
import VasComponent from '../../OneWayBooking/VasComponent/js/VasComponent';
class OneWayFlightDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addons: 0,
            resultout: this.props.roundout,
            resultin: this.props.roundin,
            fetching: true,
            travel_insurance: false,
            cancel_insurance: false,
            redirect_home: false,
            applied_coupon: ''
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    changeCoupon = (coupon) => {
        this.setState({ applied_coupon: coupon });
        console.log(this.state.applied_coupon);
    }
    calculateAddon = (total_passenger) => {
        let total = 0;
        if (this.state.travel_insurance) {
            // let amount=(parseInt(this.props.match.params.adult)+parseInt(this.props.match.params.child)+parseInt(this.props.match.params.infant))*399;
            total = (total_passenger * 100);
        }
        if (this.state.cancel_insurance) {
            // let amount=(parseInt(this.props.match.params.adult)+parseInt(this.props.match.params.child)+parseInt(this.props.match.params.infant))*399;
            total = total + (total_passenger * 399);
        }
        this.setState({ addons: total });
        console.log(this.state.addons);
    }
    changeTravelInsurance = (event) => {
        console.log("checkbox working");
        this.setState({ travel_insurance: event.target.checked });

        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        console.log(total_passenger);
        this.calculateAddon(total_passenger);
    }
    changeCancelInsurance = (event) => {
        // console.log("checkbox working");
        console.log(event.target.checked);
        this.setState({ cancel_insurance: event.target.checked });
        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        console.log(this.state.cancel_insurance);
        this.calculateAddon(total_passenger);

    }


    componentDidMount() {


        this.calculateAddon();
    }

    FetchData = () => {
        let api = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${this.props.match.params.src}&destination=${this.props.match.params.dest}&departure_date=${this.props.match.params.dept_date}&currency=INR&travel_class=${this.props.match.params.class}`

        console.log(api);
        fetch(api).then(res => res.json()).then(res => {
            // console.log(res);
            this.setState({
                result: 'res.results'
            });
            try {
                res.results.map((val) => {
                    // console.log(val.itineraries[0].outbound.flights[0].marketing_airline,this.props.match.params.airline);
                    if (val.itineraries[0].outbound.flights[0].marketing_airline == this.props.match.params.airline && val.itineraries[0].outbound.flights[0].flight_number == this.props.match.params.number) {
                        this.setState({ result: val });
                        console.log('working');
                        this.setState({
                            fetching: false
                        });
                    }
                    // console.log(val.itineraries[0].outbound.flights[0]);
                });
            }
            catch (e) {
                console.log(e);
                this.setState({ redirect_home: true });
            }


        });
    }
    componentWillMount() {
        var inbound = JSON.parse(sessionStorage.getItem('inbound'));
        var outbound = JSON.parse(sessionStorage.getItem('outbound'));
        this.setState({ resultout: outbound });
        this.setState({ resultin: inbound });
        if (!this.state.result) {
            this.setState({ fetching: true });
        } else {
            this.setState({ fetching: false });
        }

    }

    render() {

        // if(!this.state.resultout)
        // {
        //     // this.props.history.goBack();
        //     // window.location.reload();
        //     return <Redirect to={`/roundtripsearch/${this.props.match.params.src}/${this.props.match.params.dest}/${this.props.match.params.dept_date}/${this.props.match.params.return_date}/${this.props.match.params.class}/${this.props.match.params.adult}/${this.props.match.params.child}/${this.props.match.params.infant}`}/>
        // }
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;

        let total = parseInt(this.state.resultout.fare.total_price) + parseInt(this.state.resultin.fare.total_price);
        let taxes = parseInt(this.state.resultout.fare.price_per_adult.tax) + parseInt(this.state.resultin.fare.price_per_adult.tax);
        console.log(this.state.result);
        return (
            <div className="OneWayFlightDetail grey lighten-4">
                <Header />
                <div className="flightDetail1">
                    <div className="row">
                        <div className="col s12 m8 l8">
                            <div className="col s12 m12 l12">
                                <div className="card-panel white" style={{ marginBottom: 0 }}>
                                    <div className="row" style={{ margin: 0 }}>
                                        <p className="left" style={{ margin: 0, fontSize: '20px' }}>Ticket Details</p>
                                    </div>
                                </div>
                            </div>

                            <TicketBooking flightDetail={this.state.resultout.itineraries} refundable={this.state.resultout.fare.restrictions.refundable} />
                            <TicketBooking flightDetail={this.state.resultin.itineraries} refundable={this.state.resultin.fare.restrictions.refundable} />

                            <VasComponent travel_insurance={this.state.travel_insurance} cancel_insurance={this.state.cancel_insurance} changeCancelInsurance={this.changeCancelInsurance} changeTravelInsurance={this.changeTravelInsurance} />
                            <PassengerDetail coupon={this.state.applied_coupon} cancel_insurance={this.state.cancel_insurance} travel_insurance={this.state.travel_insurance} roundin={this.state.roundin} total_passenger={total_passenger} addons={this.state.addons} roundout={this.state.roundout} adult={arr.splice(0, parseInt(this.props.match.params.adult))} child={arr.splice(0, parseInt(this.props.match.params.child))} infant={arr.splice(0, parseInt(this.props.match.params.infant))} />
                        </div>

                        <BookingSummaryRound changeCoupon={this.changeCoupon} total={total} tax={taxes} passenger={total_passenger} cancel_insurance={this.state.cancel_insurance} {...this.props} travel_insurance={this.state.travel_insurance} />

                    </div>
                </div>
                <Footer />







            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        roundin: state.FlightSearchReducer.RoundTripResultInbound,
        roundout: state.FlightSearchReducer.RoundTripResultOutbound,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // storeOneWay: (obj)=>{

        //     dispatch(storeOneWay(obj));

        // },
        // showOneWayResult: (show)=>{
        //     dispatch(showOneWayResult(show));
        // }

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OneWayFlightDetail));