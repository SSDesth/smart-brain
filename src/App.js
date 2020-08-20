import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Singin from './components/Singin/Singin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


//clarifai API Setup
const app = new Clarifai.App({
 apiKey: '98043b27f80549f78acf7afd709cea90'
});


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
      box:{},
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

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');  
    const width = Number(image.width);
    const height = Number(image.height);

     console.log(width,height)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col * width),
      bottomRow:height - (clarifaiFace.bottom_row * height),
    }

  }



  onRouteChange = (route) =>{
    this.setState({route:route})
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});

  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageURL :this.state.input});
    

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( response =>{
        if(response){
          fetch('http://localhost:3000/image',{
           method:'put',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
             
            })
          }).then(response =>response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user,
                {entries:count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
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

                <FaceRecognition box={this.state.box} 
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
