import React, { Component } from "react";
import CountUp from "react-countup";
import "./main.css";
import { Navbar } from "../Navbar/Navbar";
import Stats from "./Stats";
import Bar_Chart from "../Chart/Bar_Chart";
import DoughnutChart from "../Chart/Doughnut";
import PieChart from "../Chart/Pie";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      cancellations: [],
      revenue: [{ id: "0", total: "0" }],
      status: [{ id: "0", total: "0" }],
      feedback: [],
      cancelled:[],
      user:[],
      Deductions:[]
    };
  }

  componentWillMount() {
    fetch("http://gotripwtapi.azurewebsites.net/booking/count")
      .then(val => val.json())
      .then(val => {
        console.log(val);
        this.setState({ booking: val });
        // val.map(res=>{console.log(res);});
      });

     fetch("http://gotripwtapi.azurewebsites.net/booking/count_status")
    .then(val3 => val3.json())
    .then(val3 => {
      console.log(val3[1].total);
      this.setState({ cancelled: val3[1].total });
      // val.map(res=>{console.log(res);});
    });

    fetch("http://gotripwtapi.azurewebsites.net/booking/revenue/all")
      .then(val1 => val1.json())
      .then(val1 => {
        console.log(val1[0].total);
        this.setState({ revenue: val1 });
        // val.map(res=>{console.log(res);});
      });

       fetch("http://gotripwtapi.azurewebsites.net/feedback/count")
      .then(val2 => val2.json())
      .then(val2 => {
        console.log(val2[0].total);
        this.setState({ feedback: val2[0].total });
        console.log(this.state.feedback)
        // val.map(res=>{console.log(res);});
      });

      fetch("http://gotripwtapi.azurewebsites.net/user/count")
      .then(val4 => val4.json())
      .then(val4 => {
        console.log(val4[0].total);
        this.setState({ user: val4[0].total});
        console.log(this.state.feedback)
        // val.map(res=>{console.log(res);});
      });

      fetch("http://gotripwtapi.azurewebsites.net/booking/revenue")
      .then(val5 => val5.json())
      .then(val5 => {
        console.log(val5[0].total);
        this.setState({ Deductions: val5[1].total});
        // val.map(res=>{console.log(res);});
      });
  }

  render() {
    return <div class="row" style={{margin:0}}>
        <div id="background col l12">
          <div id="row" className="row">
            <div class="col s6 m4 l2">
              <div class="card blue darken-1 hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">
                        airplanemode_active
                      </i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Bookings</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.booking} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                    
                  </div>
                </div>
              </div>
            </div>

            <div class="col s6 m4 l2">
              <div class="card green hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">attach_money</i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Revenue</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.revenue[0].total} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                   
                  </div>
                </div>
              </div>
            </div>

            <div class="col s6 m4 l2">
              <div class="card orange hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">tag_faces</i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Customers</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.user} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                   
                  </div>
                </div>
              </div>
            </div>

            <div class="col s6 m4 l2">
              <div class="card amber hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">textsms</i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Reviews</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.feedback} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                   
                  </div>
                </div>
              </div>
            </div>

            <div class="col s6 m4 l2">
              <div class="card red hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">flight_land</i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Cancellations</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.cancelled} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                    
                  </div>
                </div>
              </div>
            </div>

            <div class="col s6 m4 l2">
              <div class="card brown hoverable">
                <div class="card-content white-text" style={{ padding: "10px" }}>
                  <div class="row valign-wrapper" style={{ margin: "0" }}>
                    <div class="col l3">
                      <i class="material-icons medium">attach_money</i>
                    </div>
                    <div class="col l9 right-align">
                      <b class="col s12 m12 l12">Deductions</b>
                      <p class="col s12 m12 l12" style={{ fontSize: "30px" }}>
                        <CountUp start={0} end={this.state.Deductions} duration={2} useEasing={true} />
                      </p>
                    </div>
                  </div>

                  <div class="row" style={{ margin: "0px" }}>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{/*Second Row*/}
        <div className="col l12 m12 s12">
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="col l6 s12 m12">
                <Bar_Chart />
              </div>
              <div className="col s12 m12 l6">
                <div className="col s12 m6 l6 ">
                  <PieChart />
                </div>
                <div className="col s12 m6 l6 ">
                <DoughnutChart/>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

{/*Third Row*/}
        <div className="col l12 m12 s12">
       
        </div>
    
      </div>

  }
}

export default Main;
