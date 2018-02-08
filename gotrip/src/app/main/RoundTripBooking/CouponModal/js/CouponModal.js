import React, { Component } from 'react';
import $ from 'jquery';

class CouponModal extends Component {

  render() {

    return (

      <div id={this.props.id} class="modal bottom-sheet">
        <div class="modal-content">

          <div class="row" style={{ margin: 0 }}>
            <div class="col s12 m12 l12" >
              <div class="card-panel indigo lighten-2" style={{ marginBottom: '5px' }}>
                <span class="white-text">
                  <h4 style={{ margin: 0 }}>Coupons</h4>
                </span>
              </div>
            </div>
          </div>
          <div class="row" style={{ margin: 0 }}>
            <div class="col s12 m12 l12 ">
              {this.props.coupon.map(val => {
                return (
                  <div class="card-panel z-depth-0" style={{ margin: 0, marginBottom: '5px' }}>
                    <div className="row valign-wrapper" style={{ margin: 0 }}>
                      <div className="col s4 l4 m4">
                        <span className="black-text"><b>{val.coupon_code}</b></span>
                      </div>
                      <div className="col s4 l4 m4">
                        <span className="black-text">Get ₹{val.coupon_value} off on all flight bookings. </span>
                      </div>
                      <div className="col s4 l4 m4 center-align">
                        <span className="center-align"><button className="btn btn-default indigo darken-2" onClick={(e) => { this.props.applyCouponViaModal(val) }}>Apply</button></span>
                      </div>
                    </div>
                  </div>);
              })}


            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CouponModal;
