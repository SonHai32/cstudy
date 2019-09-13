import React from 'react'
import {Segment,Header,Icon, Feed,Image, Divider, Form, TextArea, Button, List, Responsive, Dropdown, Container} from 'semantic-ui-react'
import uuid from 'uuidv4'
import firebase from '../../firebase'
import FileModal from './FileModal'
import ImageModal from './ImageModal'
import moment from 'moment'
import hash from 'js-hash-code'
class NewsFeeds extends React.Component{

    state ={
      like: false,
      user: this.props.currentUser,
      post: '',
      fileModal: false,
      imageModalStatus: false,
      imageModalURL: '',
      uploadTask: null,
      uploadStatus : '',
      percentUploaded : 0,
      imagePost: [],
      postCreate: [],
      postFromDatabase: [],
      storeRef: firebase.storage().ref(),
      databaseRef: firebase.database().ref('posts')
     
    }

    componentDidMount(){
      this.addPostListener()
    }

    addPostListener = () =>{

      const ref = firebase.database().ref('posts')
      const postLoaded = []
      ref.on('child_added',snap =>{
        ref.child(snap.key).on('child_added',snap => postLoaded.push(snap.val()));
        this.setState({postFromDatabase: postLoaded.sort((a,b) =>{return b.timestamp-a.timestamp})})
   
        
      })
   
      
  
    }


    handleLikeClicked = event =>{
        event.preventDefault();
        this.setState({like: !this.state.like })
    }
    
    handlePostChange = (e, { value}) =>{
      e.preventDefault();
      this.setState({post: value})
    }
    
    openModal = () =>{
      this.setState({fileModal: true})
    }

    closeModal = () =>{

      this.setState({fileModal: false})
    }

    openImageModal = event =>{
     
      this.setState({imageModalStatus: true, imageModalURL: event.target.name})
    }

    closeImageModal = () =>{
      this.setState({imageModalStatus: false, imageModalURL:''})

    }

