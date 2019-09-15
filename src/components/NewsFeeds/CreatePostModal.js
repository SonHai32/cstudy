import React from 'react'
import { Modal, Header, Icon,Form,Image, Button, Input } from 'semantic-ui-react';

class CreatePostModal extends React.Component{
    render(){
        const {user,postModal,closeModal} = this.props;
        return(
            <Modal centered size='small' open={postModal} onClose={closeModal} closeIcon style={{top: '10%', transform: 'translateY(-10%)'}}>
                <Modal.Header >
                    <Header as='h3'><Icon name='write'/>Tạo Bài Viết</Header>
                </Modal.Header>
                <Modal.Content>
                    <Form style={{marginTop: '5px'}}>
                        <Form.Group >
                            <Image inline size='tiny' avatar src={user.photoURL}/>
          

                            <Form.Field style={{width: '100%'}}>
                                <Input placeholder="Bạn đang nghĩ gì ?" transparent style={{height: '100%',fontSize: 16}} />
                               
                            </Form.Field>

                        </Form.Group>

                      
                        <Form.Button  color='black' fluid style={{background: '#64cd82',marginTop: '50px'}}>Chia sẻ</Form.Button>
        
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default CreatePostModal