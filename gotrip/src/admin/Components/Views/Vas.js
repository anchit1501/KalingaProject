import React, { Component } from "react";
import CouponViewer from "../Discount_Coupon/Coupon_List";
import AddCoupon from"../Discount_Coupon/Add_Coupon";
import {Navbar} from '../Navbar/Navbar';

class Vas extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      refetch:false,
    }
  }
  changeRefetch=()=>{
    this.setState({refetch:!this.state.refetch});
  }
  render() {
    return (
      
      <div class="row" id="background" style={{ margin: "0", padding:20}}>
      
      <div className="col l8 m12 s12">
      <div className="row">
      <CouponViewer refetch={this.state.refetch} changeRefetch={this.changeRefetch} />
      </div>
      </div>
      <div className="col l4 m12 s12"><AddCoupon changeRefetch={this.changeRefetch} /></div>
       <div className="col l1"></div>
      </div>

         );
  }
}

export default Vas;