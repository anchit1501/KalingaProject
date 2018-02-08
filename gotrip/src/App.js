import React, { Component } from 'react';
import Header from './app/header/js/Header';
import Main from './app/main/js/Main';
import Footer from './app/footer/js/footer';
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/slick-carousel/slick/slick.min.js';
import {Route,Switch,Link} from 'react-router-dom';
import OneWayResult from './app/main/FlightResults/OneWayResult/js/OneWayResult';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import LoginPage from './app/main/LoginPage/js/LoginPage.js';
import SignUpPage from './app/main/SignUpPage/js/SignUpPage';
import OneWayFlightDetail from './app/main/OneWayBooking/js/OneWayFlightDetail';
import Bookings from './app/user/bookings/js/bookings';
import Admin from './admin/Admin';
import Profile from './app/user/profile/js/profile.js';
import RoundTripResult from './app/main/FlightResults/RoundTripResult/js/RoundTripResult.js';
import PaymentPage from './app/main/OneWayBooking/PaymentPage/js/PaymentPage';
import RoundTripBooking from './app/main/RoundTripBooking/js/RoundTripBooking';
import {Navbar} from './admin/Components/Navbar/Navbar';
import BookingHistory from './admin/Components/Views/BookingHistory';
import Vas from './admin/Components/Views/Vas';
import ResetPassword from './app/main/ResetPassword/js/ResetPassword';
import sendemail from './app/main/ResetPassword/js/sendemail';
import AdminAdd from './admin/Components/Views/AdminAdd';
import MulticityResult from './app/main/FlightResults/MulticityResult/js/MulticityResult.js';
import Feedback from './admin/Components/Views/Feedback';
import Recommendation from './admin/Components/Views/Recommendations';
import MulticityBooking from './app/main/MulticityBooking/js/MulticityBooking';
import AdminFooter from './admin/Components/Footer/Footer';
class App extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <HashRouter basename="/"> 

        
        <Switch>
          <Route path="/forgotpassword" exact component={sendemail}/>
        <Route path="/resetpassword/:token" exact component={ResetPassword}/>

        <Route path="/booked/:booking_id/:airline" component={PaymentPage} />
        <Route path="/admin"  render={
          ()=>{
        return(<div>
        <Route path="/admin" component={Navbar} />
        <Switch>
          <Route path="/admin/admin" exact component={AdminAdd}/>
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/bookinghistory" exact component={BookingHistory} />
        <Route path="/admin/vas" exact component={Vas} />
        <Route path="/admin/feedback" exact component={Feedback}/>
        <Route path="/admin/recommendation" exact component={Recommendation}/>
        
        </Switch>
        <Route path="/admin" component={AdminFooter}/>
        </div>);
            
          }
        } />
        <Route path="/roundflightdetail/:src/:dest/:dept_date/:return_date/:class/:adult/:child/:infant" component={RoundTripBooking}/>
        <Route path="/flightdetail/:src/:dest/:dept_date/:class/:adult/:child/:infant/:airline/:number" component={OneWayFlightDetail}/>
        <Route path="/multicitybooking" component={MulticityBooking}/>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUpPage} />
          {/*<div id="body" className="grey lighten-5">*/}
          <Route path="/" render={()=>{
              return(
                <div>
                <Route path="/" component={Header}/>
                  <Switch>
                  <Route path="/" exact component={Main}/>
                  <Route path="/bookinghistory" component={Bookings}/>
                  <Route path="/profile" exact component={Profile} />
                  <Route path='/onewaysearch/:src/:dest/:dept_date/:class/:adult/:child/:infant' component={OneWayResult} />
                  <Route path='/roundtripsearch/:src/:dest/:dept_date/:return_date/:class/:adult/:child/:infant' exact component={RoundTripResult} />
                  <Route path="/multicitysearch" component={MulticityResult} />
                  </Switch>
                  <Route path="/" component={Footer}/>
              </div>
              
              );
        
        }}/>
        {/*</div>*/}
        </Switch>
        
        
       
      </HashRouter>
    );
  }
}

export default App;
