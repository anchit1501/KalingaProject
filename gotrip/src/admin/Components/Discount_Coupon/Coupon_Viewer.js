import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import './coupon.css';
class CouponViewer extends Component{
constructor(props)
{ 
  super(props);
  this.state={
      coupon:[],
  }
}
componentWillMount(){
  fetch('http://gotripwtapi.azurewebsites.net/coupon/all').then(val=>val.json()).then((val)=>{
    
    // console.log(val);
    this.setState({coupon:val});
    // val.map(res=>{console.log(res);});
  }

  )
};
deletecoupon=(event,id)=>{
  let coupon=this.state.coupon[id];
  let urlpost = "http://gotripwtapi.azurewebsites.net/coupon/delete/"+coupon.coupon_code;
  console.log(coupon.coupon_code);
    fetch(urlpost, {
      method: "DELETE",
      body: JSON.stringify(),
      // headers: new Headers({
      //   "Content-Type": "application/json"
      // })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
      let arr=this.state.coupon;

      arr.splice(id,1);
      // console.log(this.state.coupon,id);
      this.setState({coupon:arr});
}
    render(){
     return(
   <div class="card hoverable blue darken-1" id="pad">
    <div class="card-title white-text">
      <p>Coupons</p> </div>
   
    <div class="card-content cyan lighten-2">
      
      <div id="all-coupons" className="bordered striped"> 
      <table>
        <thead>
          <tr>
              <th id="white1">Coupon Name</th>
              <th id="white1">Coupon Code</th>
              <th id="white1">Value</th>
              <th id="white1" >Validity</th>
              <th id="white1">Delete</th>
          </tr>
        </thead>

        <tbody>
         
          {this.state.coupon.map((val,index)=>{
            val.id=index;
            return(<tr>
            <td  id="white1">{val.coupon_name}</td>
            <td id="white1">{val.coupon_code}</td>
            <td id="white1">{val.coupon_value}</td>
            <td id="white1">{val.validity}</td>
            <td><button onClick={(event)=>{this.deletecoupon(event,val.id)}} id={val.id}>Delete</button></td>
          </tr>);
          })}
          
        </tbody>
      </table>
      </div>
      </div>
      </div>
  
        );
    }
}
export default CouponViewer;
