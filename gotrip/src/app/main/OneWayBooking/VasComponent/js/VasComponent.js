import React, { Component } from 'react';
import $ from 'jquery';
import { bajaj } from "../../../../assets/images/bajaj.png";
class VasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drop: true
        }
    }
    componentDidMount() {
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });

    }
    dropChange = () => {
        this.setState({ drop: !this.state.drop });
    }
    render() {
        console.log(this.props);

        return (
            <div className="col s12 m12 l12">
                <ul class="collapsible" data-collapsible="accordion">
                    <li>
                        <div class="collapsible-header valign-wrapper" onClick={this.dropChange} ><span style={{ fontSize: '25px' }}>Add Ons</span><i class="material-icons">{(this.state.drop) ? 'arrow_drop_down' : 'arrow_drop_up'}</i><span className="badge" style={{ color: "white", marginRight: '10px' }}><b>1</b></span></div>
                        <div class="collapsible-body">
                            <div className="row" style={{ margin: 0 }}>
                                <p>
                                    <input type="checkbox" className="filled-in" id="travel_insurance" onChange={this.props.changeTravelInsurance} checked={this.props.travel_insurance} />
                                    <label htmlFor="travel_insurance">Secure your trip with BAJAJ ALLIANZ Travel Insurance at ₹ 100 per passenger <img style={{ height: '20px', paddingLeft: '10px' }} src="data:image/png;base64,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" alt="" /></label>
                                </p>
                                <div className="row" style={{ marginBottom: 0 }}>
                                    <div className="col m1 l1"></div>
                                    <div className="col s12 m10 l10" style={{ borderWidth: '5px', backgroundColor: '#fafafa' }}>
                                        <div className=" row" style={{ marginBottom: 0 }}>
                                            <div className="col s6 m3 l3" >
                                                <p>Trip Cancellation
        Reimbursed
            upto ₹ 10,000*</p>
                                            </div>
                                            <div className="col s6 m3 l3">
                                                <p>Baggage Loss
Reimbursed
upto ₹ 5,000*</p>
                                            </div>
                                            <div className="col s6 m3 l3">
                                                <p>
                                                    Flight Delay
            Reimbursed
            upto ₹ 2,500*
            </p>
                                            </div>
                                            <div className="col s6 m3 l3">

                                                <p>
                                                    Medical Emergency
Reimbursed
upto ₹ 1,00,000*
            </p>
                                            </div>

                                            <div className="row right">
                                                <span style={{ color: 'grey', fontSize: '10pt' }}>*Insurance is only valid for Indian Citizens from 3 months to 70 years of age.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p >
                                    <input type="checkbox" className="filled-in" id="cancel_insurance" onChange={this.props.changeCancelInsurance} checked={this.props.cancel_insurance} />
                                    <label htmlFor="cancel_insurance">Cancellation Protection - Cancel your ticket htmlFor free by just paying ₹ 399/- per traveller</label>
                                </p>
                                <div className="row">
                                    <div className="col m2 l2"></div>
                                    <div className="col s12 m4 l4">
                                        <div className="card-panel hoverable deep-orange lighten-3" style={{ color: 'white', margin: 0 }}>
                                            <div className="row" style={{ fontSize: '15pt' }}>
                                                <b>Without Protection</b>
                                            </div>
                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <span className="left">Goibibo Fee</span><span className="right">₹300</span>
                                            </div>
                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <span className="left">Airline Fee</span><span className="right">₹3000</span>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="row" style={{ marginTop: '10px', marginBottom: 0 }}>
                                                <span className="left">Total Fee</span><span className="right">₹3300</span>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col s12 m4 l4">
                                        <div className="card-panel hoverable green accent-2" style={{ color: 'white', margin: 0 }}>
                                            <div className="row" style={{ fontSize: '15pt' }}>
                                                <b>With Protection</b>
                                            </div>
                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <span className="left">Goibibo Fee</span><span className="right">₹0</span>
                                            </div>
                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <span className="left">Airline Fee</span><span className="right">₹0</span>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="row" style={{ marginTop: '10px', marginBottom: 0 }}>
                                                <span className="left">Total Fee</span><span className="right">₹0</span>
                                            </div>
                                        </div>


                                    </div>



                                </div>
                                <div className="row center-align">∗ Last chance. You will not be able the avail cancellation protection once booking is complete</div>







                            </div>

                        </div>
                    </li>

                </ul>




                {/*<div className="borderBtm width100"><span className="badge" style={{color:"white"}}><b>1</b></span> Add Ons</div>*/}

            </div>
        );
    }
}

export default VasComponent;
