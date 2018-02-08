import React, { Component } from 'react';
import '../css/FlightSearch.css';
import OneWay from '../OneWay/js/OneWay';
import RoundTrip from '../RoundTrip/js/RoundTrip';
import MultiCity from '../MultiCity/js/MultiCity';
import $ from 'jquery';

class FlightSearch extends Component {
    componentDidMount()
    {
         $('.carousel.carousel-slider').carousel({indicators:true,duration:100});
         window.scrollTo(0, 0);
    }
  render() {
      let mindate=new Date().toISOString().split('T')[0];
      var tomorrow = new Date();
      let today=new Date();
      tomorrow.setDate(today.getDate()+1);
      console.log(tomorrow);
      let return_mindate=tomorrow.toISOString().split('T')[0];
      console.log(return_mindate);
      
      let date = new Date();
      let year = parseInt(date.getFullYear()) + 1;
      let month = date.getMonth();
      let date1 = date.getDate();
      let maxdate = new Date(year,month,date1).toISOString().split('T')[0];

      //date=`${date[2]}-${(date[0].length==1)?'0':''}${date[0]}-${(date[1].length==1)?'0':''}${date[1]}`;
    return (
      <div className="FlightSearch">
        <div id="searchbar_main" className="nav_bar indigo darken-4">
                <div id="search_form" className="row container">
                    <div className="col s12 m12 l12">
                    <ul className="tabs transparent">
                        <li className="tab col s3 m3 l3"><a className="active white-text" href="#test1" style={{whiteSpace: "nowrap"}}>One Way</a></li>
                        <li className="tab col s3 m3 l3"><a className="white-text" href="#test2" style={{whiteSpace: "nowrap"}}>Round Trip</a></li>
                        <li className="tab col s3 m3 l3"><a className="white-text" href="#test3" style={{whiteSpace: "nowrap"}}>Multicity</a></li>
                    </ul>
                    </div>
                    <div id="test1" className="col s12 m12 l12">
                        <OneWay mindate={mindate} maxdate={maxdate}/>
                    </div>
                    <div id="test2" className="col s12 m12 l12">
                        <RoundTrip mindate={mindate} maxdate={maxdate} return_mindate={return_mindate}/>
                    </div>
                    <div id="test3" className="col s12 m12 l12">
                        <MultiCity mindate={mindate} maxdate={maxdate}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default FlightSearch;
