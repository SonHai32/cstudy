import React from 'react';
import './App.css';
import firebase from '../firebase'
import { Button } from 'semantic-ui-react';


class App extends React.Component{

  logout = event =>{
    firebase.auth().signOut();
  }

  render(){
    return(
      <Button onClick={this.logout}>
        Sign out 
      </Button>
    )
  }
}

export default App;
