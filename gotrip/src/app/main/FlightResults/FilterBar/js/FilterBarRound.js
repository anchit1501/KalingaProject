import React, { Component } from 'react';
//import $ from 'jquery';
import '../css/FilterBarRound.css';

export default class FilterBarRound extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            non_stop: true,
            one_stop: true,
            two_stop: true,
        }
        
    }
    
    OneStop=()=>
    {
        this.setState({one_stop: !this.state.one_stop});
        
    }

    
    render(){
        
        return(
            <div>
                <div className="row">
                    <div className="col s12 m12 l12">
                        <div id="card_panel" className="card-panel">
                            <div id="filter_div_r" className="row">
                                <div className="col s12 m6 l3">
                                    <div className="col s12 m12 l12"><div className="row"><b className="col s9 m10 l8">Price Range:</b><b className="col s3 m2 l4 right">₹{this.props.range}</b></div></div>
                                    <p className="range-field col s12 m12 l12">
                                        <input type="range" id="test5" min={this.props.min_price} max={this.props.max_price} value={this.props.range} onChange={(event)=>this.props.rangeFilter(event.target.value)} step="100" />
                                    </p>
                                    <p className="col s8 m8 l8">₹{this.props.min_price}</p><p className="col m4 m4 l4 right">₹{this.props.max_price}</p>
                                </div>
                                <div className="col s12 m6 l2">
                                    <div className="col s12 m12 l12"><div className="row"><b>Stops:</b></div></div>
                                    <div className="col s12 m12 l12">
                                        <div id="remove_check_margin" className="row">
                                            <p className="col s4 m6 l12" style={{margin: 0}}>
                                                <input type="checkbox" className="filled-in" name="stops" id="nonstop" checked={!this.props.non_stop} onChange={this.props.nonStop} />
                                                <label htmlFor="nonstop">Non-Stop</label>
                                            </p>
                                            <p className="col s4 m6 l12" style={{margin: 0}}>
                                                <input type="checkbox" className="filled-in" id="1stop" name="stops" checked={!this.props.morethanone_stop} onChange={this.props.moreThanOneStop} />
                                                <label htmlFor="1stop">1+ Stop</label>
                                            </p>
                                            <p className="col s4 m4 l12" style={{marginTop: 0}}>
                                                <input type="checkbox" className="filled-in" id="2+stop" name="stops" checked={!this.props.zero_stop} onChange={this.props.zeroStop} />
                                                <label htmlFor="2+stop">All</label>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m12 l3">
                                    <div className="col s12 m12 l12"><div className="row"><b>Departure Time:</b></div></div>
                                    <div className="col s12 m12 l12">
                                        <div id="remove_check_margin" className="row">
                                        <p className="col s12 m6 l12" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="early_morining" checked={!this.props.early_morning} onChange={(event)=>{this.props.departureFilter(event,1)}} />
                                            <label htmlFor="early_morining">Early Morning(12am-6am)</label>
                                        </p>
                                        <p className="col s12 m6 l12" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="morning" checked={!this.props.morning} onChange={(event)=>{this.props.departureFilter(event,2)}} />
                                            <label htmlFor="morning">Morning(6am-11am)</label>
                                        </p>
                                        <p className="col s12 m6 l12" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="mid_day" checked={!this.props.mid_day} onChange={(event)=>{this.props.departureFilter(event,3)}} />
                                            <label htmlFor="mid_day">Mid-Day(11am-5pm)</label>
                                        </p>
                                        <p className="col s12 m6 l12" style={{marginTop: 0}}>
                                            <input type="checkbox" className="filled-in" id="evening"  checked={!this.props.evening} onChange={(event)=>{this.props.departureFilter(event,4)}} />
                                            <label htmlFor="evening">Evening(5pm-12am)</label>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m12 l4">
                                    <div className="col s12 m12 l12"><div className="row"><b>Airlines:</b></div></div>
                                    <div className="col s12 m12 l12">
                                        <div id="airlines_row" className="row">
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="air_india" checked={!this.props.airindia_1} onChange={(event)=>{this.props.airlineFilter(event,1)}} />
                                            <label htmlFor="air_india">AirIndia</label>
                                        </p>
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="indigo" checked={!this.props.indigo_2} onChange={(event)=>{this.props.airlineFilter(event,2)}} />
                                            <label htmlFor="indigo">IndiGo</label>
                                        </p>
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="vistara" checked={!this.props.vistara_3} onChange={(event)=>{this.props.airlineFilter(event,3)}} />
                                            <label htmlFor="vistara">Vistara</label>
                                        </p>
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="other" checked={!this.props.others_7} onChange={(event)=>{this.props.airlineFilter(event,7)}}/>
                                            <label htmlFor="other">Others</label>
                                        </p>
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="goair" checked={!this.props.goair_5} onChange={(event)=>{this.props.airlineFilter(event,5)}} />
                                            <label htmlFor="goair">GoAir</label>
                                        </p>
                                        <p className="col s6 m3 l4" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="spicejet" checked={!this.props.spicejet_6} onChange={(event)=>{this.props.airlineFilter(event,6)}}/>
                                            <label htmlFor="spicejet">SpiceJet</label>
                                        </p>
                                        <p className="col s6 m3 l5" style={{margin: 0}}>
                                            <input type="checkbox" className="filled-in" id="jetairways" checked={!this.props.jetairways_4} onChange={(event)=>{this.props.airlineFilter(event,4)}} />
                                            <label htmlFor="jetairways">Jet Airways</label>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}