import React, { Component } from 'react';
import {baseurl} from '../../../services/Baseurl';
import {withRouter} from 'react-router-dom'
class SendEmail extends Component {
    constructor(props)
    {   super(props);
        this.state={
            forgot_email:'',       
            forgot_error:''
            
        }
    }
    HandleSubmit=(e)=>{
        e.preventDefault();
        var data={
            email:this.state.forgot_email
        }
        fetch(`${baseurl}user/settoken`, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
    console.log('Success:', response);
    if(response.status==200)
    {
        this.setState({error:"Reset Link sent to your email id"});

    }
    if(response.status==400)
    {
        this.setState({error:"Email not registered"});
        
    }
});

    }
    render() {
        return (
        <div className="row">
            <div className="col m3 l4"></div>
        <div className="col s12 m6 l4">
            <div className="card-panel ">
                <p>{this.state.error}</p>
            <form onSubmit={this.HandleSubmit} >
            
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="email"  onChange={(e)=>{this.setState({forgot_email: e.target.value})}}  className="validate" required/>
                <label for="email">Email</label>
                </div>
            </div>
            
            <button type="submit" class="btn btn-default">Reset</button>
            
            </form>
            </div>
        </div>
        </div>
        );
    }
}

export default withRouter(SendEmail);
