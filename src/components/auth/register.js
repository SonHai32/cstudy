import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Header,Segment, Form, Button,Message} from 'semantic-ui-react'
import firebase from '../../firebase'
import md5 from 'md5'


class Register extends React.Component{

    state={
        email: '',
        password:'',
        errors: [],
        isLoading: false, 
        userRef: firebase.database().ref('users'),

        


    }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value})
        this.isFormValid();    
    }

    handleSubmit = event =>{
        event.preventDefault();
       if(this.isFormValid()){
        this.setState({isLoading: true})
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createUser) => {
            
            createUser.user.updateProfile({
                displayName: this.state.email.split(/[@]/)[0],
                photoURL: 'https://www.gravatar.com/avatar/'+md5(this.state.email)+'?d=identicon'
            }).then(() =>{
                this.saveUser(createUser).then(()=>{
                    console.log('usersaved')
                })
            })

            this.setState({isLoading: false})
        })
        
        .catch(err =>{
            console.log(err)
            this.setState({errors: this.state.errors.concat(err) ,isLoading: false})
        })
       }
    }

    saveUser = createdUser =>{
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            gender: 'Male',
            phoneNumber: '',

        })
    }

    isPasswordValid = ({password}) =>{
        if(password.length < 5 ){
            return false;
        }else{
            return true;
        }
    }


    isFormEmpty = ({email,password}) =>{
        return !email.length || !password.length
    }


    isFormValid = () =>{
        let error;
        let errors= [];

        if(this.isFormEmpty(this.state)){
            return false;
        }else if(!this.isPasswordValid(this.state)){
            error = {message: 'Password should be at least 6 characters'};
            this.setState({errors: errors.concat(error)});
            return false;
        }else{
            this.setState({errors: []});
            return true;
        }
    }
    
    displayError = (errors, inputName) => {
        let haveErrorMessage;
        errors.some(error => error.message.toLowerCase().includes(inputName) ? haveErrorMessage={content: error.message, pointing: 'below'} : haveErrorMessage=false)
        return haveErrorMessage;
    }
    render(){
        const {email, password, errors, isLoading} = this.state;
        return(
        
            <Grid verticalAlign="middle" textAlign="center" className='register'>
                <Grid.Column style={{maxWidth: 480}}>
                    <Header color='teal' textAlign='center' as='h1' style={{padding: '2em'}}>
                        Register for CStudy
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit} >
                        <Segment stacked>
                            <Form.Input
                                name='email'
                                placeholder='Emal Address'
                                fluid
                                required
                                error={this.displayError(errors, 'email')}
                                size='large'
                                type='text'
                                icon='mail'
                                iconPosition='left'
                                onChange={this.handleChange}
                                value={email}
                            />
                            <Form.Input 
                                name='password'
                                placeholder='Password'
                                fluid
                                required
                                error={this.displayError(errors, 'password')}
                                size='large'
                                type='password'
                                icon='key'
                                iconPosition='left'
                                onChange={this.handleChange}
                                value={password}
                            />
                            <Button 
                            size='large' 
                            fluid 
                            color='teal'
                            loading={isLoading}
                            >
                                Submit
                            </Button>
                            <Message>
                                You have an account ? <Link to='/Login'>Login</Link>
                            </Message>
                        </Segment> 
                    </Form>
                    
                </Grid.Column>
                
            </Grid>
        )
    }

}

export default Register