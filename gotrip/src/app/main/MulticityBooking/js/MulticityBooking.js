import React, { Component } from 'react';
import PassengerDetail from '../PassengerDetail/js/PassengerDetail';
import VasComponent from '../../../main/OneWayBooking/VasComponent/js/VasComponent';
import TicketBooking from '../TicketBoooking/js/TicketBooking';
import BookingSummary from '../BookingSummary/js/BookingSummary';
import Header from '../../../header/js/Header';
import Footer from '../../../footer/js/footer';
import '../css/MulticityBooking.css';
// import Spinner from '../../FlightResults/spinner/js/spinner';
class MultiCityBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addons: 0,
            fetching: true,
            travel_insurance: false,
            cancel_insurance: false,
            redirect_home: false,
            applied_coupon: ''
        }

    }
    getTotalPrice = (data) => {
        let total = 0;
        for (let i = 0; i < data.add; i++) {
            total = total + parseFloat(this.getFlightById(data[`result_${i}`], data[`selected_${i}_id`]).fare.total_price);
            //console.log(this.getFlightById(data[`result_${i}`],data[`selected_${i}_id`]).fare.total_price);

        }
        return total;
    }
    changeCoupon = (coupon) => {
        this.setState({ applied_coupon: coupon });
        //console.log(this.state.applied_coupon);
    }
    getTotalTax = (data) => {
        let total = 0;
        for (let i = 0; i < data.add; i++) {
            total = total + parseFloat(this.getFlightById(data[`result_${i}`], data[`selected_${i}_id`]).fare.price_per_adult.tax);
            //console.log(this.getFlightById(data[`result_${i}`],data[`selected_${i}_id`]).fare,"tax");

        }
        return total;
    }
    getFlightById = (list, id) => {
        let arr = id.split('_');
        let ele = list.results.find(val => {
            return val.id == id;
        });
        return ele;
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
        //console.log(this.state.addons);
    }
    changeTravelInsurance = (event) => {
        //console.log("checkbox working");
        this.setState({ travel_insurance: !this.state.travel_insurance });

        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        //console.log(total_passenger);
        this.calculateAddon(total_passenger);
    }
    changeCancelInsurance = (event) => {
        //console.log("checkbox working", this.state.cancel_insurance);

        this.setState({ cancel_insurance: !this.state.cancel_insurance });
        let adult = parseInt(this.props.match.params.adult);
        let child = parseInt(this.props.match.params.child);
        let infant = parseInt(this.props.match.params.infant);
        let total_passenger = adult + child + infant;
        //console.log(this.state.cancel_insurance);
        this.calculateAddon(total_passenger);

    }
    render = () => {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let data = JSON.parse(sessionStorage.getItem('multicitybooking'));
        let total = this.getTotalPrice(data);
        let tax = this.getTotalTax(data);
        let total_passenger = parseInt(data.adult) + parseInt(data.child) + parseInt(data.infant);
        //console.log(data);
        //console.log(total,tax);
        return (
            <div className="grey lighten-4">
                <Header />
                <div className="flightDetail">
                    <div className="row">
                        <div className="col s12 m8 l8">
                            <div className="col s12 m12 l12">
                                <div className="card-panel white" style={{ marginBottom: 0 }}>
                                    <div className="row" style={{ margin: 0 }}>
                                        <p className="left" style={{ margin: 0, fontSize: '20px' }}>Ticket Details</p>
                                    </div>
                                </div>
                            </div>

                            <TicketBooking flightDetail={this.getFlightById(data.result_0, data.selected_0_id).itineraries} refundable={this.getFlightById(data.result_0, data.selected_0_id).fare.restrictions.refundable} />
                            <TicketBooking flightDetail={this.getFlightById(data.result_1, data.selected_1_id).itineraries} refundable={this.getFlightById(data.result_1, data.selected_1_id).fare.restrictions.refundable} />
                            {(data.result_2.length != 0) ? <TicketBooking flightDetail={this.getFlightById(data.result_2, data.selected_2_id).itineraries} refundable={this.getFlightById(data.result_2, data.selected_2_id).fare.restrictions.refundable} /> : ''}
                            {(data.result_3.length != 0) ? <TicketBooking flightDetail={this.getFlightById(data.result_3, data.selected_3_id).itineraries} refundable={this.getFlightById(data.result_3, data.selected_3_id).fare.restrictions.refundable} /> : ''}

                            <VasComponent travel_insurance={this.state.travel_insurance} cancel_insurance={this.state.cancel_insurance} changeCancelInsurance={this.changeCancelInsurance} changeTravelInsurance={this.changeTravelInsurance} />

                            <PassengerDetail result={this.state.result} travel_insurance={this.state.travel_insurance} cancel_insurance={this.state.cancel_insurance} total_passenger={total_passenger} addons={this.state.addons} class={data.class} total={parseFloat(total) * total_passenger} tax={parseFloat(tax) * total_passenger} adult={arr.splice(0, data.adult)} child={arr.splice(0, data.child)} infant={arr.splice(0, data.infant)} coupon={this.state.applied_coupon} />
                        </div>
                        <BookingSummary changeCoupon={this.changeCoupon} total={parseFloat(total) * total_passenger} tax={parseFloat(tax) * total_passenger} cancel_insurance={this.state.cancel_insurance} {...this.props} travel_insurance={this.state.travel_insurance} adult={data.adult} child={data.child} infant={data.infant} />
                    </div>








                </div>
                <Footer />
            </div>
        );
    }
}
export default MultiCityBooking;