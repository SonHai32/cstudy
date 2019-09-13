import React from 'react'
import { Menu, Header, Button, Grid, List, Icon, Popup, Modal, Form } from 'semantic-ui-react'
import firebase from '../../firebase'

class SidePanelLeft extends React.Component{

    state = { activeItems: 'NewsFeed',
              channels: '',
              modalOpen : false,
              channelName: '',
              channelDetail: '',
              channelRef: firebase.database().ref('Channels'),
              user: this.props.currentUser,
              errors : [],
              
                    
  };

  componentWillMount(){
    this.removeListener();
  }

  componentDidMount(){
    this.addListener();
  }
  
    addListener = () =>{
      let loadedChannels = [];
      this.state.channelRef.on('child_added', snap=>{
        loadedChannels.push(snap.val());
        this.setState({channels: loadedChannels})
      })
    }

    removeListener = () =>{
      this.state.channelRef.off()
    }

    displayChannels = channels => channels.length > 0 && channels.map(channel =>(
      <List.Item  style={{textAlign: 'left' ,marginLeft: '10px', opacity: 0.7}} onClick={() => console.log(channel.channelName)} >
        <List.Content>
          <List.Header style={{color: 'brown', fontWeight: 400}} ><Icon name='star' color='yellow' />{channel.channelName} </List.Header>
        </List.Content>
      </List.Item>
    ))

    handleItemClicked = (e ,{name}) =>{
      this.setState({activeItems : name})
    }

    createChannelClicked = e =>{
      e.preventDefault();
      this.setState({modalOpen: true})
    }

    closeModal = () =>{
  
      this.setState({modalOpen: false})
    }

    handleChannelCreate = (e, {name,value}) =>{
      this.setState({[name] : value})
    }

    channelCreateSubmit = event =>{
      event.preventDefault();
      if(this.isFormValid(this.state)){
        this.createChannel()
      }else{
        console.log(this.state.errors)
      }
    }


    createChannel = () =>{
      const {channelRef, channelName, channelDetail, user} = this.state;
      const key = channelRef.push().key
      const newChannel ={
        channelName: channelName,
        channelDetail: channelDetail,
        createdBy : {
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        }
      }

      channelRef
        .child(key)
        .update(newChannel)
        .then(() =>{
          this.setState({channelName: '', channelDetail: ''})
          this.closeModal();
          console.log("channel created")
        }).catch(err =>{
          console.log(err)
        })
    }

    isFormValid = ({channelName, channelDetail}) =>{
      
      
      if(channelName === '' || channelDetail === ''){

        this.setState({errors: this.state.errors.concat("Channel name or Channel description can't be null" )});
        return false
      }else if(channelName.length > 100){

        this.state({errors: this.state.errors.concat("Channel name must be under 100 character")});
        return false;
      }else if(channelDetail.length > 300){
        
        this.setState({errors: this.state.errors.concat("Channel Detail must be under 300 character")})
        return false
      }else{
        this.setState({errors: []})
        return true;
      }
    }

    render(){
        const {activeItems,modalOpen, channels} = this.state;
        return(
         
        <Grid centered>
          <Grid.Column textAlign='center'> 
            <Menu   
            fixed='left'
            vertical
            style={{ background: '#e7e7e7', top: '80px', padding: '30px 0' }}
            color='black'
            pointing
            borderless
            size='huge'
            compact
          
          
            >
              {console.log(this.state.currentUser)}
            
            <Menu.Item 

              name='NewsFeed'
              active={activeItems === 'NewsFeed'}
              onClick={this.handleItemClicked}
             
            >
              <Header as='h4'><Icon name='newspaper' />NewsFeed</Header>
              </Menu.Item>
          

            <Menu.Item 
              
              name='Channels'
              active={activeItems === 'Channels'}
              onClick={this.handleItemClicked}
              color='green'
              style={{width: '100%'}}
            >
              <Header as='h4'><Icon name='tag' />Channels</Header>
              {activeItems === 'Channels' ? 
                
                <List animated selection  celled size='medium' style={{height: '75vh' , marginTop: '20px' ,overflowX: 'hidden' ,overflowY: 'scroll'}}  >
                  
                    
                    <Popup
                      style={{opacity: 0.5}}
                      inverted
                      mouseEnterDelay={700}
                      position='top center'
                      content='Create Your Channel'
                      trigger={
                      <Button basic fluid animated='fade' onClick={this.createChannelClicked}>
                      
                        <Button.Content hidden>
                        
                          <Icon name='add' />
                        </Button.Content>
                        <Button.Content visible>
                           Create Channel
                        </Button.Content>
                      </Button>}
                    />
                  
                        {this.displayChannels(channels)}
                </List>
                 : ''
                 
              }
              </Menu.Item>
            
          </Menu>
          <Modal dimmer='inverted' open={modalOpen}> 
              <Modal.Header>Create Channel</Modal.Header>
              <Modal.Content>
                <Form widths='equal' >
                  <Form.Input 
                    name='channelName'
                    required 
                    placeholder='Channel Name' 
                    onChange={this.handleChannelCreate}
                  />
                  <Form.Input
                    name='channelDetail'
                    required 
                    placeholder='Detail'
                    onChange={this.handleChannelCreate} 
                  />
              
                </Form>
                
              </Modal.Content>
              <Modal.Actions>
                  <Button inverted color='green' onClick={this.channelCreateSubmit} >Create</Button>
                  <Button inverted color='red' onClick={this.closeModal}>Cancel</Button>
              </Modal.Actions>

          </Modal>
          </Grid.Column>
        </Grid>
       
        )

    }
}

export default SidePanelLeft;