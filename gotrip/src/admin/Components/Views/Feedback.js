import React,{Component} from 'react';
import FeedbackCard from '../Feedback_Card/Card';
import $ from 'jquery';

class Feedback extends Component{
constructor(props)
{ 
  super(props);
  this.state={
      feedback:[],
  }
}

componentWillMount(){
fetch('http://gotripwtapi.azurewebsites.net/feedback/all').then(val=>val.json()).then((val)=>{
    
     console.log(val);
    this.setState({feedback:val});
    // val.map(res=>{console.log(res);});
  }

  )
}
    render(){
        return(
        <div class="row" id="background"><div className="col s12 m12 l12"> {this.state.feedback.map((val,index)=>{
            val.id=index;
            return(  <FeedbackCard  email={val.email} message={val.message} id={index}/>         );
          })}</div></div>
            

        );

    }
}

export default Feedback;