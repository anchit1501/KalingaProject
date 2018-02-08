import React, { Component } from 'react';
import '../css/SearchResultMulticity.css';

import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
import {getAirline,getHoursString,getMinuteString} from '../../../OneWayBooking/TicketBooking/js/SingleFlightCard';
import {DurationCalculate,calulateMinutes} from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
import SingleCard from './SingleCard';
export default class SearchResultMulticity extends Component {
    test=()=>{
        console.log("working");
    }
    render() {
    //    let list=this.props.results.
        return (
            <div>
                {
                    this.props.flight.results.map(val=>{
                        return <SingleCard flight={val} id={this.props.flight.id} changeFlight={this.props.changeFlight} selected_flight={this.props.selected_flight} total_passenger={this.props.total_passenger} />
                    })
                }
            </div>
        );
    }
}