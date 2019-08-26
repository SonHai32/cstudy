import React from 'react'
import {Menu} from 'semantic-ui-react'

class SidePanelRight extends React.Component{

    render(){

        return(
            <Menu
                style={{width: '250px', background:'#e7e7e7', top: '80px'}}
                fixed='right'
                vertical
                inverted
            >

            </Menu>

        )
    }

}

export default SidePanelRight