import React, { Component } from 'react';
import Header from '../../../../header/js/Header';
import {Link,withRouter} from 'react-router-dom';
import AirlineLogo from '../../../OneWayBooking/AirlineLogo';
class PaymentPage extends Component {
    findAirline=(code)=>{
    return AirlineLogo.find((val=>{
      return val.code==code;
    }))
        }
  render() {
    

    return (
       <div className="col s12 m12 l12">
         <Header/>
      <div className="row">
          <div className="col s12 m12 l12">
            <div className="center">
              <h5 style={{paddingTop:'20px'}}>Order id #{this.props.match.params.booking_id}</h5>
              <h2 >Booking Successful</h2>
              <h5>Booking Summary has been sent to your mail.</h5>
              <Link  to="/" className="btn btn-default" style={{marginTop:'20px'}}>Home</Link><a  href={`https://${this.findAirline(this.props.match.params.airline).url}`} target="_blank" className="btn btn-default" style={{marginTop:'20px'}}>WebCheckin</a>
            </div>

          </div>
             
                
                </div>
            
        
       </div>
    );
  }
}

export default withRouter(PaymentPage);


