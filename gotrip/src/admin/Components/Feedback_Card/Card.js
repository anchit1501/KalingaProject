import React, { Component } from "react";
import { baseurl } from "../../../app/services/Baseurl";
import "./card.css";
import $ from 'jquery';
import Materialize from '../../../../node_modules/materialize-css/dist/js/materialize.min';
class FeedbackCard extends Component {
constructor(props)
{
  super(props);
  this.state={
   reply:''
  }
}
componentDidMount(){

   $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('#modal_review').modal('close');
      
  $('#textarea1').trigger('autoresize');
  });

  
}

sendMail=(mail)=>{
  
  if(this.state.reply="")
  {
    return false;
  }
 let  data={
    email:this.props.email,
    body: this.state.reply
  }
fetch(baseurl+'feedback/reply', {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {console.log('Success:', response);
 Materialize.toast('Email Sent', 4000);
this.setState({reply:''})});
}

  render() {
    return (
      <div id={this.props.id}className="col s6 m4 l2">
          <div id="removepadding_card"class="card1 hoverable col s12 m12 l12 ">
            <div class="top-section">
              <div class="avatar">
                <img src="http://fillmurray.com/64/64" />
              </div>
            </div>
            <div class="bottom-section">
            <br/>
              <b className="col s12 m12 l12 truncate">{this.props.email}</b>
              <p>
                <p className="col s12 m12 l12 truncate" >{this.props.message}</p>
              </p>
            </div>
            <div class="card1-footer  valign-wrapper" style={{ padding: "15px" }}>
            <div className="col l6 m6 s6"> <button class="btn-floating btn-large waves-effect waves-light hoverable red modal-trigger" href={`#modal_review_${this.props.id}`}>
                <i class="material-icons medium">email</i>
              </button></div>
             
              <div className="col l6 m6 s6">
              <a class="modal-trigger" href={`#modal_msg_${this.props.id}`}><i class="material-icons right">info</i></a></div>
            </div>
           
  
   <div id={`modal_review_${this.props.id}`} class="modal modal bottom-sheet" >
    <div class="modal-content">
      <div class="row" style={{margin:0}}>
      <div class="col s12 m12 l12">
        <div class="card-panel teal">
          <h5 className="white-text" style={{margin:0}}>Send Reply</h5>
        </div>
      </div>
    </div>
      <div className="row">
        
        <div class="input-field col s12" style={{margin:0}}>
        
          <textarea id="textarea1" class="materialize-textarea" style={{margin:0}} placeholder="Enter Message Here" value={this.state.reply} onChange={(e)=>{this.setState({reply:e.target.value})}}></textarea>
          <label for="textarea1">Enter Message Here</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a onClick={this.sendMail} class="modal-action modal-close waves-effect waves-green btn-flat">Send</a>
    </div>
  </div>
  </div>
          
  <div id={`modal_msg_${this.props.id}`} class="modal">
    <div class="modal-content"  >
    <div style={{padding:"20px"}}>
      <h4  class="center-align">{this.props.email}  says-</h4>
      <hr/>
      <p className="center-align"><b>"</b>  {this.props.message}  <b>"</b></p>
      </div>
    </div>
    <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
          </div>
    );
  }
}

export default FeedbackCard;
