import React, { Component } from "react";
import $ from "jquery";

class RecommendationViewer extends Component {

componentDidMount(){

  fetch("http://gotripwtapi.azurewebsites.net/recommendation/all")
      .then(val => val.json())
      .then(val => {
        this.setState({ coupon: val });
      });

}
constructor(props) {
  super(props)
  this.state = {
    recommendation: '',
  } 
}
delete(){
 console.log(this.props.r_code);
  let urlpost = "http://gotripwtapi.azurewebsites.net/recommendation/delete/"+this.props.r_code;
 
    fetch(urlpost, {
      method: "DELETE",
      body: JSON.stringify(),
    
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
      
}

  render() {
    return (
        
    <div class="col s6 m4 l3 ">
      <div class="card hoverable">
        <div class="card-image">
          <img src={this.props.image} style={{height:"300px"}}/>
          <span class="card-title">Card Title</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={this.delete}><i class="material-icons">delete</i></a>
        </div>
        <div class="card-content">
        
          <h5>Source:<h6>{this.props.source}</h6></h5>

          <h5>Source:<h6>{this.props.destination}</h6></h5>
          
        </div>
      </div>
    </div>
  
    );
}
}

export default RecommendationViewer;


