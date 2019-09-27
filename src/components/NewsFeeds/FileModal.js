import React from 'react'
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class FileModal extends React.Component{
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png', 'image/webp']
    }

    addFile = event =>{
        const file = event.target.files[0];
        if(file){
            this.setState({file})
        }
    }

    sendFile = () =>{
        const {file} = this.state;
        const {uploadFile, closeModal} = this.props

        if(file){
            if(this.isAuthorized(file.type)){
                //send File
                const metadata = {contentType: file.type}
                uploadFile(file, metadata);
                closeModal();
                this.clearFile();
            }
        }

    }

    clearFile = () => {
        this.setState({file: null})
    }

    isAuthorized = fileType => this.state.authorized.includes(fileType);

    render(){

        const {fileModal, closeModal} = this.props;

       return(
            <Modal basic open={fileModal} onClose={closeModal}>
                <Modal.Header>
                    Select an image file
                </Modal.Header>
                <Modal.Content>
                    <Input 
                        fluid
                        label='File types: jpg, png'
                        name='file'
                        type='file'
                        onChange={this.addFile}
                    />
                </Modal.Content>
                <Modal.Actions>
       
                    <Button.Group>
                        <Button negative inverted onClick={closeModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button.Or />
                        <Button onClick={this.sendFile} inverted positive>
                            <Icon name='checkmark' />Upload
                        </Button>
                    </Button.Group>
                    
                </Modal.Actions>
            </Modal>
       );
    }
}

export default FileModal