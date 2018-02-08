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
      fetching:true
  }
}
reFetchData=()=>{
  this.componentWillMount();
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
      if(this.props.refetch)
      {
        this.componentWillMount();
        this.props.changeRefetch();
      }
     return(

          this.state.coupon.map((val,index)=>{
            val.id=index;
            return(
      
      <div class="col s12 m6 l4">
    <div class="card-panel blue white-text" style={{padding:10}}>

      <div class="row valign-wrapper" style={{margin:0}}>
      <div class="col l12 m12 s12">
        <div class="col l3 m3 s3">
          <i class="material-icons medium ">star</i>
        </div>
        <div class="col l6 m6 s6 left">
          <h6><b>{val.coupon_code}</b></h6>
          <h6>{val.coupon_name}</h6>
          
        </div>
        <div class="col l3 m3 s3 ">
          <a class="btn-floating  waves-effect waves-light red"><i class="material-icons" onClick={(event)=>{this.deletecoupon(event,val.id)}} id={val.id}>delete</i></a></div>
       </div>
      </div>
    </div>
      </div>
   
    
            )
          
}  
)
  
        );
     
    }
}
export default CouponViewer;
