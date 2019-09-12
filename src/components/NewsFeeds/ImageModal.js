import React from 'react'
import {Modal,Image, Label, Icon} from 'semantic-ui-react'


class ImageModal extends React.Component{
    render(){
        const {imageModal,closeModal,imageURL} = this.props;
        return(
            <Modal basic  onClose={closeModal} open={imageModal}>
                
                <Image  centered rounded size='big' src={imageURL} />
            </Modal>
        )
    }
}


export default ImageModal