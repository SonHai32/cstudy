import React from 'react'
import {Header, Grid, Image, Dropdown, Icon, Menu, Label, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import firebase from '../../firebase'
import { isAbsolute } from 'path';

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
        {
            key: 'setting',
            text: <span><Icon name='setting'/> Settings</span>
        }
       
    ]


    handleSignOut = event =>{
        event.preventDefault();
        firebase.auth().signOut();
    }



    render(){
        
        const {currentUser} = this.state;
        const avatarProps ={
            avatar: true,
            src: currentUser.photoURL,
            space: 'right'
        }
       

        return(
            <Menu fixed='top' color='black' inverted style={{height: '80px'}} >
                <Grid columns='equal' style={{width: '100%'}}>
                    <Grid.Column verticalAlign='middle' floated='left'  >
                        <Header color='white' inverted> <Icon name='code' color='white' /> Chat</Header>
                    </Grid.Column>
                    <Grid.Column  verticalAlign='middle' textAlign='center'>

                    <Label
                        as='a'
                        color='black'
                        size='large'
                        content={currentUser.displayName}

                        image={avatarProps}
                    >

                    </Label>
                    
                    
                 
                    <Menu compact color='black' inverted>
                        <Menu.Item as='a'>
                            <Icon name='mail'/> 
                            <Label floating color='blue' size='tiny'>
                            0
                            </Label>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='alarm' />
                            <Label floating color='blue' size='tiny'>
                                0
                            </Label>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='users' />
                            <Label floating color='blue' size='tiny'>
                                0
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown 
                                
                                inline
                                clearable
                                trigger={<span></span>}
                                options={this.dropDownOptions()}
                            >

                            </Dropdown>
                        </Menu.Item>

                    </Menu>
                

                    </Grid.Column>
                </Grid>
            </Menu>
        );

    }

}


const mapStateToProp = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProp)(HeaderPanel);