import React from 'react'
import {Header, Grid, Image, Dropdown, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import firebase from '../../firebase'

class HeaderPanel extends React.Component{

    state ={
        currentUser: this.props.currentUser,

    }

    dropDownOptions = () =>[
        {
            key : 'profile',
            text : <span onClick={this.handleProfile} ><Icon name='user outline' /> Profile</span>
        },

        {
            key: 'message',
            text :  <span onClick={this.handleMessage} ><Icon name='comments' />Message</span>
        },
        {
            key : 'signOut',
            text: <span onClick={this.handleSignOut}><Icon name='sign out' /> Sign Out</span>
        },
       
    ]

    handleSignOut = event =>{
        event.preventDefault();
        firebase.auth().signOut();
    }

    render(){
        
        const {currentUser} = this.state;
       

        return(
            <Grid.Row color='violet'>
            <Grid.Column verticalAlign='middle' width={5} floated='left'>
                <Header as='h1'> <Icon name='code' color='olive' /> CChat</Header>
                
            </Grid.Column>
            {/* <Grid.Column verticalAlign='middle' width={8} >
                column 2
            </Grid.Column>
             */}
            <Grid.Column textAlign='right' floated='right' verticalAlign='middle' width={5}>  
           
            <Dropdown
                

                pointing='top left'
                inline
                className='icon'
                trigger={
                    <span>
                        <Image spaced='right' avatar src={currentUser.photoURL} />
                        {currentUser.displayName}
                    </span>
                }
                options={this.dropDownOptions()}
            >
                
            </Dropdown>
         
            </Grid.Column>
            
           
           
            </Grid.Row>
        );

    }

}


const mapStateToProp = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProp)(HeaderPanel);