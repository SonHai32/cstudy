import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Icon,Header,Segment, Form, Button,Message,Portal} from 'semantic-ui-react'
import firebase from '../../firebase'
import facebookProvider from './facebookAuth'
import gitProvider from './gitAuth'


class Login extends React.Component{

    state={
        email: '',
        password:'',
        errors: [],
        isLoading: false, 
        userRef: firebase.database().ref('users'),
        openPotal: false


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
            
            this.setState({errors: this.state.errors.concat(err), openPotal: true})
            
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
      
            this.saveUserFacebook(result.user)
            
         
          })
          .catch(err =>{
              console.log(err);
            //   this.displayAuthError(err)
              this.setState({errors: this.state.errors.concat(err), openPotal:true})

                
          })
    }

    // displayAuthError = error =>(
    //     <TransitionablePortal  
    //                 open
    //                 className='display__err'
    //             >
    //                 <Segment>
    //                     <Header as='h3'> Open Portal</Header>
    //                 </Segment>
    
    //             </TransitionablePortal>
    // )
    

    displayAuthError = error =>{
        if(error.length > 0){
            return true;
        }else{
            return false;
        }
    }

    gitLogin = event =>{
        event.preventDefault();
        firebase.auth().signInWithPopup(gitProvider).then( (result) => {
            this.saveUserGit(result.user);
          }).catch(function(error) {
            console.log(error)
            var errorCode = error.code;
            
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

    saveUserGit = user =>{

        let userId = user.uid;
        let userExisted = ''
        this.state.userRef.orderByKey().equalTo(userId).on('child_added', snap  =>{
            userExisted = snap.key;
        });

        if(userId !== userExisted){
            //if user has existed => Save user to database

            this.state.userRef.child(userId).set({
                name: user.email.split(/[@]/)[0],
                avatar: user.photoURL,
                gender: 'Male',
                phoneNumber: user.phoneNumber,
            })
             
        }
        // else Dont save data

    }

    render(){
        const {email, password, errors, isLoading,openPotal} = this.state;
        const open = this.displayAuthError(errors);
        return(
            
            <Grid verticalAlign="middle" textAlign="center" className='register'>
                 <Portal  
                closeOnDocumentClick
                   open={openPotal}
                   transition='drop'
                   
                >
                    
                    <Segment fluid style={{position: 'absolute', left:'50%', top: '50%', transform:'translate(-50%, -50%)' ,width: '480px',height: '200px'}}>
                        <Header as='h3' color='red'>Login error</Header>
                        <Header as='h4' textAlign='center' color='black'>{errors.map(err => err.message)}</Header>
                        <Button style={{marginLeft: '5px'}} color='red' textAlign='center' onClick={this.facebookLogin}>
                            <Icon name='redo' />
                            Try Again
                        </Button>
                    </Segment>
    
                </Portal>
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