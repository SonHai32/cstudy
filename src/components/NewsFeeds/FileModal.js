import React from 'react'
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class FileModal extends React.Component{
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png']
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

        if(file !== null){
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
                    <Button color='green' inverted onClick={this.sendFile}>
                        <Icon name='checkmark' />
                    </Button>
                    <Button color='red' inverted onClick={closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    
                </Modal.Actions>
            </Modal>
       );
    }
}

export default FileModal