    uploadFile = (file, metadata) =>{
      const filePath = this.state.user.uid+'/media/image/'+uuid()+'.jpg'

      this.setState({
        uploadStatus : 'uploading',
        uploadTask: this.state.storeRef.child(filePath).put(file,metadata)
      
        },
          () => {
            this.state.uploadTask.on('state_changed', snap =>{
              const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes)*100)
              this.setState({percentUploaded});
            
            
            this.state.uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              const image = {downloadURL: downloadURL, imagePath: this.state.uploadTask.location_.path}
              this.setState({imagePost: this.state.imagePost.concat(image)})
            
               })
              .catch(err=>console.log(err))
          
            })
          }
        )
      }

      savePost = event =>{
        event.preventDefault();
        const postCreate ={
          createByUid: this.state.user.uid,
          createByName: this.state.user.displayName,
          avatar: this.state.user.photoURL ,
          timestamp: Date.now(),
          postImages: Array().concat(this.state.imagePost),
          postText: this.state.post
        }
        const postChild = this.state.user.uid+uuid()+'/post';
        this.state.databaseRef.child(postChild).set(postCreate).then(()=>this.setState({post: '', imagePost: []}))
        
      }

      
      displayImagePost = ({imagePost}) =>(
        imagePost.length > 0 ? 
        <Segment size='large' >
          <List horizontal>
          
              {imagePost.map((val,key) => (
                <List.Item key={key+uuid} style={{marginRight: '15px'}}> 
                  <Image rounded size='small' key={val.downloadURL} src={val.downloadURL} label={{as: 'a' ,name: key, corner:'right', icon:'remove',size: 'mini',color:'red',onClick: this.removeImagePost}} /> 
                </List.Item> ) )}
                
            <List.Item>
              <Icon style={{cursor: 'pointer', boder: 'solid 2px '}} color='black' inverted name='add' size='big' onClick={this.openModal} />
            </List.Item>
          </List>
          
        </Segment> : ''
      )
      
      deleteImageFromStorge = imagePath =>{
          if(imagePath){
            this.state.storeRef.child(imagePath).delete().then(() => console.log("deleted")).catch(err=> console.log(err))
          }
          
      }

      removeImagePost = event =>{
        event.preventDefault();
        let removeIndex = event.target.name;
        
        this.deleteImageFromStorge(this.state.imagePost[removeIndex].imagePath)

        const newImagePost = this.state.imagePost.filter((value,index,arr) =>{
          return index != removeIndex
        })
        

        this.setState({imagePost : newImagePost})
        
        
      }
      
    

    render(){
        const {user,post,postFromDatabase} = this.state;
        return(
      <React.Fragment>
        
        <FileModal fileModal={this.state.fileModal}
                   uploadFile = {this.uploadFile}
                   closeModal = {this.closeModal}
        />
        
    <Segment stacked>
      
        <Header as='h3' block>
        
          <Header.Content>Create Post <Icon name='edit outline' /></Header.Content>
        
        </Header>
        
          {this.displayImagePost(this.state)}
        

    

        <Form style={{marginTop: '5px'}}>
         <Form.Group >
           <Image avatar src={user.photoURL}/>
           <TextArea placeholder='What do you thing ? ' value={post} onChange={this.handlePostChange} >
          
          </TextArea>
         </Form.Group>
        
        </Form>
       
      <Responsive minWidth={1800}>
      <Button.Group fluid >
        
      <Button circular onClick={this.openModal}  >
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
      {this.state.post.length > 0 || this.state.imagePost.length >0 ? <Button  onClick={this.savePost} fluid style={{marginTop: '20px'}}>
        Post
      </Button> : ''}
        
    </Segment>
    
      
    
      {postFromDatabase.length > 0 ? (
        postFromDatabase.map((val, key) =>(
          
          <Segment >
         
          <Feed size='large'>
              <Feed.Event>
              <Feed.Label image ={val.avatar} />
              <Feed.Content>
                <Feed.Summary> 
                <Feed.User content={val.createByName} />
                <Feed.Date>
                  {moment(val.timestamp).fromNow()}
                  <Dropdown  
                    icon='setting'
                    basic
                    floating
                    inline
                    clearable
                  
                    
                  />
                  
                </Feed.Date>
                </Feed.Summary>

                
                 
           
              </Feed.Content>
              
              </Feed.Event>
            
          </Feed>
          
          <Feed size='large'  >
          
          <Feed.Event>
            <Feed.Content >
              <Container fluid text textAlign='justified' content={val.postText}>

              </Container>
              {val.postImages ? (
                val.postImages.map((value,key) =>(        
                    <List key={val.createByUid+val.timestamp+uuid()+hash(value.downloadURL)} horizontal  >
                      <List.Item key={'list'+val.createByUid+val.timestamp+uuid()+hash(value.downloadURL)}   as='a'  >
                       
                       
                          <Image centered fluid key={'image'+val.createByUid+val.timestamp+uuid()+hash(value.downloadURL)} src={value.downloadURL} name={value.downloadURL} onClick={this.openImageModal} />
                          {/* <img style={{padding: '10px 10px'}} src={value.downloadURL} name={value.downloadURL} onClick={this.openImageModal} />
                     */}
                        <ImageModal 
                         
                          imageModal={this.state.imageModalStatus} 
                          closeModal={this.closeImageModal}
                          imageURL={this.state.imageModalURL} />
                      </List.Item>
                    </List>
                    
                
                ))
              ) : ''}
               
             
            </Feed.Content>
            
          </Feed.Event>
          <Divider />
          
            <Button.Group fluid  color='blue' >
            <Button basic size='medium' >
                <Icon name='thumbs up' color='blue' /> Like
              </Button>
              <Button basic size='medium' >
                <Icon name='comment outline' /> Comment
              </Button>
              <Button  basic size='medium' >
                <Icon name='share' /> Share 
              </Button>
            </Button.Group>
      
         
        
      </Feed>
      </Segment>
        ))
      ) :  ''}

     

 

      
  </React.Fragment>
 
           
            
        )
    }

}

export default NewsFeeds