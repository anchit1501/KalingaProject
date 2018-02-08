import React, {Component} from 'react';
import AirIndia from '../../../../assets/images/air_india.jpg';

export default class SearchResultOutbound extends Component{
    render(){
        return(
                                <li className="card-panel">
                                    <div className="row" style={{margin: 0}}>
                                        <div className="col s12 m12 l12">
                                            <div className="col s2 m2 l2">
                                                <img className="col s12 m12 l12" src={AirIndia} />
                                            </div>
                                            <div className="col s5 m5 l5">
                                                <p className="col s4 m4 l4 center" style={{margin: 0}}><b>21:35</b></p><i className="material-icons col s4 m4 l4 center">arrow_forward</i><p className="col s4 m4 l4 center" style={{margin: 0}}><b>13:40</b></p>
                                                <div className="col s12 m12 l12">
                                                    <p id="plane_name" className="col s5 m5 l5" style={{margin: 0}}>Air India</p><p id="plane_name" className="col s7 m7 l7" style={{margin: 0}}>AI474, AI433</p>
                                                </div>
                                            </div>
                                            <div className="col s3 m3 l3">
                                                <p className="col s12 m12 l12 center" style={{margin: 0}}>21hr 5min</p>
                                                <p id="plane_name" className="col s12 m12 l12 center" style={{margin: 0}}>1 Stop</p>
                                            </div>
                                            <div className="col s2 m2 l2">
                                                <p className="col s12 m12 l12 center" style={{margin: 0}}><b>₹9313</b></p>
                                                <p className="col s7 m7 l7 right" style={{margin: 0}}>
                                                    <input class="with-gap" name="group1" type="radio" id="test1" />
                                                    <label htmlFor="test1"></label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
        );
    }
}