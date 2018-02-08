import React, { Component } from "react";
import {HorizontalBar} from "react-chartjs-2";
import DoughnutChart from './Doughnut'
export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline_data:[
    {
        "_id": "9W",
        "total": 2
    },
    {
        "_id": "H1",
        "total": 1
    },
    {
        "_id": "6E",
        "total": 1
    },
    {
        "_id": "AK",
        "total": 1
    },
    {
        "_id": "UK",
        "total": 2
    },
    {
        "_id": "AI",
        "total": 8
    },
    {
        "_id": "SG",
        "total": 1
    },
    {
        "_id": "G8",
        "total": 1
    }
],
      arr:[0,0,0,0,0,0,0,0],
      chartData: {

        labels: [
          
          "Jet Airways",
          "Singapore",
          "Indigo",
          "Air Asia",
          "Vistara",
          "Air India",
          "Spicejet",
          "Go Air"
          
        ],
        datasets: [
          {
            
            backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
            data: [12, 2000, 5000, 1500, 2500, 1900,3540,3345],
            backgroundColor: [
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(213, 0, 0,1.0)",
              "rgba(255, 193, 7,1.0)",
              "rgba(244, 143, 177,1.0)",
               "rgba(255,206,86,1)",
              "rgba(13, 71, 161,1.0)"
            ]
          }
        ]
      }
    };
  }
   componentWillMount(){
    console.log(this.findAirlineCount('9W'));
  fetch("http://gotripwtapi.azurewebsites.net/booking/count/airline")
      .then(val => val.json())
      .then(val => {
        console.log(val[0].total);
        this.setState({ airline_data: val });
        // val.map(res=>{console.log(res);});
        console.log(val);
        let arr=[this.findAirlineCount('9W'),this.findAirlineCount('H1'),this.findAirlineCount('6E'),this.findAirlineCount('AK'),this.findAirlineCount('UK'),this.findAirlineCount('AI'),this.findAirlineCount('SG'),this.findAirlineCount('G8')];
        // console.log(arr);
        let st={
          ...this.state.chartData,
          datasets: [{
            ...this.state.chartData.datasets,
            data:arr
          }]
        }
        console.log(st,this.state.chartData);
        this.setState({chartData:st});
      });

  }
  findAirlineCount=(id)=>{
    let list=this.state.airline_data;
let result=list.find(val=>val._id==id);
return result.total;
  }
  

  render() {
    let data1 = 5000;
    return (
      <div className="card-panel  z-depth-1 hoverable">
            <div className="card-content ">
              <div className="chart">
                <HorizontalBar
                  data={this.state.chartData}
                  width={80}
                  height={40}
                  options={{

                    title:{display:true,
                    text:'Bookings Count',
                  fontSize:20},
                  labels:{display:false},
                   legend:{display:false},
         
                    maintainAspectRatio: true,
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }
                  }
                }
                />
              </div></div>
              </div>
             
          
    );
  }
}
export default BarChart;
