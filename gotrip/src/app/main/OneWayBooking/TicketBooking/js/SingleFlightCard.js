import React, { Component } from 'react';
import airindia from '../../../../assets/images/air_india.jpg';
import AirlineLogo from '../../AirlineLogo';
import AirportList from '../../../FlightSearch/AirportDropdown/js/AirportList';
import { DurationCalculate } from '../../HelpingFunctions/durationCalulator';

export const getAirline = (code) => {
    let image = '';
    AirlineLogo.map(val => {

        if (val.code == code) {

            image = val;
        }
    });
    return image;
}

export const getHoursString = (hour) => {
    if (hour.toString().length <= 1) {
        return (`0${hour}`);
    }
    else {
        return hour;
    }
}
export const getMinuteString = (min) => {
    // console.log(min.toString().length);
    if (min.toString().length <= 1) {
        return (`${min}0`);
    }
    else {
        return min;
    }
}

class SingleFlightCard extends Component {
    constructor(props) {
        super(props);
    }
    getAirport = (code) => {
        let airport = AirportList.find(val => {
            return val.iata_code == code;
        })
        return airport;
    }


    render() {


        let departs_date = new Date(this.props.flightDetail.departs_at);
        let arrive_date = new Date(this.props.flightDetail.arrives_at);

        let origin_airport = (this.getAirport(this.props.flightDetail.origin.airport));
        let destination_airport = (this.getAirport(this.props.flightDetail.destination.airport));

        return (
            <div>

                <div className="row" style={{margin: 0}}>
                    <div className="col s12 m12 l12 ">
                            <div className="row" >

                                <div className="col s12 m2 l2 center-align">

                                    <img src={(getAirline(this.props.flightDetail.marketing_airline)).image} alt="xyz" />
                                    <div className="center">
                                        <span className="airline_name center">{(getAirline(this.props.flightDetail.marketing_airline)).name}</span><br />
                                        <span className="flight_number center">({this.props.flightDetail.marketing_airline}-{this.props.flightDetail.flight_number})</span><br />
                                        <span className="aircraft center">(Aircraft:{this.props.flightDetail.aircraft})</span>

                                    </div>


                                </div>
                                <div className="col s12 m3 l3 center-align">
                                    <div className="center">
                                        <span className="date">{departs_date.toDateString()}</span><br />
                                        <span className="source_code col s12 m12 l12">{`${this.props.flightDetail.origin.airport} `}<b>{getHoursString(departs_date.getHours())}:{getMinuteString(departs_date.getMinutes())}</b></span><br />
                                        <span className="col s12 m12 l3"></span>
                                        <span className="col s12 m12 l6 center airport">{`${origin_airport.airport}, ${origin_airport.location}, India`}</span><br />
                                        <span className="terminal col s12 m12 l12">(Terminal: {this.props.flightDetail.origin.terminal})</span><br />
                                    </div>
                                </div>
                                <div className="col s12 m4 l4" >
                                    <div className="col s3 show-on-small"></div>
                                    <div className="col s6 m12 l12">

                                        <div className=" row center" style={{margin: 0}}>
                                            <span className="col s3 m3 l3"><i className="large material-icons flight_icon" style={{ fontSize: "30px", color: "blue" }}>flight_takeoff</i></span><span className="col s6 m6 l6" style={{margin: 0}}>{DurationCalculate(this.props.flightDetail.departs_at, this.props.flightDetail.arrives_at)}</span><span className="col s3 m3 l3"><i className="large material-icons flight_icon" style={{ fontSize: "30px", color: "blue" }}>flight_land</i></span>


                                        </div>
                                    </div>
                                    <div className="col s3 show-on-small"></div>

                                </div>
                                <div className="col s12 m3 l3">
                                    <div className="center-align">
                                        <span className="date">{arrive_date.toDateString()}</span><br />
                                        <span className="source_code col s12 m12 l12">{`${this.props.flightDetail.destination.airport} `}<b>{getHoursString(arrive_date.getHours())}:{getMinuteString(arrive_date.getMinutes())}</b></span><br />
                                        <span className="col m12 l3"></span>
                                        <span className="col s12 m12 l6 center-align airport">{`${destination_airport.airport}, ${destination_airport.location}, India `}</span><br />
                                        <span className="terminal col s12 m12 l12">(Terminal: {this.props.flightDetail.destination.terminal})</span><br />
                                    </div>
                                </div>

                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SingleFlightCard;
