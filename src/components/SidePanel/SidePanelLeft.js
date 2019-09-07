import React from 'react'
import { Segment, Sidebar, Divider,Menu, Header, Button, Grid } from 'semantic-ui-react'

class SidePanelLeft extends React.Component{

    state = { activeItems: 'NewsFeed'};
    handleItemClicked = (e ,{name}) =>{
      this.setState({activeItems : name})
    }
    render(){
        const {activeItems} = this.state;
        return(
         
        <Grid centered>
          <Grid.Column textAlign='center'> 
            <Menu   
            fixed='left'
            vertical
            style={{ background: '#e7e7e7', top: '80px'}}
            color='black'
            pointing
            >
            <Menu.Item 
              name='Channels'
              active={activeItems === 'Channels'}
              onClick={this.handleItemClicked}
              color='green'
            />
            <Menu.Item 
              name='NewsFeed'
            
              active={activeItems === 'NewsFeed'}
              onClick={this.handleItemClicked}
              color='green'
            />
              
          </Menu>
          </Grid.Column>
        </Grid>
       
        )

    }
}

export default SidePanelLeft;