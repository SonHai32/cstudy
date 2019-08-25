import React from 'react';
import './App.css';
import firebase from '../firebase'
import { Button, Grid } from 'semantic-ui-react';
import HeaderPanel from './Header/header'


class App extends React.Component{

  logout = event =>{
    firebase.auth().signOut();
  }

  render(){
    return(
      <Grid padded >
       
            <HeaderPanel />
      
        <Grid.Row>
          <Grid.Column>
            ddd
          </Grid.Column>
          <Grid.Column>
            hhh
          </Grid.Column>
          <Grid.Column>
            sss
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default App;
