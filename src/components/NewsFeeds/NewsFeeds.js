import React from 'react'
import {Segment,Header,Icon, Feed,Image, Divider, Form, TextArea, Button, List, Responsive, Dropdown, Container, Loader, Dimmer, Label} from 'semantic-ui-react'
import uuid from 'uuidv4'
import firebase from '../../firebase'
import FileModal from './FileModal'
import ImageModal from './ImageModal'
import * as moment from 'moment'
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



    
    handlePostChange = (e, { value}) =>{
    
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
  
        imageLoading: true,
        uploadTask: this.state.storeRef.child(filePath).put(file,metadata)
      
        },
          () => {
            this.state.uploadTask.on('state_changed', snap =>{
              const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes)*100);
              console.log(percentUploaded)
              this.setState({percentUploaded});
            
            if(percentUploaded === 100){
              this.setState({percentUploaded: 0})
              setTimeout(()=>{
                this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                const image = {downloadURL: downloadURL, imagePath: this.state.uploadTask.location_.path}
                this.setState({imagePost: this.state.imagePost.concat(image),imageLoading: false})
              
                 })
                .catch(err=>console.log(err))
              },1000)  
            
            }
            
            })
          },err=>{console.log(err)}
        )
      }

      savePost = event =>{
        event.preventDefault();
        const postChild = this.state.user.uid+uuid()+'/post';
        const postCreate ={
          postChild: postChild,
          createByUid: this.state.user.uid,
          createByName: this.state.user.displayName,
          avatar: this.state.user.photoURL ,
          timestamp: Date.now(),
          postImages: Array().concat(this.state.imagePost),
          postText: this.state.post,
          liked: [{username: 'null', userUID: 'null'}]
        }
        
        this.state.databaseRef.child(postChild).set(postCreate).then(()=>this.setState({post: '', imagePost: []}))
        
      }


      

      handleLikeClicked = (event, {name}) =>{
        // const checkLike = userUID =>{
        //  return this.state.user.uid === userUID
        // }
        console.log(name)
        event.preventDefault();
        const post = this.state.postFromDatabase.filter((val,key,arr)=>{
          return val.postChild === name
        })

        
        let userLiked;
      
        let postLikedUpdate = []

        let imageNotExist;

        post.forEach(val =>{
          postLikedUpdate = val.liked
          val.liked.forEach((val,index) =>{
            userLiked = val.userUID === this.state.user.uid
            imageNotExist = val.imagePost === undefined
          })
          if(userLiked){
            postLikedUpdate = val.liked.filter((val,index,arr)  =>{
              return val.userUID !== this.state.user.uid
            })
          }else{
            let user ={username: this.state.user.displayName, userUID: this.state.user.uid};
            postLikedUpdate.push(user);
          }
          
        })

        
        let postUpdate
        if(imageNotExist){
          post.forEach(val=>{
            postUpdate ={
              postChild: val.postChild,
              createByUid: val.createByUid,
              createByName: val.createByName,
              avatar: val.avatar,
              timestamp: val.timestamp,
              postText: val.postText,
              liked: postLikedUpdate
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
              liked: postLikedUpdate
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
              <Icon link color='black' inverted name='add' size='big' onClick={this.openModal} />
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
        
        <FileModal fileModal={this.state.fileModal}
                   uploadFile = {this.uploadFile}
                   closeModal = {this.closeModal}
        />
        
    <Segment stacked>
    
        <Header as='h3' block>
        
          <Header.Content style={{opacity: 0.6}}>Tạo Bài Viết <Icon name='edit outline' /></Header.Content>
        
        </Header>
        
          {this.displayImagePost(this.state)}
        

    

        <Form style={{marginTop: '5px'}}>
         <Form.Group >
           <Image avatar src={user.photoURL}/>
           <TextArea placeholder="What do you thing ?  "   value={post} onChange={this.handlePostChange} >
            
          </TextArea>
         </Form.Group>
        
        </Form>

      <Button.Group  compact fluid widths={4}  >
        
      <Button inverted style={{background: '#6FBE42'}}  onClick={this.openModal}  >
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
      </Button.Group>
     
  
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
          <Divider />

          <Container fluid> 
            <Icon name='thumbs up' color='blue'  size='small' /> <span style={{opacity: 0.6}}>20 likes</span>
            <span style={{float: 'right',opacity: 0.6}} >20 comnents</span>
          </Container>
          <Divider />
          
            <Button.Group fluid   >
            <Button name={val.postChild} onClick={this.handleLikeClicked} basic size='medium'>
            
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