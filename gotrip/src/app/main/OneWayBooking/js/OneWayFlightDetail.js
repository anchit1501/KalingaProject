import React, { Component } from 'react';
import Header from '../../../header/js/Header';
import '../css/OneWayFlightDetail.css';
import BookingSummary from '../BookingSummary/js/BookingSummary';
import PassengerDetail from '../PassengerDetail/js/PassengerDetail';
import TicketBooking from '../TicketBooking/js/TicketBooking';
import result from './sampledata';
import { connect } from 'react-redux';
import { key } from '../../../../apikey';
import { withRouter, Redirect } from 'react-router-dom';
import Spinner from '../../FlightResults/spinner/js/spinner';
import VasComponent from '../VasComponent/js/VasComponent';
import Footer from '../../../footer/js/footer.js';

class OneWayFlightDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addons: 0,
            result: this.props.OneWay.OneWayFlightDetail.result,
            // result: result,
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
        this.setState({ travel_insurance: !this.state.travel_insurance });

        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        console.log(total_passenger);
        this.calculateAddon(total_passenger);
    }
    changeCancelInsurance = (event) => {
        console.log("checkbox working", this.state.cancel_insurance);

        this.setState({ cancel_insurance: !this.state.cancel_insurance });
        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        console.log(this.state.cancel_insurance);
        this.calculateAddon(total_passenger);

    }

    componentWillMount() {
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
        if (!this.state.result) {
            this.setState({ fetching: true });
        } else {
            this.setState({ fetching: false });
        }

    }

    render() {
        console.log(this.state);
        if (this.state.redirect_home) {
            return <Redirect to="/" />
        }

        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (!this.state.result) {
            this.FetchData();
        }
        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        console.log(this.state.result);
        return (
            <div className="OneWayFlightDetail grey lighten-4">
                <Header />

                <div className="flightDetail">
                    {(!this.state.fetching) ? <div className="row">
                        <div className="col s12 m8 l8">

                            <TicketBooking flightDetail={this.state.result.itineraries} refundable={this.state.result.fare.restrictions.refundable} />
                            <VasComponent travel_insurance={this.state.travel_insurance} cancel_insurance={this.state.cancel_insurance} changeCancelInsurance={this.changeCancelInsurance} changeTravelInsurance={this.changeTravelInsurance} />
                            <PassengerDetail result={this.state.result} travel_insurance={this.state.travel_insurance} cancel_insurance={this.state.cancel_insurance} total_passenger={total_passenger} addons={this.state.addons} class={this.props.match.params.class} total={parseFloat(this.state.result.fare.total_price) * total_passenger} tax={parseFloat(this.state.result.fare.price_per_adult.tax) * total_passenger} adult={arr.splice(0, parseInt(this.props.match.params.adult))} child={arr.splice(0, parseInt(this.props.match.params.child))} infant={arr.splice(0, parseInt(this.props.match.params.infant))} coupon={this.state.applied_coupon} />
                        </div>
                        <BookingSummary changeCoupon={this.changeCoupon} total={parseFloat(this.state.result.fare.total_price) * total_passenger} tax={parseFloat(this.state.result.fare.price_per_adult.tax) * total_passenger} cancel_insurance={this.state.cancel_insurance} {...this.props} travel_insurance={this.state.travel_insurance} />
                    </div> : <Spinner />}








                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        OneWay: state.OneWayFlightDetail,
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