import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Icon,Header,Segment, Form, Button,Message, Input, Select} from 'semantic-ui-react'
import firebase from '../../firebase'
import provider from './facebookAuth'


class Register extends React.Component{

    state={
        email: '',
        password:'',
        errors: [],
        isLoading: false, 
        user: {}


    }

    // componentDidMount(){
    //     firebase.auth().signOut().then(function() {
    //         // Sign-out successful.
    //       }).catch(function(error) {
    //         // An error happened.
    //       });
    // }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value})
        this.isFormValid();    
    }

    handleSubmit = event =>{
        event.preventDefault();
       if(this.isFormValid()){
        this.setState({isLoading: true})
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({isLoading: false})
        })
        
        .catch(err =>{
            console.log(err)
            this.setState({errors: this.state.errors.concat(err) ,isLoading: false})
        })
       }
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

    facebooklogin = event =>{
        event.preventDefault();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.setState({user: user})
            console.log(this.state.user)
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    render(){
        const {email, password, errors, isLoading,user} = this.state;
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
                            <p>or Sign up with</p>
                            <Button.Group widths='2'>
                                <Button color='facebook' size='large' onClick={this.facebooklogin}>
                                <Icon name='facebook' />
                                Facebook
                                </Button>

                                <Button color='black' size='large'>
                                    <Icon name='github' />
                                    Github
                                </Button>
                            </Button.Group>
                        </Segment> 
                    </Form>
                    
                </Grid.Column>
                
            </Grid>
        )
    }

}

export default Register