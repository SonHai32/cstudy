import React from 'react';
import './App.css';
import firebase from '../firebase'
import { Button, Grid, Header, Segment, Comment, Label,Image, Icon } from 'semantic-ui-react';
import HeaderPanel from './Header/header'
import SidePanelLeft from './SidePanel/SidePanelLeft'
import SidePanelRight from './SidePanel/SidePanelRight'
import NewsFeeds from './NewsFeeds/NewsFeeds'

class App extends React.Component{

  logout = event =>{
    firebase.auth().signOut();
  }

  render(){
    return(
      <Grid>
       
            <HeaderPanel />
            <SidePanelLeft />
            <SidePanelRight />
       
          <Grid.Column  style={{width: '100%' ,marginTop: '90px', marginLeft: '300px', marginRight: '800px'}}>
            <NewsFeeds />
          </Grid.Column>
    
   
      </Grid>

    )
  }
}

export default App;
