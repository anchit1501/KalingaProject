import React, { Component } from 'react';
import $ from 'jquery';
import '../css/SearchResults.css';
import airindia from '../../../../assets/images/air_india.jpg';
import goair from '../../../../assets/images/go_air.jpg';
import indigo from '../../../../assets/images/indigo.png';
import jetairways from '../../../../assets/images/jet_airways.png';
import spicejet from '../../../../assets/images/spicejet.png';
import vistara from '../../../../assets/images/vistara.png';
import airasia from '../../../../assets/images/airasia.png';
import singapore from '../../../../assets/images/singapore-airlines-logo.jpg';
import Fade from 'react-reveal/Fade';


class SearchResults extends Component{
    constructor(){
        super();
        this.state = {
            details: 0,
        }
        this.handleDetails = this.handleDetails.bind(this);
    }

    componentDidMount(){
        $(document).ready(function(){
            $('ul.tabs').tabs();
        });
        $(document).ready(function(){
            $('.modal').modal();
        });
    }
    getRoute=()=>{
        console.log(this.props.value.itineraries[0].outbound.flights.map(val=>val.destination.airport));
    }
    getTime(str)
    {
        let date=new Date(str);
        
        return `${(date.getHours().toString().length===1)?'0':""}${date.getHours()}:${date.getMinutes()}${(date.getMinutes().toString().length===1)?'0':""}`;
    }
    diff_minutes(dt2, dt1) 
        {

            var diff =(dt2.getTime() - dt1.getTime()) / 1000;
            diff /= 60;
            return `${parseInt(Math.abs(Math.round(diff))/60)}h ${Math.abs(Math.round(diff))%60}min`;
            
        }
        
    handleDetails(){
            if(this.state.details === 0){
                this.setState({details:1});
            }
            if(this.state.details === 1){
                this.setState({details:0});
            }
            this.componentDidMount();
        }
        
