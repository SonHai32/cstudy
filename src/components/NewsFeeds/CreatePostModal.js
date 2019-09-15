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
<<<<<<< HEAD


                            <Form.Field style={{width: '100%'}}>
                                <Input placeholder="Bạn đang nghĩ gì ?" transparent style={{height: '100%',fontSize: 16}} />

=======
          

                            <Form.Field style={{width: '100%'}}>
                                <Input placeholder="Bạn đang nghĩ gì ?" transparent style={{height: '100%',fontSize: 16}} />
                               
>>>>>>> 790d2abb226786a80043405d42e9d45478d1dfb4
                            </Form.Field>

                        </Form.Group>

<<<<<<< HEAD

                        <Form.Button  color='black' fluid style={{background: '#64cd82',marginTop: '50px'}}>Chia sẻ</Form.Button>

=======
                      
                        <Form.Button  color='black' fluid style={{background: '#64cd82',marginTop: '50px'}}>Chia sẻ</Form.Button>
        
>>>>>>> 790d2abb226786a80043405d42e9d45478d1dfb4
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

<<<<<<< HEAD
export default CreatePostModal 
=======
export default CreatePostModal
>>>>>>> 790d2abb226786a80043405d42e9d45478d1dfb4
