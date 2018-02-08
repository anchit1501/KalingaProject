import React, {Component} from 'react';

import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
import {getAirline,getHoursString,getMinuteString} from '../../../OneWayBooking/TicketBooking/js/SingleFlightCard';
import {getFlightNumbers} from './../../SearchResultsRound/js/SearchResultsInbound';
import {DurationCalculate,calulateMinutes} from '../../../OneWayBooking/HelpingFunctions/durationCalulator';

export default class SelectedCard extends Component{
        
    render(){
        // console.log(this.props.flight);
        if(this.props.flight!=undefined && this.props.flight!=false)
        {
        var len=this.props.flight.itineraries[0].outbound.flights.length-1;

        }
        return(
                              <div> 
                                  {(this.props.flight!=undefined && this.props.flight!=false)? <div className="col s12 m6 l5" id={this.props.flight.id}>
                                                    <div className="col s2 m2 l2 center">
                                                        <img src={getAirline(this.props.flight.itineraries[0].outbound.flights[0].marketing_airline).image} />
                                                    </div>
                                                    <div className="col s2 m2 l2">
                                                        <p id="plane_name" className="col s12 m12 l12" style={{margin: 0}}>{getAirline(this.props.flight.itineraries[0].outbound.flights[0].marketing_airline).name}</p>
                                                        <p id="plane_name" className="col s12 m12 l12" style={{margin: 0}}></p>
                                                    </div>
                                                    <div className="col s8 m8 l8">
                                                        <p className="col s5 m5 l5 center" style={{margin: 0}}>{this.props.flight.itineraries[0].outbound.flights[0].origin.airport} <b>{getHoursString(new Date(this.props.flight.itineraries[0].outbound.flights[0].departs_at).getHours())}:{getHoursString(new Date(this.props.flight.itineraries[0].outbound.flights[0].departs_at).getMinutes())}</b></p><i className="material-icons col s2 m2 l2 center">arrow_forward</i><p className="col s5 m5 l5 center" style={{margin: 0}}>{this.props.flight.itineraries[0].outbound.flights[this.props.flight.itineraries[0].outbound.flights.length-1].destination.airport }<b>{getHoursString(new Date(this.props.flight.itineraries[0].outbound.flights[len].arrives_at).getHours())}:{getHoursString(new Date(this.props.flight.itineraries[0].outbound.flights[len].arrives_at).getMinutes())}</b></p>
                                                        <p id="plane_name" className="col s6 m6 l6 center" style={{margin: 0}}>{DurationCalculate(this.props.flight.itineraries[0].outbound.flights[0].departs_at,this.props.flight.itineraries[0].outbound.flights[this.props.flight.itineraries[0].outbound.flights.length-1].arrives_at)}</p><p id="plane_name" className="col s6 m6 l6 center" style={{margin: 0}}>{this.props.flight.itineraries[0].outbound.flights.length-1} Stop</p>
                                                    </div>
                                                </div>:<div className="col s5 m5 l5 ">
                                                    <p><b>No Flights Available from {this.props.src} to {this.props.dest}</b></p></div>}
                              </div>
        );
    }
}