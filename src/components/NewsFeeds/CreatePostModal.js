import React from 'react'
import { Modal, Header, Icon,Form,Image, Button, Input } from 'semantic-ui-react';
import pictureIcon from '../../Images/picture.svg'
import tagFriends from '../../Images/tagfriends.svg'
import locationIcon from '../../Images/location.svg'
import editIcon from '../../Images/edit.svg'

class CreatePostModal extends React.Component{

    

    render(){

        
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


                            <Form.Field style={{width: '100%'}}>
                                <Input placeholder="Bạn đang nghĩ gì ?" transparent style={{height: '100%',fontSize: 16}} />

                            </Form.Field>

                        </Form.Group>
                        
                        <Button.Group  widths={3}>
                            <Button  >
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
                           
                        </Button.Group>


                        <Form.Button  color='teal' fluid style={{marginTop: '50px'}}>Chia sẻ</Form.Button>

                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default CreatePostModal