import React,{Component} from 'react';

class AdminFooter extends Component{
    render(){
        return(
            <footer class="page-footer indigo darken-4">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">GoTrip Admin Panel</h5>
                <p class="grey-text text-lighten-4">Admin Panel provides control over some of the features of the website.</p>
              </div>
              
                
               
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2018 Mindtree Kalinga
            <a class="grey-text text-lighten-4 right" href="https://www.mindtree.com/">Go to Website</a>
            </div>
          </div>
        </footer>
        );
    }
}

export default AdminFooter;