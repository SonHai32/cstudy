import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Icon,Header,Segment, Form, Button,Message} from 'semantic-ui-react'
import firebase from '../../firebase'
import facebookProvider from './facebookAuth'
import gitProvider from './gitAuth'


class Login extends React.Component{

    state={
        email: '',
        password:'',
        errors: [],
        isLoading: false, 
        userRef: firebase.database().ref('users')


    }



    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value})
        this.setState({errors: []})  
    }

    handleSubmit = event =>{
        event.preventDefault();
       if(!this.isFormValid(this.state)){
        this.setState({isLoading: true})
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({isLoading: false})
            this.setState({errors: []})
            console.log('sig in')
        
        })
        
        .catch(err =>{
            this.setState({errors: this.state.errors.concat(err) ,isLoading: false})
        })
       }
    }


    isFormValid = ({email,password}) =>{
        return !email.length || !password.length
    }

    
    displayError = (errors, inputName) => {
        let haveErrorMessage;
        errors.some(error => error.message.toLowerCase().includes(inputName) ? haveErrorMessage={content: error.message, pointing: 'below'} : haveErrorMessage=false)
        return haveErrorMessage;
    }

    facebookLogin = event =>{
        event.preventDefault();
        firebase.auth().signInWithPopup(facebookProvider).then( (result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;
      
            this.saveUserFacebook(result.user)
            
         
          })
          .catch(function(error) {
            // Handle Errors here.
            console.log(error)
   
          });
    }

    gitLogin = event =>{
        event.preventDefault();
        firebase.auth().signInWithPopup(gitProvider).then(function(result) {
            // This gives you a GitHub Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have signed up with a different provider for that email.');
              // Handle linking here if your app allows it.
            } else {
              console.error(error);
            }
          });
    }

    saveUserFacebook = user =>{

        let userId = user.uid;
        let userExisted = ''
        this.state.userRef.orderByKey().equalTo(userId).on('child_added', snap  =>{
            userExisted = snap.key;
        });

        if(userId !== userExisted){
            //if user has existed => Save user to database

            this.state.userRef.child(userId).set({
                name: user.displayName,
                avatar: user.photoURL,
                gender: 'Male',
                phoneNumber: user.phoneNumber,
            })
             
        }
        // else Dont save data

    }

    render(){
        const {email, password, errors, isLoading} = this.state;
        return(
            
            <Grid verticalAlign="middle" textAlign="center" className='register'>
                <Grid.Column style={{maxWidth: 480}}>
                    <Header color='teal' textAlign='center' as='h1' style={{padding: '2em'}}>
                        Sign in to CStudy
                     
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
                                You don't have an account ? <Link to='/register'>Register</Link>
                            </Message>
                            <p>or Sign in with</p>
                            <Button.Group widths='2'>
                                <Button color='facebook' size='large' onClick={this.facebookLogin}>
                                <Icon name='facebook' />
                                Facebook
                                </Button>

                                <Button color='black' size='large' onClick={this.gitLogin}>
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

export default Login;