    render(){
        let details_icon = null;
        if(this.state.details === 0){
            details_icon = <i id="fli_det_arrow" className="material-icons col m2 l2">keyboard_arrow_down</i>;
        }
        if(this.state.details === 1){
            details_icon = <i id="fli_det_arrow" className="material-icons col m2 l2">keyboard_arrow_up</i>;
        }
        
        let index=Object.keys(this.props.value.itineraries[0].outbound.flights).length;
        
        

            let dt1 = new Date(this.props.value.itineraries[0].outbound.flights[0].departs_at);
            let dt2 = new Date(this.props.value.itineraries[0].outbound.flights[index-1].arrives_at);

        let flight_name = null;
        let flight_icon = null;
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "9W"){
            flight_icon = <img className="responsive-img" src={jetairways} />
            flight_name = " Jet Airways";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "AI"){
            flight_icon = <img className="responsive-img" src={airindia} />
            flight_name = " Air India";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "G8"){
            flight_icon = <img className="responsive-img" src={goair} />
            flight_name = " GoAir";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "6E"){
            flight_icon = <img className="responsive-img" src={indigo} />
            flight_name = " IndiGo";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "SG"){
            flight_icon = <img className="responsive-img" src={spicejet} />
            flight_name = " SpiceJet";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "UK"){
            flight_icon = <img className="responsive-img" src={vistara} />
            flight_name = " Vistara";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "AK"){
            flight_icon = <img className="responsive-img" src={airasia} />
            flight_name = " AirAsia";
        }
        if(this.props.value.itineraries[0].outbound.flights[0].marketing_airline === "H1"){
            flight_icon = <img className="responsive-img" src={singapore} />
            flight_name = " Singapore Airlines";
        }
        let airplane_code="";
        let flight_length = this.props.value.itineraries[0].outbound.flights.length;
        if(flight_length > 1){
            for(let i=0;i<this.props.value.itineraries[0].outbound.flights.length;i++){
                airplane_code = airplane_code + this.props.value.itineraries[0].outbound.flights[0].operating_airline + this.props.value.itineraries[0].outbound.flights[0].flight_number + " | ";
            }
            airplane_code = airplane_code.slice(0,(airplane_code.length-4));
        }
        else{
            airplane_code = this.props.value.itineraries[0].outbound.flights[0].operating_airline + this.props.value.itineraries[0].outbound.flights[0].flight_number;
        }
        let refund = null;
        if(this.props.value.fare.restrictions.refundable === true){
            refund = "Refundable";
        }
        else{
            refund = "Non-refundable";
        }
        let stops = "Non-Stop";
        if(flight_length > 1){
            stops = (flight_length - 1) + " Stops";
        }
        let Flight_details = null;
        if(this.state.details === 0){
            Flight_details = null;
        }
        let total_fare = parseFloat(this.props.value.fare.price_per_adult.total_fare);
        let id=this.props.id;
        //console.log();
        let rows = this.props.value.itineraries[0].outbound.flights.map((flight,index) => {
            //console.log(flight);
                return (
                    <li key={index}>
                        <div className="row" key={index}>
                            <div className="col m12 l12">
                                <b>{flight.origin.airport}->{flight.destination.airport}</b>
                            </div>
                            <div className="col m12 l12">
                                <div className="airline_logo col m1 l1"><p className="valign-wrapper center-align">{flight_icon}</p></div>
                                <div className="airplane_name col m3 l3"><p className="valign-wrapper center-align">{flight_name}</p><p id="airplane_code">{flight.operating_airline}{flight.flight_number}</p></div>
                                <div className="depart_time col m3 l3"><p className="valign-wrapper center-align"><b>{this.getTime(flight.departs_at)}</b></p><p id="airport_code">{flight.origin.airport}</p></div>
                                <div className="duration col m3 l3"><p id="icon_margin" className="material-icons center-align">access_time</p><p id="dur_margin" className="valign-wrapper center">{this.diff_minutes(new Date(flight.departs_at),new Date(flight.arrives_at))}</p></div>
                                <div className="arrive_time col m2 l2"><p className="valign-wrapper canter-align"><b>{this.getTime(flight.arrives_at)}</b></p><p id="airport_code">{flight.destination.airport}</p></div>
                            </div>
                        </div>
                    </li>
                );
            });
        let basefare = parseFloat(this.props.value.fare.total_price) - parseFloat(this.props.value.fare.price_per_adult.tax);
        if(this.state.details === 1){
            let tax = parseFloat(this.props.value.fare.price_per_adult.tax);
            Flight_details = <div id="delete_margin" className="row">
                            <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col l3"><a className="active black-text" href={`#${id}test1`}>Basic Details</a></li>
                                <li className="tab col l3"><a className="black-text" href={`#${id}test2`}>Fare Breakup</a></li>
                                <li className="tab col l3"><a className="black-text" href={`#${id}test3`}>Baggage Rules</a></li>
                                <li className="tab col l3"><a className="black-text" href={`#${id}test4`}>Cancellation</a></li>
                            </ul>
                            </div>
                                <div id={`${id}test1`} className="col m12 l12">
                                    <ul>
                                        {rows}
                                    </ul>
                                </div>
                                <div id={`${id}test2`} className="col m12 l12">
                                    <div id="delete_margin" className="row">
                                        <div className="col m6 l6">
                                            <div className="col m12 m12">
                                                <p className="col m10 l10">Basefare(per person)</p>
                                                <p className="col m2 l2 right">₹{basefare}</p>
                                                <div className="divider col m12 l12"></div>
                                                <p className="col m10 l10"><b>Basefare Total</b>(per person)</p>
                                                <p className="col m2 l2 right"><b>₹{basefare}</b></p>
                                            </div>
                                        </div>
                                        <div className="col m6 l6">
                                            <div className="col m12 l12">
                                                <p className="col m10 l10">Adult taxes & fees(per person)</p>
                                                <p className="col m2 l2 right">₹{tax}</p>
                                                <div className="divider col m12 l12"></div>
                                                <p className="col m10 l10"><b>Total Fare</b>(per person)</p>
                                                <p className="col m2 l2 right"><b>₹{total_fare}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id={`${id}test3`} className="col m12 l12">
                                    <div className="row">
                                        <div className="col m12 l12">
                                            <p id="baggage_rule">Check-in: 15 kg / person</p>
                                            <p id="baggage_rule">Cabin: 7 kg / person</p>
                                        </div>
                                        <div className="col m12 l12">
                                            <p id="baggage_rule">Disclaimer: Listed above is the baggage information from Airline distributionn system. Actual Information may differ under certain guidelines, including connecting flights or stopover. To confirm baggage Information for your reservation or for information on additional Baggage Please Confirm with the Airline.</p>
                                        </div>
                                    </div>
                                </div>
                                <div id={`${id}test4`} className="col m12 l12">
                                    <div id="delete_margin" className="row">
                                        <div className="col m12 l12">
                                            <p className="col m12 l12"><b>{this.props.value.itineraries[0].outbound.flights[0].origin.airport} - {this.props.value.itineraries[0].outbound.flights[index-1].destination.airport}</b></p>
                                            <p id="cancel_price" className="col m10 l10">Cancellation</p><p id="cancel_price" className="col m2 l2 right">₹2500</p>
                                            <p id="cancel_price" className="col m10 l10">GoTrip Cancellation Fee</p><p id="cancel_price" className="col m2 l2 right">₹200</p>
                                            <p id="cancel_price" className="col m10 l10">Date Change Fee</p><p id="cancel_price" className="col m2 l2 right">₹2500</p>
                                            <p id="cancel_price" className="col m10 l10">GoTrip Date Change Fee</p><p id="cancel_price" className="col m2 l2 right">₹200</p>
                                        </div>
                                        <div className="col m12 l12">
                                            <ol id="cancel_list">
                                                <li>Minimum 24h before the scheduled flight departure.</li>
                                                <li>Airline penalty needs to be reconfirmed prior to any amendents or cancellation.</li>
                                                <li>Disclaimer: Airline Penalty changes are indictive and can change without prior notice.</li>
                                                <li>N/A means Not Available. Please check with airline for penalty information.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
        }
        return(
            <Fade bottom>
            <li className="card-panel hoverable">
                <div id="card_results" className="row">
                    <div id="result" className="col s12 m12 l12">
                        <div className="airline_logo col s4 m1 l1"><p className="valign-wrapper center-align">{flight_icon}</p></div>
                        <div className="airplane_name col s8 m3 l3"><p className="valign-wrapper left-align">{flight_name}</p><p id="airplane_code" className="valign-wrapper left-align">{airplane_code}</p></div>
                        <div className="depart_time col s4 m1 l1"><p className="valign-wrapper left-align">{this.getTime(this.props.value.itineraries[0].outbound.flights[0].departs_at)}</p><p id="airport_code" className="valign-wrapper left-align">{this.props.value.itineraries[0].outbound.flights[0].origin.airport}</p></div>
                        <div className="arrive_time col s4 m1 l1"><p className="valign-wrapper left-align">{this.getTime(this.props.value.itineraries[0].outbound.flights[index-1].arrives_at)}</p><p id="airport_code" className="valign-wrapper left-align">{this.props.value.itineraries[0].outbound.flights[index-1].destination.airport}</p></div>
                        <div className="duration col s4 m2 l2"><p className="valign-wrapper left-align">{this.diff_minutes(dt1, dt2)}</p><p id="stops" className="valign-wrapper left-align">{stops}</p></div>
                        <div className="price col s4 m2 l2"><p className="valign-wrapper left-align"><b>₹{parseInt(total_fare)*(this.props.adult+this.props.child+this.props.infant)}</b></p><p id="refund" className="valign-wrapper left-align">{refund}</p></div>
                        <div className="book col s8 m2 l2"><p className="valign-wrapper center-align"><button className="waves-effect waves-light btn indigo darken-4 col s12 m12 l12 modal-trigger" id={`b_${this.props.id}`} onClick={this.props.HandleBook} >Book</button></p></div>
                    </div>
                    <div className="col m12 l12 hide-on-small-only"><p id="flight_details" className="indigo-text valign-wrapper right" onClick={this.handleDetails}><b id="flight_details_btn" className="col m10 l10">Flight Details</b>{details_icon}</p></div>
                    <div className="col m12 l12 hide-on-small-only">
                        {Flight_details}
                    </div>
                </div>
            </li>
            </Fade>
        );
    }
}
export default SearchResults;