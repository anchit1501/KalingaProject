import React, { Component } from 'react';
import { DurationCalculate } from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
// import airindia from '../../../../assets/images/air_india.jpg';
import SingleFlightCard from './SingleFlightCard';
import AirportList from '../../../FlightSearch/AirportDropdown/js/AirportList';
class TicketBooking extends Component {

    getAirport = (code) => {
        let airport = AirportList.find(val => {
            return val.iata_code == code;
        })
        return airport;
    }
    getLayover = (item1, item2) => {


        if (item1) {
            let data = <div className="row">
                <div className="col s12 m12 l12"><div className="col s12 m12 l12 center-align"><i className="large material-icons" style={{ fontSize: '15px', color: "red" }}>access_time</i>{`  ${this.getAirport(item1.origin.airport).location}  `}{DurationCalculate(item1.departs_at, item2.arrives_at)}  Layover</div></div>
            </div>;
            return data;
        }
        else {
            return '';
        }
    }
    render() {
        let refundable = '';
        if (this.props.refundable) {
            refundable = <span className="right non_refundable"> NON REFUNDABLE </span>;
        }
        else {
            refundable = refundable = <span className="right refundable">REFUNDABLE </span>;
        }
        //   console.log("size of array",this.props.flightDetail[0].outbound.flights.length);
        return (
            <div className="col s12 m12 l12">
                <div className="card-panel" style={{ marginBottom: '1px' }}>
                    <div className="row" style={{ marginBottom: 5 }}>
                        <span style={{ fontSize: '20px' }} className='left'>{this.props.flightDetail[0].outbound.flights[0].origin.airport}  -  {this.props.flightDetail[0].outbound.flights[this.props.flightDetail[0].outbound.flights.length - 1].destination.airport} <span className="hide-on-small-only">{`   ${new Date(this.props.flightDetail[0].outbound.flights[0].departs_at).toDateString()}`}</span></span>{refundable}
                    </div>
                    <div className="col s12 m12 l12">

                    </div>
                    {this.props.flightDetail[0].outbound.flights.map((val, index) => {

                        return (<div key={index} ><SingleFlightCard key={`<a_></a_>${index}`} flightDetail={val} />{this.getLayover(this.props.flightDetail[0].outbound.flights[index + 1], val)}</div>

                        );

                    })}


                    {/*            
    <div className="row">  
        <div className="col s12 m8 l8"><div className="col s3 m4 l5"></div><div className="valign-wrapper"><i className="large material-icons" style={{fontSize:'20px',color:"red"}}>access_time</i> BOM (Mumbai) 4h 40m Layover</div></div>
    </div>*/}


                    {/*end------------------*/}
                </div>
            </div>
        );
    }
}

export default TicketBooking;
