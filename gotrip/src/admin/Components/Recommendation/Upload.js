import React, { Component } from "react";

import $ from "jquery";

class Upload extends Component {

constructor(props) {
  super(props)
  this.state = {
    image: '',
  } 
  this.loadFile = this.loadFile.bind(this) // properly bound once
}

componentDidMount(){
    $("#submit").submit(function(e) {
    e.preventDefault();
});
}
    

loadFile(e) {
    e.preventDefault();
    var reader = new FileReader();
   reader.onload = () => this.setState({ image: reader.result });
   console.log(reader.result);
    reader.readAsDataURL(e.target.files[0]);
    // console.log(this.state.image);

  };
  handleSubmit = e => {
    e.preventDefault();
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    let r_code = document.getElementById("r_code").value;
    let image = this.state.image;

    console.log(image);
    let recom = {
      source: source,
      destination: destination,
      r_code: r_code,
      image: this.state.image
    };
console.log(recom);
    let urlpost = "http://gotripwtapi.azurewebsites.net/recommendation/add";
    
    fetch(urlpost, {
      method: "post",
      body: JSON.stringify(recom),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
   
    // setTimeout(function() {
    //   window.location.reload();
    // }, 2000);
  };
  render() {
    return (
      <div class="row container">
        <div class="card ">
          <form class=" card-content container ">
            <div class="row ">
              <div class="input-field col s12 l2 m2">
                <input id="source" type="text" class="validate" />
                <label for="source">Source</label>
              </div>
              <div class="input-field col s12 l2 m2">
                <input id="destination" type="text" class="validate " />
                <label for="destination">Destination</label>
              </div>
              <div class="input-field col s12 l2 m2">
                <input id="r_code" type="text" class="validate" />
                <label for="r_code">RCode</label>
              </div>
              <div className="col l3 s6 m3">
                <div class="file-field input-field">
                  <div class="btn">
                    <span>Upload</span>
                    <input
                      type="file"
                      id="inputFileToLoad"
                      accept="image/*;capture=camera"
                      name="userPhoto"
                      onChange={this.loadFile}
                      single
                      
                    />
                  </div>
                  <i class="glyphicon glyphicon-fire form-control-feedback" />
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="col l3 m3 s6"><a class="waves-effect waves-light btn" id="submit" onClick={this.handleSubmit}>button</a></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
//   componentDidMount() {
//     //Convert Image to Base64
//     $(document).ready(function() {
//       $("#submit").on("click",function() {
//         var filesSelected = document.getElementById("inputFileToLoad").files;
//         if (filesSelected.length > 0) {
//           var fileToLoad = filesSelected[0];
//           var fileReader = new FileReader();
//           fileReader.onload = function(fileLoadedEvent) {
//             var base64value = fileLoadedEvent.target.result;

//             console.log(base64value);
//             $("#response").val(base64value);
//           };
//           fileReader.readAsDataURL(fileToLoad);
          
//         }
//       });
//     });
//   }

