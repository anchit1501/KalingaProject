import React, { Component } from 'react';
import AirIndia from '../../../../assets/images/air_india.jpg';
import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
import { getAirline, getHoursString, getMinuteString } from '../../../OneWayBooking/TicketBooking/js/SingleFlightCard';
import { DurationCalculate, calulateMinutes } from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
export const getFlightNumbers = (val) => {
    let list = '';
    val.outbound.flights.map(val => {
        list = list + `${val.marketing_airline}${val.flight_number} `;

    });
    return list;
}
export default class SearchResultInbound extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        // console.log(this.props.flightDetail.itineraries[0].outbound);
        let checked = false;
        if (this.props.id == this.props.checked_id) {
            checked = true;
        }

        return (
            <li className="card-panel" id={this.props.id + 'C'} >
                <div className="row" style={{ margin: 0 }} >
                    <div className="col s12 m12 l12">
                        <div className="col s2 m2 l2">
                            <img className="col s12 m12 l12" src={getAirline(this.props.flightDetail.itineraries[0].outbound.flights[0].marketing_airline).image} />
                        </div>
                        <div className="col s5 m5 l5">
                            <p className="col s4 m4 l4 center" style={{ margin: 0 }}><b>{this.props.flightDetail.itineraries[0].outbound.flights[0].origin.airport} {getHoursString(new Date(this.props.flightDetail.itineraries[0].outbound.flights[0].departs_at).getHours())}:{getMinuteString(new Date(this.props.flightDetail.itineraries[0].outbound.flights[0].departs_at).getMinutes())}</b></p><i className="material-icons col s4 m4 l4 center">arrow_forward</i><p className="col s4 m4 l4 center" style={{ margin: 0 }}><b>{this.props.flightDetail.itineraries[0].outbound.flights[this.props.flightDetail.itineraries[0].outbound.flights.length-1].destination.airport} {getHoursString(new Date(this.props.flightDetail.itineraries[0].outbound.flights[this.props.flightDetail.itineraries[0].outbound.flights.length - 1].arrives_at).getHours())}:{getMinuteString(new Date(this.props.flightDetail.itineraries[0].outbound.flights[this.props.flightDetail.itineraries[0].outbound.flights.length - 1].arrives_at).getMinutes())}</b></p>
                            <div className="col s12 m12 l12">
                                <p id="plane_name" className="col s5 m5 l5" style={{ margin: 0 }}>{getAirline(this.props.flightDetail.itineraries[0].outbound.flights[0].marketing_airline).name}</p><p id="plane_name" className="col s7 m7 l7" style={{ margin: 0 }}>{getFlightNumbers(this.props.flightDetail.itineraries[0])}</p>
                            </div>
                        </div>
                        <div className="col s3 m3 l3">
                            <p className="col s12 m12 l12 center" style={{ margin: 0 }}>{DurationCalculate(this.props.flightDetail.itineraries[0].outbound.flights[0].departs_at, this.props.flightDetail.itineraries[0].outbound.flights[this.props.flightDetail.itineraries[0].outbound.flights.length - 1].arrives_at)}</p>
                            <p id="plane_name" className="col s12 m12 l12 center" style={{ margin: 0 }}>{this.props.flightDetail.itineraries[0].outbound.flights.length - 1} Stop</p>
                        </div>
                        <div className="col s2 m2 l2">
                            <p className="col s12 m12 l12 center" style={{ margin: 0 }}><b>₹{this.props.flightDetail.fare.total_price}</b></p>
                            <p className="col s7 m7 l7 right" style={{ margin: 0 }}>
                                <input className="with-gap" name={this.props.name} checked={checked} type="radio" id={this.props.id} value={this.props.id} onChange={(event) => { this.props.changeFlight(event, this.props.outbound) }} />
                                <label htmlFor={this.props.id}></label>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}