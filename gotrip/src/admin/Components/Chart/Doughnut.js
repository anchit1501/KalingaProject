import React, { Component } from "react";
import {Doughnut} from "react-chartjs-2";
export class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
			arr:[350,350,350,350,350,350,350,350],
      chartData :{
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
	datasets: [{
		data: [300, 50, 100,56,24,34,123,453],
		backgroundColor: [
	"rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(213, 0, 0,1.0)",
              "rgba(34,139,34,1)",
              "rgba(244, 143, 177,1.0)",
               "rgba(139,69,19,1.0)",
              "rgba(13, 71, 161,1.0)"
		],
		hoverBackgroundColor: [
		"rgba(255,99,132,0.5)",
              "rgba(54,162,235,0.5)",
              "rgba(255,206,86,0.5)",
              "rgba(213, 0, 0,0.5)",
              "rgba(255, 193, 7,0.5)",
              "rgba(244, 143, 177,0.5)",
               "rgba(139,69,19,0.5)",
              "rgba(13, 71, 161,0.5)"
		]
	}]
      }
    };
  }

componentWillMount(){

  fetch("http://gotripwtapi.azurewebsites.net/booking/airlinerevenue")
      .then(val => val.json())
      .then(val => {
        console.log(val[0].total);
        this.setState({ booking: val });
        // val.map(res=>{console.log(res);});
        let arr=[val[0].total,val[1].total,val[2].total,val[3].total,val[4].total,val[5].total,val[6].total,val[7].total];
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
								
                <Doughnut data={this.state.chartData}

								 width={100}
                  height={115}
									 options={{
                     responsive:true,
                    maintainAspectRatio: true,
                      title:{display:true,
                    text:'Revenue',
                    fontSize:20
                  }}}/>
              </div>
            </div>
    );
  }
}
export default DoughnutChart;
