import React, {Component} from 'react';

import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Singin from './components/Singin/Singin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const ParticlesOptions={
  particles: {
    number:{
      value: 80,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      cBox:[],
      route:'singin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'', 
        entries : 0,
        joined : ''

      }
    }
  }

  loadUser = (eUser) =>{
    this.setState({
      user:{
        id:eUser.id,
        name:eUser.name,
        email:eUser.email, 
        entries : eUser.entries,
        joined : eUser.joined
    }})
  }

  calculateFacesLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions;//[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');  
    const width = Number(image.width);
    const height = Number(image.height);

    

    let pBoxes=clarifaiFace.map(element =>{
      const temp=element.region_info.bounding_box;
      return{
        leftCol: temp.left_col * width,
        topRow: temp.top_row * height,
        rightCol:width - (temp.right_col * width),
        bottomRow:height - (temp.bottom_row * height),
      }
    });
    return pBoxes;
    

  }



  onRouteChange = (route) =>{
    if(route==='home'){
      this.setState({isSignedIn:true})
    }else if(route==='singin'){
      this.setState({isSignedIn:true})
      this.setState({imageURL:''})
    }

    this.setState({route:route})

  }

   displayFaceCBox = (ebox) =>{
    this.setState({cBox:ebox});

  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageURL :this.state.input});
      fetch('https://protected-spire-67545.herokuapp.com/imageurl',{
       method:'post',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
         
        })
      })
      .then( response => response.json())
      .then( response =>{
        if(response){
          fetch('https://protected-spire-67545.herokuapp.com/image',{
           method:'put',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
             
            })
          })
            .then(response =>response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user,
                {entries:count}))
            })
            .catch(err => console.log(err));
        }
      
        this.displayFaceCBox(this.calculateFacesLocation(response))

      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Particles className = 'particles'
          params = {ParticlesOptions} />
        <Navigation onRouteChange={this.onRouteChange}
          route ={this.state.route} />
        {
          
          this.state.route==='home' 
            ?
              <div>
                <Logo />

                <Rank name={this.state.user.name} 
                entries={this.state.user.entries}/>

                <ImageLinkForm onInputChange = {this.onInputChange}
                  onButtonSubmit = {this.onButtonSubmit}/>

                <FaceRecognition 
                  cBox = {this.state.cBox}
                  imageURL = {this.state.imageURL}/>
              </div>
            :(
              this.state.route==='singin'
                ? <Singin onRouteChange = {this.onRouteChange}
                  loadUser ={this.loadUser}/>
                : <Register onRouteChange = {this.onRouteChange}
                  loadUser ={this.loadUser} />

            )


           

            
        }
      </div>
    );
  }
  
}

export default App;
