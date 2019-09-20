import React from 'react';
import {connect} from 'react-redux'
import './App.css';
import {  Grid,Responsive} from 'semantic-ui-react';
import HeaderPanel from './Header/header'
import SidePanelLeft from './SidePanel/SidePanelLeft'
import SidePanelRight from './SidePanel/SidePanelRight'
import NewsFeeds from './NewsFeeds/NewsFeeds'



const App = ({currentUser}) =>(
  <Grid style={{background : '#EDEDED'}}>
       
    <HeaderPanel />
    <Responsive minWidth={480}>
      <SidePanelLeft currentUser={currentUser} />
    </Responsive>
    {/* <SidePanelRight /> */}
    
      <Grid.Column  style={{width: '35%' ,marginTop: '90px', left: '50%',transform: 'translateX(-50%)'}}>
      <NewsFeeds currentUser={currentUser} />
      </Grid.Column>
  
    
   
      </Grid>
)

const mapStateToProps = state =>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
