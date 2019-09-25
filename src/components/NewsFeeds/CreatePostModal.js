import React from 'react'
import { Modal, Header,Form,Image, Button, Input, TextArea } from 'semantic-ui-react';
import {Picker,emojiIndex} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'


import pictureIcon from '../../Images/picture.svg'
import tagFriends from '../../Images/tagfriends.svg'
import locationIcon from '../../Images/location.svg'
import editIcon from '../../Images/edit.svg'
import smileIcon from '../../Images/iconsmile.svg'

class CreatePostModal extends React.Component{

    state = {
        postText: '',
        emojiPicker: false,
        selectionStart: 0        

    }
    


    handleTogglePicker = () =>{
        this.setState({emojiPicker: !this.state.emojiPicker})
    }

    handlePostChange = event =>{
        this.setState({postText: event.target.value})
    }

    handleEmojiSelect = emoji =>{
        
        const oldPost = this.state.postText;
        const newPost = this.addEmojiToInputWithSeletionStart(oldPost,this.state.selectionStart,this.colonToUnicode(emoji.colons));
        this.setState({postText: newPost})
        //this.colonToUnicode(`${oldPost} ${emoji.colons}`)
        
    }
    


    colonToUnicode = emojiMessage =>{
        let x = emojiMessage.replace(/:/g,"")
        let emoji = emojiIndex.emojis[x];
        if(emoji !== undefined){
            let unicode = emoji.native
            if(unicode !== undefined){
                return unicode
            }else{
                return null
            }
        } 
        // return message.replace(/:[A-Za-z0-9_+-]+:/g, x=>{
        //     x = x.replace(/:/g, "");
            
        //     let emoji = emojiIndex.emojis[x];
            

        //     if(emoji !== undefined){
                
        //         let unicode = emoji.native
            
        //         if( unicode !== undefined){
        //             return unicode
        //         }else{
        //             return ''
        //         }
        //     }

        //     x = ":" + x + ":"
        // })

    }

addEmojiToInputWithSeletionStart = (post, selectionStart,emoji) =>{
 
    if(post){
        if(emoji){
            
            return post.substring(0,selectionStart) +emoji+ post.substring(selectionStart,post.length)
        }else{
            return post
        }
    }else{
        if(emoji){
            return post + emoji
        }
    }
}

inputClicked = event =>{
   
    this.setState({selectionStart: event.target.selectionStart});
    
}

inputKeyPressed = event =>{
    this.setState({selectionStart: event.target.selectionStart});
    
    
}
    render(){

        const {postText,emojiPicker} = this.state;
        const {user,modal,closeModal} = this.props;
        
        return(
            <Modal centered size='small' open={modal} onClose={closeModal} closeIcon style={{top: '10%', transform: 'translateY(-10%)'}}>
                <Modal.Header >
                <Header as='h3'> 
        
                    <Header.Content style={{opacity: 0.6}}> <Image spaced='right' style={{width:'30px'} } src={editIcon} />Tạo Bài Viết  </Header.Content>
      
                </Header>
                </Modal.Header>
                <Modal.Content>
                    <Form style={{marginTop: '5px'}}>
                        <Form.Group >
                            <Image inline size='tiny' avatar src={user.photoURL}/>


                            <Form.Field  style={{width: '100%'}} >
                                
                            
                                <TextArea
                                    rows={1}
                                    value={postText} 
                                    type='text' 
                                    placeholder="Bạn đang nghĩ gì ?" 
                                    transparent 
                                    onClick={this.inputClicked}
                                    onChange={this.handlePostChange} 
                                    style={{height: '100%',fontSize: 16,float: 'left',overflowY: 'scroll',border: 'none', background: 'none', outline: 'none'}} 
                                    onKeyUp={this.inputKeyPressed}  
                                />
                                
                        

                            </Form.Field>
                            
                        </Form.Group>
                        
                        <Button.Group  size='small' widths={4}>
                            <Button >
                            <Image style={{width:'30px'}} spaced='right' centered  src={pictureIcon} />
                         
                            <span style={{marginLeft:'10px'}}>Ảnh/Video</span>

                            </Button>
                            <Button      >
                            <Image  style={{width:'30px'}} spaced='right' centered  src={tagFriends} />
                         
                            <span style={{marginLeft:'10px'}}>Gắn thẻ bạn bè</span>

                            </Button>
                            <Button      >
                            <Image  style={{width:'30px'}} spaced='right' centered  src={locationIcon} />
                         
                            <span style={{marginLeft:'10px'}}>Check in</span>

                            </Button>
                            <Button  onClick={this.handleTogglePicker}>
                            <Image style={{width:'30px'}} spaced='right' centered  src={smileIcon} />
                         
                            <span style={{marginLeft:'10px'}}>Cảm xúc </span>{
                              
                            }
                            
                            </Button>
                            {emojiPicker ? (
                                (
                                    <div onMouseLeave={this.handleTogglePicker} className="emoji-mart-select">
                                        <Picker 

                                            i18n={{ search: 'Tìm kiếm', categories: { search: 'Tìm kiếm theo mục', recent: 'Đã sử dụng gần đây' } }}
                                            onSelect={this.handleEmojiSelect}
                                            set='facebook'
                                            emoji='point_up'
                                            style={{position: "absolute",left:'55%', top:'65%'}}
                                    
                                        />
                                    </div>
                                )
                            ) : ''}
                          
                           
                        </Button.Group>
                        


                        <Form.Button  color='teal' fluid style={{marginTop: '50px'}}>Chia sẻ</Form.Button>

                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default CreatePostModal