import React, {Component} from 'react';
import '../css/SignUpPage.css';
import $ from 'jquery';
import {Link} from 'react-router-dom';


class SignUpPage extends Component {
   
    render() {
        
        return (
            <div className="signup-body" id="signup-body" >
                
                <div className="row">
                    <div className="col l4 m2"></div>
                <div className="col s12 m8 l4"  >
                   
                    <div className="row">
                        <Link to="/"><center><span id="gotrip" >GoTrip</span></center></Link>
                    </div>
                   

                        {/*-----------LoginCard Start-----------------*/}
                        <div className="card-panel hoverable" id="login-card">
                        <span >
                        <div className="row">
                        <div class="row" >
                            <center><span style={{fontSize: "200%",color:'#1a237e'}}>Sign up for a GoTrip account</span></center>
                        </div>
                        
                        <form className="col s12 l12 m12">
                        <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input id="signup_email" type="email" className="validate"/>
                            <label htmlFor="email">Email</label>
                            </div>
                         </div>
                         <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix">phone</i>
                            <input id="signup_mob" type="tel" className="validate"/>
                            <label htmlFor="signup_mob">Mobile</label>
                            </div>
                        </div>
                         <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input id="signup_password" type="password" className="validate"/>
                            <label htmlFor="signup_password">Password</label>
                            </div>
                        </div>
                         
                        <div className="row">
                            <Link to="/login" className=" left-align" >Existing User? Sign In</Link>
                            <div className="input-field right-align">
                            
                            <button type="submit" className="btn btn-default">Sign Up</button>
                            
                            </div>
                        </div>
                       
                        </form>
                    </div>
                    </span>
                    </div>

                    {/*-----------LoginCard End-----------------*/}
                    
                </div>
                <div className="col l4 m2"></div>
                </div>


               
            </div>
        );
    }
}

export default SignUpPage;