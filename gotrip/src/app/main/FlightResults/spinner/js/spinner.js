import React, { Component } from 'react';
import '../css/spinner.css';

class Spinner extends Component {
  render() {
    return (
     <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    );
  }
}

export default Spinner;
