import React, { Component } from 'react';
import '../css/recommend.css';
import BackReco from '../../../assets/images/backreco1.gif';
import {connect} from 'react-redux';
import {Redirect,Link,withRouter} from 'react-router-dom';
import {storeOneWay,showOneWayResult} from '../../../state/action/FlightSearchAction.js';

class Recommend extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let date1 = new Date();
        let month = (date1.getMonth() + 1).toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        let date = (date1.getDate()).toString();
        if (date.length == 1) {
            date = '0' + date;
        }
        let year = date1.getFullYear().toString();
        var depart_date1 = `${year}-${month}-${date}`;
        return (
            <div className="col s12 m12 l12">
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/DEL/BLR/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Delhi</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Bangalore</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/DEL/BOM/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Delhi</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Mumbai</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/BLR/DEL/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Bangalore</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Delhi</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/DEL/GOI/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Delhi</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Goa</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/PNQ/DEL/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Pune</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Delhi</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/BOM/GOI/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Mumbai</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Goa</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/MAA/DEL/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Chennai</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Delhi</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/BOM/MAA/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Mumbai</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Chennai</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s4 m4 l4">
                <div id="rec_card" className="card hoverable" onClick={(e) => {this.props.history.push(`/onewaysearch/AMD/BOM/${depart_date1}/ECONOMY/1/0/0`);}}>
                    <div className="card-image">
                        <img className="responsive-img" src={BackReco}/>
                    </div>
                    <div className="card-content" style={{ padding: 0}}>
                        <div className="row center" style={{ margin: 0}}>
                            <p className="col s12 m5 l5">Ahmedabad</p>
                            <i className="col s12 m2 l2 material-icons">arrow_forward</i>
                            <p className="col s12 m5 l5">Mumbai</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>

                );
    }
}
export default  withRouter(Recommend);