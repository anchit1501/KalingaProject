import React, { Component } from "react";
import {Pie} from "react-chartjs-2";



export class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[350,350],
      chartData :{
    
    labels: [
		'Bookings',
		'Cancellation'
	],
  datasets: [{
		data: [250,250],
		backgroundColor: [
		
		'#36A2EB',
    '#FF6384'
		],
		hoverBackgroundColor: [
	'#36A2EB',
    '#FF6384'
		
		]
	}]
        }
        
    
    };}

componentWillMount(){

  fetch("http://gotripwtapi.azurewebsites.net/booking/count_status")
      .then(val => val.json())
      .then(val => {
        console.log(val[0].total);
        this.setState({ booking: val });
        // val.map(res=>{console.log(res);});
        let arr=[val[1].total,val[0].total];
        console.log(arr);
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

  render() {
    
    return (
      <div className="col l12 s12 m12">
              <div className=" card-panel hoverable">
                <Pie data={this.state.chartData}
                width={100}
                  height={115}
                  
                   options={
                  {responsive:true,
                    maintainAspectRatio: true,
                    title:{display:true,
                    text:'Booking Ratio',
                    fontSize:20
                  }
                    
                  
                }
                }
                  />
              </div>
              </div>
            
    );
  }
}
export default PieChart;
