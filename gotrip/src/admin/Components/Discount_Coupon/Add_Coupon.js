import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import "./coupon.css";
import Materialize from '../../../../node_modules/materialize-css/dist/js/materialize.min';

class AddCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }
  componentDidMount() {
    console.log('jqueryworking');
    
    $(document).ready(function() {
      $(".field input").keyup(function() {
        var empty = false;
        $(".field input").each(function() {
          if ($(this).val().length == 0) {
            
            empty = true;
          }
        });

        if (empty) {
          $(".actions button").attr("disabled", "disabled");
        } else {
           $(".actions button").attr("disabled", false);
        }
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    let name = document.getElementById("coupon_name").value;
    let code = document.getElementById("coupon_code").value;
    let value = document.getElementById("coupon_value").value;
    // let validity = document.getElementById("validity").value;
    // console.log(validity);
    let details = {
      coupon_name: name,
      coupon_code: code,
      coupon_value: value,
      // validity: validity
    };

    let urlpost = "http://gotripwtapi.azurewebsites.net/coupon/add";
    fetch(urlpost, {
      method: "POST",
      body: JSON.stringify(details),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {console.log("Success:", response);
      if(response.code===11000)
      {
        // alert("Coupon Already Exist");
        Materialize.toast('Coupon Already Exist', 4000);
      }
      document.getElementById("couponadd").reset();
    this.props.changeRefetch();});
    console.log("coupon");
    


    // setTimeout(function() {
    //   window.location.reload();
    // }, 2000);
    
  };
  render() {
    // let mindate = new Date().toISOString().split("T")[0];
    // let button = false;

  
    // let date = new Date();
    //     let year = parseInt(date.getFullYear()) + 1;
    //     let month = date.getMonth();
    //     let date1 = date.getDate();
       

    return (
      <div class="row" id="pad">
        <div class="card-panel hoverable" style={{padding:5}}>
          <div class="row">
          <div class="col s12 m12 l12 center"><h5><b>Add a Coupon</b></h5></div>
            <form id="couponadd" class="col s12 m12 l12" onSubmit={this.handleSubmit}>
              <div class="field">
               <div class="row">
                                  </div>
                <div class="row ">
                  <div class="input-field col l12 m12 s12">
                    <input
                      id="coupon_name"
                      type="text"
                      is="coupon_name"
                      class="validate"
                      required
                      pattern="[a-zA-Z ]+"
                      maxlength="10"
                      minLength="3"
                      title="Only letters"
                      onChange={()=>{this.componentDidMount()}}
                    />
                    <label for="coupon_name">Coupon Name</label>
                  </div>
                  <div class="input-field col l12  m12 s12">
                    <input
                      id="coupon_code"
                      type="text"
                      pattern="[A-Z0-9]+"
                      is="coupon_code"
                      class="validate"
                      required
                      maxlength="10"
                      minLength="3"
                      title="Only Capital Letters and Numbers"
                      onChange={()=>{this.componentDidMount()}}
                      
                    />
                    <label for="coupon_code">Coupon Code</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col l12  m12 s12">
                    <input
                      id="coupon_value"
                      type="number"
                      max="1000"
                      min="1"
                      
                      class="validate"
                      required

                      onChange={()=>{this.componentDidMount()}}
                      
                    />
                    <label for="disabled">Amount</label>
                  </div>
                </div>
               
              </div>
              <div class="actions">
                <button
                  disabled
                  type="submit"
                  class="waves-effect waves-light btn-large">
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCoupon;
