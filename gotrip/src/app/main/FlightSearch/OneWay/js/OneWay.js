import React, { Component } from 'react';
import AirportInput from '../../AirportDropdown/js/AirportInput';
import {connect} from 'react-redux';
import {Redirect,Link,withRouter} from 'react-router-dom';
import {storeOneWay,showOneWayResult} from '../../../../state/action/FlightSearchAction';
import '../css/OneWay.css';
// import {getSuggestionValue} from '../../AirportDropdown/js/AirportInput';
class OneWay extends Component {

    constructor(props)
    {
            super(props);
            this.state={
                showResult: false,
                source:'',
                destination:'',
                source_value:'',
                source_value_store:'',
                destination_value_store:'',                
                destination_value:'',
                depart_date: new Date(),
                class: 'ECONOMY',
                adult : 1,
                child: 0,
                infant:  0,
                swap: false
            
        }
        this.HandleSubmit=this.HandleSubmit.bind(this);
        this.changeLocation=this.changeLocation.bind(this); 
        this.swapCity=this.swapCity.bind(this);
        this.HandleClassChange=this.HandleClassChange.bind(this);
    }
    changeSourceStoreValue=(value)=>{
       
        this.setState({source_value_store:value});
        
    }
    changeDestinationStoreValue=(value)=>{
       this.setState({destination_value_store:value});
    }

    changeSourceValue=(value)=>{
        this.setState({source_value: value });
    }
    changeDestinationValue=(value)=>{
        this.setState({destination_value: value})
    }
//   getSuggestionValue(suggestion) {
//     if(suggestion=='')
//     {
//         return '';
//     }
    
//     console.log(suggestion);
//   return suggestion.location+' ('+suggestion.iata_code+') ,IN' ;
// }
    changeClass(event)
    {
        this.setState({class: event.target.value
        })
    }
     changeLocation(location,flag,id)
    {   
        // console.log("working", location,flag);

        if(flag){
            this.setState({source: location});
            this.setState({source_value_store:this.state.source_value});
        }
        else{
            this.setState({destination: location});
            this.setState({destination_value_store:this.state.destination_value});
        }
    }
    swapCity()
    {   
        if(this.state.source==='' && this.state.destination==='')
        {
            return false;
        }
        let temp=this.state.source;
        this.setState({source:this.state.destination});
        this.setState({destination: temp});
        temp=this.state.source_value;
        this.setState({source_value: this.state.destination_value});
        this.setState({destination_value: temp});
        temp=this.state.source_value_store;
        this.setState({source_value_store: this.state.destination_value_store});
        this.setState({destination_value_store:temp});
        console.log("swap");
       
    }
    HandleSubmit(event)
    {
            if(this.state.source_value_store!=this.state.source_value)
            {
                alert("select a valid Source City");
                return false;
            }
            if(this.state.destination_value_store!=this.state.destination_value)
            {
                alert("select a valid Destination City");
                return false;
            }
        if(this.state.source=='')
        {
            alert("Please select Source city");
            return false;
        }
        if(this.state.destination=='')
        {
            alert("Please select Destination city");
            return false;
        }
        if(this.state.source==this.state.destination)
        {
            alert("Source and Destination can't be same");
            return false;   
        }
        if(this.state.depart_date<new Date(this.props.mindate))
        {
            alert("Depart date cannot be less than current date.");
            return false;
        }
        if(this.state.depart_date > new Date(this.props.maxdate))
        {
            alert("Depart date cannot be more than a year from current date.");
            return false;
        }
        this.props.storeOneWay(this.state);
        if(parseInt(this.state.adult)+parseInt(this.state.child)+parseInt(this.state.infant)>6)
        {
            alert("Maximum of 6 traveller's allowed");
            return false;
        }
        if(parseInt(this.state.infant)>parseInt(this.state.adult))
        {
            alert("Number of infants cannot be more than adults");
            return false;
        }
        this.props.history.push(`/onewaysearch/${this.state.source.iata_code}/${this.state.destination.iata_code}/${this.FormatDate(this.state.depart_date)}/${this.state.class}/${this.state.adult}/${this.state.child}/${this.state.infant}`);
        console.log('qqqq',this.props);
        console.log("adult", this.state.adult);
    }
    ClearCity=(flag,id)=>{
        if(flag)
        {
            this.setState({source: ''});
        }
        else{
            this.setState({destination: ''});
        }
    }
    FormatDate=(depart_date)=>{
        let month = (depart_date.getMonth() + 1).toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        let date = (depart_date.getDate()).toString();
        if (date.length == 1) {
            date = '0' + date;
        }
        let year = depart_date.getFullYear().toString();
        return `${year}-${month}-${date}`;
    }
    HandleClassChange(event)
    {
        this.setState({class: event.target.value});
        console.log("woking");
    }

