import React, { Component } from 'react';
import SearchResultInbound from '../../SearchResultsRound/js/SearchResultsInbound.js';

export default class RoundResult extends Component{
    constructor(props)
    {
        super(props);
        this.state={

        }
        
    }
    
    
    render(){

        let list=[];
       let NoFlights=<center><h4>No Flights Found</h4></center>;
       
       

       
       if(!this.props.result_outbound=='')
       {
            list=this.props.result_outbound;
            
            list=this.props.result_outbound
                    .filter((val,index)=> {
                       
                       return (this.props.non_stop) ? true: val.itineraries[0].outbound.flights.length==1 && !this.props.non_stop})
                    .filter(val=> {
                       return (this.props.morethanone_stop) ? true: val.itineraries[0].outbound.flights.length>1 && !this.props.morethanone_stop})
                    .filter(val=>{
                        // if(this.state.range<=parseFloat(val.fare.total_fare)*this.state.total_passenger)
                        // {
                        //     return true;
                        // }
                        // return true;
                        return (parseInt(val.fare.price_per_adult.total_fare)*this.props.total_passenger<=this.props.range);
                    })
                    .filter(val=>{
                        // if(!this.state.early_morning && !this.state.morning && !this.state.evening && !this.state.mid_day)
                        // {
                        //     return true;
                        // }
                        if(this.props.early_morning && this.props.morning && this.props.evening && this.props.mid_day)
                        {
                            return true;
                        }

                        if(!this.props.early_morning)
                        {
                            let date=new Date(val.itineraries[0].outbound.flights[0].departs_at);
                            let hour=date.getHours();
                            let min=date.getMinutes();
                            if(hour>=0 && hour<7 )
                            {
                                if(hour==6 && min!=0)
                                {
                                    return false;
                                }
                                return true
                            }
                        }
                        if(!this.props.morning)
                        {
                            let date=new Date(val.itineraries[0].outbound.flights[0].departs_at);
                            let hour=date.getHours();
                            let min=date.getMinutes();
                            if(hour>=6 && hour<=11 )
                            {
                                if(hour==11 && min!=0)
                                {
                                    return false;
                                }
                                return true
                            }
                        }
                        if(!this.props.mid_day)
                        {
                            let date=new Date(val.itineraries[0].outbound.flights[0].departs_at);
                            let hour=date.getHours();
                            let min=date.getMinutes();
                           
                            if(hour>=11 && hour<=17 )
                            {
                                if(hour==17 && min!=0)
                                {
                                    return false;
                                }
                                return true
                            }
                        }
                        if(!this.props.evening)
                        {
                            let date=new Date(val.itineraries[0].outbound.flights[0].departs_at);
                            let hour=date.getHours();
                            let min=date.getMinutes();
                            
                            if(hour>=17 && hour<=23 )
                            {
                                // if(hour==5 && min!=0)
                                // {
                                //     return false;
                                // }
                                return true
                            }
                        }
                       
                        

                    })
                    .filter(val=>{
                        let airline=val.itineraries[0].outbound.flights[0].marketing_airline;
                       
                        if(this.props.airindia_1 && this.props.indigo_2 && this.props.vistara_3 &&this.props.jetairways_4 && this.props.goair_5 && this.props.spicejet_6 && this.props.others_7 )
                        {
                            return true;
                        }
                        if(!this.props.airindia_1 && val.itineraries[0].outbound.flights[0].marketing_airline==='AI')
                        {
                            return true;
                        }
                        if(!this.props.indigo_2 && val.itineraries[0].outbound.flights[0].marketing_airline==='6E')
                        {
                            return true;
                        }
                        if(!this.props.vistara_3 && val.itineraries[0].outbound.flights[0].marketing_airline==='UK')
                        {
                            return true;
                        }
                        if(!this.props.jetairways_4 && val.itineraries[0].outbound.flights[0].marketing_airline==='9W')
                        {
                            return true;
                        }
                        if(!this.props.goair_5 && val.itineraries[0].outbound.flights[0].marketing_airline==='G8')
                        {
                            return true;
                        }
                        if(!this.props.spicejet_6 && val.itineraries[0].outbound.flights[0].marketing_airline==='SG')
                        {
                            return true;
                        }
                         if(!this.props.others_7 && airline!='AI' && airline!='9W' && airline!='G8' && airline!='UK' && airline!='6E')
                        {
                            return true;
                        }
                        
                        
                    })
                    .map((val,index)=><SearchResultInbound key={`out-${index}`} flightDetail={val} name={this.props.name} id={val.id} changeFlight={this.props.changeFlight} outbound={this.props.outbound} checked_id={this.props.best} />);
            if(list.length==0)
            {
                list=<center><h4>No Flights Available</h4></center>;
            }
            
               
            
                    
       }
        return(
            <div>
               {list}
            </div>
        );
    }
}