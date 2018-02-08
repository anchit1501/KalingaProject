import React, { Component } from 'react';
import AirportInput from '../../AirportDropdown/js/AirportInput.js';
import {withRouter,Redirect} from 'react-router-dom';

class Multicity extends Component{
    constructor(props){
        super(props);
        this.state={
            add: 2,
            total: 4,
            multicityItems: [{from: "",to: "",date: ""},{from: "",to: "",date: ""}],
            redirect: false,
            adult:1,
            child:0,
            infant:0,
            class:'ECONOMY',

            date_0:new Date(),
            date_1:new Date(),
            date_2:new Date(),
            date_3:new Date(),

            source_0:'',
            source_1:'',
            source_2:'',
            source_3:'',

            destination_0:'',
            destination_1:'',            
            destination_2:'',            
            destination_3:'',

            source_0_value:'',
            source_1_value:'',
            source_2_value:'',
            source_3_value:'',

            destination_0_value:'',
            destination_1_value:'',            
            destination_2_value:'',            
            destination_3_value:'',

            source_0_value_store:'',
            source_1_value_store:'',
            source_2_value_store:'',
            source_3_value_store:'',
            
            destination_0_value_store:'',   
            destination_1_value_store:'',    
            destination_2_value_store:'',    
            destination_3_value_store:'',    
             


                        
        };
    }

    changeLocation=(location,flag,id)=>
    {   
        
    let arr=id.split('_');
        if(flag){
            
            this.setState({[`source_${arr[1]}`]: location});
            
        }
        else{
            this.setState({[`destination_${arr[1]}`]: location});
            
        }
    }
     changeSourceValue=(value,id)=>{
        let arr=id.split('_');
        this.setState({[`source_${arr[1]}_value`]: value });
    }
    changeDestinationValue=(value,id)=>{
        let arr=id.split('_');
       this.setState({[`destination_${arr[1]}_value`]: value });
    }

