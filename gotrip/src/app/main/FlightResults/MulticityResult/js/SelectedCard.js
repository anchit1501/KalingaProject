import React, { Component } from 'react';
import PlaneIco from '../../../../assets/images/plane.png'
import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
import { getAirline, getHoursString, getMinuteString } from '../../../OneWayBooking/TicketBooking/js/SingleFlightCard';
import { DurationCalculate, calulateMinutes } from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
export default class SelectedCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let flight='';
        if(this.props.flag)
        {

        flight = this.props.flight.itineraries[0].outbound;

        }
        return (
            <div>
                {(this.props.flag)?<div className="col s12 m12 l6">
                    <div className="col s2 m2 l2 center">
                        <img src={getAirline(flight.flights[0].marketing_airline).image} />
                    </div>
                    <div className="col s2 m2 l2">
                        <p id="plane_name" className="col s12 m12 l12" style={{ margin: 0 }}>{getAirline(flight.flights[0].marketing_airline).name}</p>
                        <p id="plane_name" className="col s12 m12 l12" style={{ margin: 0 }}></p>
                    </div>
                    <div className="col s8 m8 l8">
                        <p className="col s5 m5 l5 center" style={{ margin: 0 }}>{flight.flights[0].origin.airport} <b>{getHoursString(new Date(flight.flights[0].departs_at).getHours())}:{getMinuteString(new Date(flight.flights[0].departs_at).getMinutes())}</b></p><i className="material-icons col s2 m2 l2 center">arrow_forward</i><p className="col s5 m5 l5 center" style={{ margin: 0 }}>{flight.flights[flight.flights.length - 1].destination.airport} <b>{getHoursString(new Date(flight.flights[flight.flights.length - 1].arrives_at).getHours())}:{getMinuteString(new Date(flight.flights[flight.flights.length - 1].arrives_at).getMinutes())}</b></p>
                        <p id="plane_name" className="col s6 m6 l6 center" style={{ margin: 0 }}>{DurationCalculate(flight.flights[0].departs_at, flight.flights[flight.flights.length - 1].arrives_at)}</p><p id="plane_name" className="col s6 m6 l6 center" style={{ margin: 0 }}>{flight.flights.length - 1} Stop</p>
                    </div>
                </div>:<div  className="col s5 m5 l5"><p><b>No Flights Available from {this.props.src} to {this.props.dest}</b></p></div>}


            </div>
        );
    }
}