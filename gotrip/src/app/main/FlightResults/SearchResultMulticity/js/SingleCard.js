import React, { Component } from 'react';
import '../css/SingleCard.css';
import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
import {getAirline,getHoursString,getMinuteString} from '../../../OneWayBooking/TicketBooking/js/SingleFlightCard';
import {DurationCalculate,calulateMinutes} from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
export default class SingleCard extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        let button=<button className="col s12 m12 l12 btn btn-default" onClick={(e)=>{this.props.changeFlight(e,this.props.flight.id,this.props.flight.id.split('_')[1])}} >Select</button>;

        if(this.props.selected_flight==this.props.flight.id)
        {
            button=<button className="col s12 m12 l12 btn btn-default" disabled onClick={(e)=>{this.props.changeFlight(e,this.props.flight.id,"as")}} >Selected</button>
        }
        let flight=this.props.flight.itineraries[0].outbound;
        return (
            <li className="card-panel" id={this.props.flight.id}>
                <div className="row" style={{ margin: 0 }} >
                    <div className="col s12 m12 l12">
                        <div className="col s2 m2 l2">
                            <img className="col s12 m12 l12" src={getAirline(flight.flights[0].marketing_airline).image} style={{width: 50, height: 50}}/>
                        </div>
                        <div className="col s5 m5 l5">
                            <p className="col s4 m4 l4" style={{ margin: 0 }}><b>{flight.flights[0].origin.airport}{' '}{getHoursString(new Date(flight.flights[0].departs_at).getHours())}:{getMinuteString(new Date(flight.flights[0].departs_at).getMinutes())}</b></p><i className="material-icons col s4 m4 l4">arrow_forward</i><p className="col s4 m4 l4" style={{ margin: 0 }}><b>{flight.flights[flight.flights.length-1].destination.airport}{' '}{getHoursString(new Date(flight.flights[flight.flights.length-1].arrives_at).getHours())}:{getMinuteString(new Date(flight.flights[flight.flights.length-1].arrives_at).getMinutes())}</b></p>
                            <div className="col s12 m12 l12">
                                <p id="plane_name" className="col s5 m5 l5" style={{ margin: 0 }}>{getAirline(flight.flights[0].marketing_airline).name}</p><p id="plane_name" className="col s7 m7 l7" style={{ margin: 0 }}>{flight.flights[0].marketing_airline}-{flight.flights[0].flight_number}</p>
                            </div>
                        </div>
                        <div className="col s3 m3 l3">
                            <p className="col s12 m12 l12 center" style={{ margin: 0 }}>{DurationCalculate(flight.flights[0].departs_at,flight.flights[flight.flights.length-1].arrives_at)}</p>
                            <p id="plane_name" className="col s12 m12 l12 center" style={{ margin: 0 }}>{flight.flights.length-1} Stop</p>
                        </div>
                        <div className="col s2 m2 l2">
                            <p className="col s12 m12 l12 center" style={{ margin: 0 }}><b>₹{parseFloat(this.props.flight.fare.total_price)*this.props.total_passenger}</b></p>
                            <div className="hide-on-small-only">{button}</div>
                        </div>
                        <div className="col s12 hide-on-med-and-up">{button}</div>
                    </div>
                </div>
            </li>
        );
    }
}

{/*<input className="with-gap"  type="radio" id={this.props.flight.id}  />
                                <label htmlFor="click"></label>*/}