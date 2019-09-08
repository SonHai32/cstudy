import React from 'react';
import {connect} from 'react-redux'
import './App.css';
import firebase from '../firebase'
import { Button, Grid, Header, Segment, Comment, Label,Image, Icon } from 'semantic-ui-react';
import HeaderPanel from './Header/header'
import SidePanelLeft from './SidePanel/SidePanelLeft'
import SidePanelRight from './SidePanel/SidePanelRight'
import NewsFeeds from './NewsFeeds/NewsFeeds'



const App = ({currentUser}) =>(
  <Grid>
       
    <HeaderPanel />
    <SidePanelLeft currentUser={currentUser} />
    <SidePanelRight />
    <Grid.Column  style={{width: '100%' ,marginTop: '90px', marginLeft: '300px', marginRight: '800px'}}>
      <NewsFeeds />
    </Grid.Column>
    
   
      </Grid>
)

const mapStateToProps = state =>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
