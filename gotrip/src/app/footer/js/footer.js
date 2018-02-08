import React, {Component} from 'react';

export default class Footer extends Component{
    render(){
        let year = new Date();
        year = year.getFullYear();
        return(
            <div className="Footer">
                <footer className="page-footer indigo darken-4">
                <div className="container">
                    <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">GoTrip</h5>
                        <p className="grey-text text-lighten-4">A flight booking site for all domestic airlines.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Follow us</h5>
                        <ul>

                        <li><a className="grey-text text-lighten-3">Facebook</a></li>
                        <li><a className="grey-text text-lighten-3">Google+</a></li>
                        <li><a className="grey-text text-lighten-3">Twitter</a></li>
                        <li><a className="grey-text text-lighten-3">Linkedin</a></li>
                        
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                    © {year} Copyright Mindtree
                    <a className="grey-text text-lighten-4 right">Contact Us</a>
                    </div>
                </div>
                </footer>
            </div>
        );
    }
}