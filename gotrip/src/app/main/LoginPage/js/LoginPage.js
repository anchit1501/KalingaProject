import React, {Component} from 'react';
import '../css/Login.css';
//import $ from 'jquery';
import {baseurl} from '../../../services/Baseurl.js';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            userdetails: "",
            login_error: false,
            redirect: true,
        };
    }
    
    handleForm=()=>{
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        this.setState({username: username});
        this.setState({password: password});

        let url = baseurl+'admin/login/'+username+'/'+password;
        fetch(url,{method: 'GET'}).then(res => res.json()).then(res => {
            this.setState({
                userdetails: res
            });
            
        }).then(result => {
            let response = this.state.userdetails;
            //console.log(response[0]);
            if(response.length === 1){
                this.setState({login_error: false});
                localStorage.setItem('key', JSON.stringify(response));
                this.setState({redirect: true});
            }
            else{
                this.setState({login_error: true});
            }
        });//.then(result1 => {
        //     var item = sessionStorage.getItem('userdata');
        //     item = JSON.parse(item)
        //     console.log(item[0].username);
        //     //console.log(JSON.parse(sessionStorage.getItem('userdata')))
        // })
    }
    componentWillMount()
    {
        let data=localStorage.getItem('key');
        console.log(data);
        if(data==null)
        {
            this.setState({redirect: false});
        }
        console.log('login',data);
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={'/admin'}/>;
        }

        let login_error = null;
        
        if(this.state.login_error){
            //console.log(this.state.username_error && this.state.email_error);
            login_error = <p className="col s12 m12 l12 red-text">* Incorrect Username or Password.</p>
        }
        else{
            login_error = null;
        }

        return (
            <div className="login-body" id="login-body">
                
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
                        <div className="row"  >
                            <center><span style={{fontSize: "200%",color:'#1a237e'}}>Sign into your account</span></center>
                        </div>
                        <div className="row">
                            
                        </div>
                        <form className="col s12 l12 m12" onSubmit={this.handleForm}>
                        <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="username" type="text"/>
                            <label htmlFor="email">Username</label>
                            </div>
                         </div>
                         <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix">vpn_key</i>
                            <input id="password" type="password"/>
                            <label htmlFor="password">Password</label>
                            </div>
                            <div className="col s12 m12 l12">{login_error}</div>
                        </div>
                        <div className="row">
                            
                            <span className="col s6 m5 l5" ><Link to="/signup" className="left-align" >New to GoTrip? Sign Up</Link></span>
                            <span className="col s1 m3 l3"></span>
                            <span className="col s5 m4 l4 right-align"><a className="right-align" >Forgot password ?</a></span>
                            
                            
                            
                        </div>
                        <div className="row">
                            
                            <div className="input-field right-align">
                            
                            <button type="submit" className="btn btn-default ">Sign In</button>
                            
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

export default LoginPage;