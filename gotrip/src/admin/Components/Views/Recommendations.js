import React, { Component } from "react";
import Upload from "../Recommendation/Upload";
import $ from "jquery";
import RecommendationViewer from "../Recommendation/View";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: [{ image: "0", source: "0", destination: "0",r_code:"0" }]
    };
  }

  componentDidMount() {
    fetch("http://gotripwtapi.azurewebsites.net/recommendation/all")
      .then(val => val.json())
      .then(val => {
        this.setState({ recommendation: val });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col l12">
          <Upload />
        </div>
        <div className="col l12">
          <div className="row">
            {this.state.recommendation.map((val, index) => {
              console.log(val);
              return (
                <RecommendationViewer
                  image={val.image}
                  source={val.source}
                  destination={val.destination}
                  r_code={val.r_code}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Recommendation;