    changeSourceStoreValue=(value,id)=>{
       var arr=id.split('_');
        this.setState({[`source_${arr[1]}_value_store`]:value});
        
    }
    changeDestinationStoreValue=(value,id)=>{
        var arr=id.split('_');
       this.setState({[`destination_${arr[1]}_value_store`]:value});

    }
    ClearCity=(flag,id)=>{
        var arr=id.split('_');
        if(flag)
        {
            this.setState({[`source_${arr[1]}`]: ''});
        }
        else{
            this.setState({[`destination_${arr[1]}`]: ''});
        }
    }

   
    addRow=()=>{
        this.setState({add: ((this.state.add)+1)});
        let multicityItems = this.state.multicityItems;
        multicityItems.push({from: "", to: "", date: ""});
        this.setState({multicityItems: multicityItems});
    }
    handleUserInput=(event)=>{
        const multicityItems = this.state.multicityItems;
        const name = event.target.name;
        multicityItems[event.target.attributes.getNamedItem('data-index').value][name] = event;
        this.setState({multicityItems});
    }
    HandleSubmit=(e)=>{
        e.preventDefault();
        for(let i=0;i<this.state.add;i++)
        {
            if(this.state[`source_${i}_value`]===''|| this.state[`destination_${i}_value`]==='')
            {   
                alert("Please Fill All the fields");
                return false;
            }
        }
        for(let i=0;i<this.state.add;i++)
        {
            if(this.state[`source_${i}_value`]==this.state[`destination_${i}_value`])
            {   
                alert("Source and Destination Cant be same");
                return false;
            }
        }
        for(let i=0;i<this.state.add;i++)
        {
            if(this.state[`source_${i}`]==''||this.state[`source_${i}`]=='')
            {
                alert("all fields are required");
                return false;
            }
        }
        
        sessionStorage.setItem('multicitydata', JSON.stringify(this.state));
        this.setState({redirect:true});
       
    }
    HandleDate=(e,index)=>{
        this.setState({[`date_${index}`]:new Date(e.target.value)});
        for(let i=index+1;i<this.state.add;i++)
        {
            if(this.state[`date_${i}`]<new Date(e.target.value))
            {
                this.setState({[`date_${i}`]:new Date(e.target.value)});
            }
        }
    }
    FormatDate = (depart_date) => {
        
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
    removeRow=()=>{
        this.setState({add:(this.state.add-1)});
        let data4remove = this.state.multicityItems;
        data4remove.pop();
        this.setState({multicityItems: data4remove});
    }
    render(){
        if(this.state.redirect)
        {
            return(<Redirect to={ {
        pathname: '/multicitysearch',
        
        } }/>);
        }
        let addbtn = "";
        if(this.state.add < this.state.total){
            addbtn = <span><b id="addextra" className="purple-text" onClick={this.addRow}>+ ADD CITY</b> (Upto {this.state.total - this.state.add} more)</span>;
        }
        let removebtn='';
        if(this.state.add>2)
        {
            removebtn = <span><b id="addextra" className="purple-text" onClick={this.removeRow}>- REMOVE CITY</b></span>;
        
        }
        let liPushed = [];
        this.state.multicityItems.forEach((row,index) => {
            liPushed.push(
                <li key={index}>
                    <div className="col s1 m1 l1"><h4>{index+1}</h4></div>
                    <div className="col s11 m4 l4">
                        <h6 className="s12 m12 l12">From</h6>
                        <AirportInput placeholder="Enter a city" id="source"  required={true} source={true} oneway_value={this.state[`source_${index}_value`]} id={`source_${index}_value`} changeLocation={this.changeLocation} changeValue={this.changeSourceValue} changeStoreValue={this.changeSourceStoreValue} ClearCity={this.ClearCity}/>
                    </div>
                    <div className="col s12 m4 l4">
                        <h6 className="s12 m12 l12">To</h6>
                        <AirportInput placeholder="Enter a city" id="source" required={true} source={false} oneway_value={this.state[`destination_${index}_value`]} id={`destination_${index}_value`} changeLocation={this.changeLocation} changeValue={this.changeDestinationValue} changeStoreValue={this.changeDestinationStoreValue} ClearCity={this.ClearCity} />
                        </div>
                    <div className="col s12 m3 l3">
                        <h6 className="s12 m12 l12">Depart Date</h6>
                        <input placeholder="Select a date" type="date" onChange={(e)=>{this.HandleDate(e,index)}} name="date" min={this.FormatDate(this.state[`date_${(index==0)?0:index-1}`])} max={this.props.maxdate} value={this.FormatDate(this.state[`date_${index}`])} data-index={index} className="col s12 m12 l12" defaultValue={this.props.mindate}/>
                    </div>
                </li>
            );
        });
        return(
            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="card-panel hoverable">
                        <div className="row">
                            <ul className="col s12 m12 l12">
                                {liPushed}
                            </ul>
                            <div className="row">
                                <div className="col s1 m1 l1"></div>
                                <div className="col s11 m11 l11">{addbtn} {removebtn}</div>
                            </div>
                            <div className="row">
                                <div className="col s0 m1 l1"></div>
                                <div className="col s12 m5 l5">
                                    <div className="col s4 m4 l4">
                                        <h6 className="s12 m12 l12" style={{whiteSpace: "nowrap"}}>Adult(12+ yr)</h6>
                                        <select className="browser-default" defaultValue="1" onChange={(e)=>{this.setState({adult:e.target.value})}}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <div className="col s4 m4 l4">
                                        <h6 className="s12 m12 l12" style={{whiteSpace: "nowrap"}}>Child(2-12 yr)</h6>
                                        <select className="browser-default" defaultValue="0" onChange={(e)=>{this.setState({child:e.target.value})}} >
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
                                        <h6 className="s12 m12 l12" style={{whiteSpace: "nowrap"}}>Infant(0-2 yr)</h6>
                                        <select className="browser-default" defaultValue="0" onChange={(e)=>{this.setState({infant:e.target.value})}}>
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
                                <div className="col s12 m6 l6">
                                    <div className="col s6 m6 l6">
                                        <h6 className="s12 m12 l12">Class</h6>
                                        <select className="browser-default" defaultValue="ECONOMY" onChange={(e)=>{this.setState({class:e.target.value})}} >
                                            <option value="ECONOMY">Economy</option>
                                            <option value="BUSINESS">Business</option>
                                        </select>
                                    </div>
                                    <div id="button" className="col s6 m6 l6">
                                        <div id="search_button" className="col s12 m12 l12">
                                            <button id="search_btn" className="waves-effect waves-light btn indigo darken-4" onClick={this.HandleSubmit}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Multicity);