    render() {
        
        var source=<AirportInput placeholder="Enter a city" id="source" required={true} changeLocation={this.changeLocation} source={true} ClearCity={this.ClearCity} oneway_value={this.state.source_value} changeValue={this.changeSourceValue} changeStoreValue={this.changeSourceStoreValue} />;
        var destination=<AirportInput placeholder="Enter a city" id="destination" changeLocation={this.changeLocation} source={false} ClearCity={this.ClearCity} oneway_value={this.state.destination_value} changeValue={this.changeDestinationValue} changeStoreValue={this.changeDestinationStoreValue} />;
        console.log(this.props.maxdate);
        return (
             <div className="row">
                 
                            <div className="col s12 m12 l12">
                                <div className="card-panel hoverable">
                                    <div id="panel_main" className="row">
                                        <form id="form" className="col s12 m12 l12" >
                                            <div id="row1" className="row">
                                                <div className="col s12 m5 l5">
                                                    <h6>From</h6>
                                                
                                                {/*{(this.state.swap)?source:destination}*/}
                                                {source}
                                                    
                                                </div>
                                                <div className="col s12 m2 l2 center" >
                                                    <div id="swap_icon" className="row"><i id="swap_icon_main" className="material-icons col s12 m12 l12" onClick={this.swapCity}>swap_vertical_circle</i></div>
                                                </div>
                                                <div className="col s12 m5 l5">
                                                    <h6>To</h6>
                                                    {/*<input placeholder="Enter city or airport" type="text" className="s12 m12 l12" />*/}
                                                {/*{(this.state.swap)?source:destination}*/}
                                                {destination}
                                                    
                                                </div>
                                            </div>
                                            <div id="row1" className="row">
                                                <div className="col s12 m6 l6">
                                                    <div className="col s6 m6 l6">
                                                        <h6>Depart Date</h6>
                                                        <input placeholder="Select a depart date" min={this.props.mindate} max={this.props.maxdate} defaultValue={this.props.mindate} type="date" onChange={(event)=>{this.setState({depart_date: new Date(event.target.value)})}} />
                                                    </div>
                                                    <div className="col s6 m6 l6">
                                                        <h6>Class</h6>
                                                        <select className="browser-default" value={this.state.class} onChange={this.HandleClassChange} >
                                                            <option value="ECONOMY">Economy</option>
                                                            <option value="BUSINESS">Business</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col s12 m6 l6">
                                                    <div className="col s4 m4 l4">
                                                        <h6 style={{whiteSpace: "nowrap"}}>Adult(12+ yr)</h6>
                                                        <select className="browser-default" defaultValue="1" onChange={(event)=>{this.setState({adult: event.target.value})}}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                    </div>
                                                    <div className="col s4 m4 l4">
                                                        <h6 style={{whiteSpace: "nowrap"}}>Child(2-12 yr)</h6>
                                                        <select className="browser-default" defaultValue="0" onChange={(event)=>{this.setState({child: event.target.value})}} >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                    </div>
                                                    <div className="col s4 m4 l4">
                                                        <h6 style={{whiteSpace: "nowrap"}}>Infant(0-2 yr)</h6>
                                                        <select className="browser-default" defaultValue="0" onChange={(event)=>{this.setState({infant: event.target.value})}} >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col s12 m12 l12">
                                                    <div id="search_button" className="col s12 m3 l3 right">
                                                        <button id="search_btn" className="waves-effect waves-light btn indigo darken-4" type="button" onClick={this.HandleSubmit}>Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        );
    }
}

const mapStateToProps=(state)=>{
  return {
    one: state.OneWayResult,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    storeOneWay: (obj)=>{

        dispatch(storeOneWay(obj));
      
    },
    showOneWayResult: (show)=>{
        dispatch(showOneWayResult(show));
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OneWay));
