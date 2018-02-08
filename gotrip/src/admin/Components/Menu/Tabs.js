import React,{Component} from 'react';
import $ from 'jquery';
import './Tabs.css';
export class Tabs extends Component{
    componentDidMount(){
        
            $(".button-collapse").sideNav({
                    menuWidth: 300, // Default is 300
                    edge: 'left', // Choose the horizontal origin
                    closeOnClick: true,
            });
    }
    
    render(){
        return(
//             <div className="z-depth-1">
//     <div class="row">
//     <div class="col s12">
//       <ul class="tabs">
//         <li class="tab col s2"><a class="active" href="#test1">Data</a></li>
//         <li class="tab col s2"><a  href="#test2">Booking History</a></li>
//         <li class="tab col s2"><a href="#test4">Test 4</a></li>

//       </ul>
//     </div>
    
//   </div>
//   </div>
<nav className="z-depth-1 grey lighten-5">
    <div className="nav-wrapper">
      <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul className="left hide-on-med-and-down" >
        <li ><a className='tabtext'>Dashboard</a></li>
        <li><a className='tabtext'>Bookings</a></li>
        <li><a className='tabtext'>Feedback</a></li>
        <li><a className='tabtext'>Mobile</a></li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>
        
      )
    }

}