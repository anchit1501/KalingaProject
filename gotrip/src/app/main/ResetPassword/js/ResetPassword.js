import React, { Component } from 'react';
import {baseurl} from '../../../services/Baseurl';
import {withRouter,Redirect} from 'react-router-dom'
class ResetPassword extends Component {
    constructor(props)
    {   super(props);
        this.state={
            password:'',
            confirmPassword: '',
            invalid: false,
            redirect:false
        }
    }
    componentWillMount=()=>{
        var data={
            reset_token:this.props.match.params.token
        }
        fetch(`${baseurl}user/checktoken`, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
    if(response.status==400)
    {
        this.setState({invalid:true});
    }
});
    }


    HandleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password!=this.state.confirmPassword)
        {
            this.setState({error: "password does not match"});
            return false;
        }
        if(this.state.password.length<8)
        {
            this.setState({error: "password must be atleast 8 char long"});
            return false;
        }
        let data={
            password: this.state.password,
            reset_token: this.props.match.params.token
        }
        fetch(`${baseurl}user/resetpassword`, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
    console.log('Success:', response);
    if(response.status!=undefined)
    {
        if(response.status==200)
    {
        this.setState({password:''});
        this.setState({confirmPassword:''});
        this.setState({success: true});
        
        setTimeout(()=>{ this.setState({redirect:true}); }, 3000);
    }
    }
});

    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect  to="/" />
        }
        return (
        (!this.state.invalid)?<div className="row">
            <h1 style={{textAlign:'center'}}>GoTrip</h1>
            <h5 style={{textAlign:'center'}}>Reset your Password</h5>
            <div className="col m3 l4"></div>
        <div className="col s12 m6 l4">
            <div className="card-panel ">
                <p>{this.state.error}</p>
            <form onSubmit={this.HandleSubmit} >
            <div className="row">
                <div className="input-field col s12">
                <input id="password" type="password" value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value})}} className="validate" required/>
                <label for="password">Enter Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password" type="password" value={this.state.confirmPassword} onChange={(e)=>{this.setState({confirmPassword: e.target.value})}}  className="validate" required/>
                <label for="password">Confirm Password</label>
                </div>
            </div>
            
            <button type="submit" class="btn btn-default">Reset</button>
            
            </form>
            </div>
        </div>
        {(this.state.success)? <div>
            <h3>Password Reset Sucsessful</h3>
       
        </div>:''}
        </div>:<p style={{textAlign:'center'}}>invalid or expired link</p>
        );
    }
}

export default withRouter(ResetPassword);
