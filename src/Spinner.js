import React from 'react'
import {Loader, Dimmer} from 'semantic-ui-react'

class Spinner extends React.Component{
    render(){
        return(
            <Dimmer>
                <Loader size='large' content='Preparing to CChat' />
            </Dimmer>
        );

    }
}