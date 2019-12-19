import React from 'react';

import {Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
    this.state = { users: [], signedUp: null, loginFailed: null, username: "", password: "" };
    this.res = null;
    this.userPassword = "";
  }

  handleLogin() {
    // this.props.app.setState({page: "other"});

    if (this.state.password==="" || this.state.username==="") {
        // empty fields
    } else {
        // this.loginUser(this.state.username, this.state.password).then(()=>{
        //     if (this.res.status == 200) {
        //         // valid user/pass
        //         console.log("Logging in.");

        //         this.props.app.setState({page: "other"});
        //         this.setState({ signedUp: null });
        //         this.setState({ loginFailed: null });
        //     } else {
        //         // invalid user/pass
        //         console.log("Invalid username or password.");
        //         this.setState({ loginFailed: true });
        //         this.setState({ signedUp: null });
        //     }
        // });
    }  
  }

  handleSignup() {
    if (this.state.password==="" || this.state.username==="") {
      
    } else {

    }
  }

  render() {
    return (
      <Container>
        <Grid centered colums = {5}>
            <Grid.Row centered columns = {2}>
                  <Header as='h1'>THE MUSIC APP</Header>
                <Grid.Column>
                    <Container textAlign = 'left'>
                        <Form>
                            <Header>Username:</Header>
                            <input
                                required={true}
                                id='usernameField'
                                onChange={()=>{this.setState({username: document.getElementById('usernameField').value})}}
                            />
                            <Header>Password:</Header>
                            <input
                                required={true}
                                id='passField'
                                onChange={()=>{this.setState({password: document.getElementById('passField').value})}}
                            />

                            <hr/>
                            <Message
                                success
                                header='Sign Up Complete.'
                                content="You're all signed up."
                            />
                            <Message
                                warning
                                header='Sign Up Failed.'
                            />
                            <Message
                                error
                                header='Sign In Failed.'
                                content="Invalid username or password."
                            />

                            <Button onClick={()=>{this.handleLogin();}}>Login</Button>
                            <Button onClick={()=>{this.handleSignup();}}>Sign up</Button>
                        </Form>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
    );
  }
}
