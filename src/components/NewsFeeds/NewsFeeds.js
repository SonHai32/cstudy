import React from 'react'
import {Segment,Header,Icon, Feed,Image, Divider, Form, TextArea, Button, List, Responsive, Dropdown, Container, Loader, Dimmer, Label, Input} from 'semantic-ui-react'
import uuid from 'uuidv4'
import firebase from '../../firebase'
import FileModal from './FileModal'
import ImageModal from './ImageModal'
import * as moment from 'moment'
import hash from 'js-hash-code'
import editIcon from '../../Images/edit.svg'
import CreatePostModal from './CreatePostModal'





class NewsFeeds extends React.Component{

    state ={
      like: false,
      user: this.props.currentUser,
      post: '',
      fileModal: false,
      imageModalStatus: false,
      imageModalURL: '',
      postModal: false,
      imagePost: [],
      postCreate: [],
      postModal: false,
      postFromDatabase: [],

      databaseRef: firebase.database().ref('posts'),
      imageLoading: false,
      postLoading: false,
      postDrowdownOptions: [
        {
          key: 'savePost',
          text: <span><Icon circular size='small' name='tag' />Lưu bài viết</span>,

          
        },
        {
          key: 'postReport',
          text :  <span onClick={this.handleMessage} ><Icon circular size='small' name='warning' />Báo cáo bài viết</span>,
          
        
      },

      ]
   
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



  

    openImageModal = event =>{
     
      this.setState({imageModalStatus: true, imageModalURL: event.target.name})
    }

    closeImageModal = () =>{
      this.setState({imageModalStatus: false, imageModalURL:''})

    }

    openPostModal = () =>{
      this.setState({postModal: true})
    }

    closePostModal = () =>{
      this.setState({postModal: false})
    }

   


      

      handleLikeClicked = (event, {name}) =>{
     
        event.preventDefault();
        const post = this.state.postFromDatabase.filter((val,key,arr)=>{
          return val.postChild === name
        })

        console.log(post[0].avatar);

        
        
        let postLiked= post[0].liked;

        const  currentUserLiked = postLiked.some(val=>{
          
          return val.userUID === this.state.user.uid;
         
        })


        const imageNotExist = post[0].postImages === undefined;
      
        if(currentUserLiked){
            postLiked = postLiked.filter((val,index,arr)=>{
            return val.userUID !== this.state.user.uid
          })
        }else{
          postLiked.push({username: this.state.user.displayName, userUID: this.state.user.uid})
        }
  
        let postUpdate ;
        if(imageNotExist){
          post.forEach(val=>{
            postUpdate ={
              postChild: val.postChild,
              createByUid: val.createByUid,
              createByName: val.createByName,
              avatar: val.avatar,
              timestamp: val.timestamp,
              postText: val.postText,
              liked: postLiked
            }
            
          
          })
         
        }else{
          post.forEach(val=>{
            postUpdate ={
              postChild: val.postChild,
              createByUid: val.createByUid,
              createByName: val.createByName,
              avatar: val.avatar,
              timestamp: val.timestamp,
              postImages: val.postImages ,
              postText: val.postText,
              liked: postLiked
            }
            
          
          })
        }
       
  
         this.state.databaseRef.child(name).set(postUpdate).then(()=>this.addPostListener()).catch(err=>console.log(err))
  
      
      }

      

      
      displayImagePost = ({imagePost}) =>(
        // this.state.uploadStatus.includes('uploading')  ? 
        // <Segment size='large' loading={this.state.percentUploaded < 100} >
        //   <List horizontal>
          
        //       {imagePost.map((val,key) => (
        //         <List.Item key={key+uuid} style={{marginRight: '15px'}}> 

        //             <Image  rounded size='small' key={val.downloadURL} src={val.downloadURL} label={{as: 'a' ,name: key, corner:'right', icon:'remove',size: 'mini',color:'red',onClick: this.removeImagePost}} /> 
                
        //         </List.Item> ) )}
                
        //     <List.Item>
        //       <Icon style={{cursor: 'pointer', boder: 'solid 2px '}} color='black' inverted name='add' size='big' onClick={this.openModal} />
        //     </List.Item>
        //   </List>
          
        // </Segment> : ''
        <Dimmer.Dimmable  > 
          <Dimmer inverted active={this.state.percentUploaded > 0 && this.state.percentUploaded <100}>
            <Loader>Loading</Loader>
           
          </Dimmer>

          <List horizontal>
          
              {imagePost.map((val,key) => (
                  <List.Item key={key+uuid} style={{marginRight: '15px'}}> 
  
                      <Image wrapped rounded size='small' key={val.downloadURL} src={val.downloadURL} label={{as: 'a' ,name: key, corner:'right', icon:'remove',size: 'tiny',color:'red',onClick: this.removeImagePost}} /> 
                  
                  </List.Item> ) )}
                  
              {imagePost.length > 0 ? 
                <List.Item>
              <Icon link color='black' inverted name='add' size='big' onClick={this.openFileModal} />
            </List.Item>
            : ''  
          }
            </List>
            
    
     
          
        </Dimmer.Dimmable>
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
        
        <FileModal 
          fileModal={this.state.fileModal}
          uploadFile = {this.uploadFile}  
          closeModal = {this.closeFileModal}
        />
        <CreatePostModal 
          modal={this.state.postModal} 
          closeModal={this.closePostModal}
          user={user}
          />
        
    <Segment stacked>
    
        <Header as='h3' block style={{background :'#F9FCFA'}}> 
        
          <Header.Content style={{opacity: 0.6}}> <Image spaced='right' style={{width:'30px'} } src={editIcon} />Tạo Bài Viết  </Header.Content>
        
        </Header>
        
          {this.displayImagePost(this.state)}
        

    

        <Container   fluid style={{width: '100%', height: '80px'}}>
        
           
            <Header  textAlign='left'>
              <Image size='large' avatar src={user.photoURL}/> 
              <span onClick={this.openPostModal} style={{opacity: 0.5}}>Bạn muốn chia sẻ điều gì ?  </span>
            </Header>
         
        
        </Container>
        <Button fluid color='teal' onClick={this.openPostModal}>
          Tạo bài viết của bạn
        </Button>

      {/* <Button.Group  compact fluid widths={4}  >
        
      <Button inverted style={{background: '#6FBE42'}}  onClick={this.openFileModal}  >
              <Icon name='photo' /> Ảnh/Video
            </Button>
            <Button inverted style={{background: '#6FBE42'}}>
              <Icon name='user plus' /> Tag Friends
            </Button>
         
         
            <Button inverted style={{background: '#6FBE42'}}>
              <Icon name='smile outline' /> Cảm Xúc
            </Button>
          
            <Button inverted style={{background: '#6FBE42'}}>
              <Icon name='list' /> Khác
             </Button>
      </Button.Group> */}
     
  
      {this.state.post.length > 0 || this.state.imagePost.length >0 ? <Button onClick={this.savePost} fluid style={{marginTop: '20px',background:'#ecf7e7'}}>
        Post
      </Button> : ''}
        
    </Segment>
        
      
    
      {postFromDatabase.length > 0 ? (
        postFromDatabase.map((val, key) =>(
          
          <Segment  >
      
          <Feed size='large'>
              <Feed.Event>
              <Feed.Label image ={val.avatar} />
              <Feed.Content>
                <Feed.Summary> 
                <Dropdown
                  inline
                  closeOnChange
                  options={this.state.postDrowdownOptions}
                  pointing='top right'
                  icon={null}
                  style={{float: 'right', zIndex: 1000}}
                  trigger={<i style={{opacity: 0.5}} className="fas fa-ellipsis-h"></i>}
                />
                <Feed.User content={val.createByName} />
                <Feed.Date>

                {moment(val.timestamp).locale('vi').fromNow()}
                {/* {moment(val.timestamp).fromNow()} */}
               
                  
                </Feed.Date>
                
                </Feed.Summary>
                <Feed.Summary>
                  <i style={{opacity: 0.5, fontSize: 14}} className="fas fa-globe-asia"></i> 
               
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
       

          <Container style={{marginTop:'15px'}} fluid> 
          <Icon 
            name={val.liked.length -1 !==0 ? 'thumbs up': ''} 
            color='blue'  size='small' /> 
            <span style={{opacity: 0.6}}>{val.liked.length -1 === 0 ? '': val.liked.length -1 +' Thích' }</span>
            <span style={{float: 'right',opacity: 0.6}} >20 comnents</span>
          </Container>
         
          <Divider />
            <Button.Group fluid size='small' compact >
            <Button  name={val.postChild} onClick={this.handleLikeClicked} basic compact >
            
                <Icon name='thumbs up'  color={val.liked.some(val=>{return val.userUID === user.uid}) ? 'blue' :''} /> Like
              </Button>
              <Button basic compact >
                <Icon name='comment outline' /> Comment
              </Button>
              <Button  basic compact>
                <Icon name='share' /> Share 
              </Button>
            </Button.Group>
            <Divider />
      
         
        
      </Feed>
      </Segment>
        ))
      ) :  ''}

     

 

      
  </React.Fragment>
 
           
            
        )
    }

}

export default NewsFeeds