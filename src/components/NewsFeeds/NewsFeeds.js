import React from 'react'
import {Segment,Header,Icon,Label, Feed,Image, Divider, Grid, Form, TextArea, Menu, Button, List, Responsive} from 'semantic-ui-react'
import { Dirent } from 'fs';
import { placeholder } from '@babel/types';

class NewsFeeds extends React.Component{

    handleLikeClicked = event =>{
        event.preventDefault();
        this.setState({like: !this.state.like })
    }
    
    state ={
        like: false,
        user: this.props.currentUser
    }

    render(){
        const {like,user} = this.state;
        const newFeed ={

        }
       
        return(
      <React.Fragment>

    <Segment stacked>
        <Header as='h3' block>
        
          <Header.Content>Create Post <Icon name='edit outline' /></Header.Content>
         
        </Header>
     

        <Form style={{marginTop: '5px'}}>
         <Form.Group >
           <Image avatar size='tiny' src={user.photoURL}/>
           <TextArea placeholder='What do you thing ? ' onInput={()=> console.log("object")} >
          
          </TextArea>
         </Form.Group>
        
        </Form>
       
      <Responsive minWidth={1800}>
      <Button.Group fluid >
      <Button circular  >
              <Icon name='photo' /> Photo/Video
            </Button>
            <Button circular>
              <Icon name='user plus' /> Tag Friends
            </Button>
         
            <Button circular>
              <Icon name='music' /> Music
            </Button>
            <Button circular>
              <Icon name='smile outline' /> Feeling
            </Button>
            <Button circular>
              <Icon name='location arrow' /> Check in
            </Button>
            <Button>
              <Icon name='list' /> More
             </Button>
      </Button.Group>
      </Responsive>
      <Responsive maxWidth={1790} >
      <Button.Group fluid >
      <Button circular  >
              <Icon name='photo' /> Photo/Video
            </Button>
            <Button circular>
              <Icon name='user plus' /> Tag Friends
            </Button>
         
            
            <Button>
              <Icon name='list' /> More
             </Button>
      </Button.Group>
      </Responsive>

         
    </Segment>
    <Segment >
      
      
      <Feed size='large' >
    
    <Feed.Event  >
      <Feed.Label>   
        <img src='https://www.gravatar.com/avatar/b4339e6c847f4f25822532330320548e?d=identicon' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
          
        </Feed.Summary>
        <Feed.Extra text>
        
        Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer. Text messages may be sent over a cellular network, or may also be sent via an Internet connection.

The term originally referred to messages sent using the Short Message Service (SMS). It has grown beyond alphanumeric text to include multimedia messages (known as MMS) containing digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons).

Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages has become an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, 
including in contexts where a call would be impolite or inappropriate (e.g., 
calling very late at night or when one knows the other person is busy with family or work activities). 
Like e-mail and voicemail, and unlike calls (in which the caller hopes to speak directly with the recipient), 
texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. 
Text messages can also be used to interact with automated systems, 
Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, 
 and other notifications instead of using postal mail, email, or voicemail.
 Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, 
 and other notifications instead of using postal mail, email, or voicemail.
 and other notifications instead of using postal mail, email, or voicemail.
 and other notifications instead of using postal mail, email, or voicemail.
 and other notifications instead of using postal mail, email, or voicemail.
       
for example, to order products or services from e-commerce websites, or to participate in online contests.
 Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, 
 and other notifications instead of using postal mail, email, or voicemail.
 
 
        </Feed.Extra>
        <Divider clearing />
        <Feed.Extra text >
          20 likes
        </Feed.Extra>
        <Divider clearing />
        <Feed.Meta>
        
          <Feed.Like   as='a' style={{marginRight: '20px'}}>
            <Icon size='large' name='thumbs up outline' /> Like
          </Feed.Like>
        
          <Feed.Like > 
            <Icon name='comment outline' size='large' /> Comment
          </Feed.Like>
         
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  
      </Feed>
      

  </Segment>

      
  </React.Fragment>
 
           
            
        )
    }

}

export default NewsFeeds