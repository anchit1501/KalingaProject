import React, { Component } from "react";
import Bar_Chart from "../Chart/Bar_Chart";
import DoughnutChart from "../Chart/Doughnut";
import PieChart from "../Chart/Pie";
class Stats extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m12 l8">
            <div className="card-panel  z-depth-2">
              <div className="row">
                <div className="col l12">
                  <Bar_Chart />
                </div>
                <div className="col l4 s12 m6">
                  <DoughnutChart />
                </div>
                <div className="col l4 s12 m6">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
// <i class=" small material-icons right">more_horiz</i>
