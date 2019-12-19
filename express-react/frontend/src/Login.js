import React from 'react';

import {Divider, Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
    this.state = { users: [], signedUp: null, loginFailed: null, username: "", password: "" };
    this.res = null;
    this.userPassword = "";
  }

  async handleLogin() {

    if (this.state.password==="" || this.state.username==="") {
        // empty fields
    } else {
        await fetch('http://localhost:3001/login?user=' + String(this.state.username) + '&pass=' + String(this.state.password)).then(response => response.json()).then(json => {
            if (json.data==="success") {
                console.log(json.data);
                this.props.app.setState({page: "explore", user: this.state.username});
            } else {
                console.log(json.data);
            }
        });
    }  
  }

  async handleSignup() {
    if (this.state.password==="" || this.state.username==="") {
        // empty fields
    } else {
        await fetch('http://localhost:3001/signup?user=' + String(this.state.username) + '&pass=' + String(this.state.password)).then(response => response.json()).then(json => {
            if (json.data==="success") {
                console.log(json.data);
                // this.props.app.setState({page: "explore", user: this.state.username});
            } else {
                console.log(json.data);
            }
        });
    }  
  }

  render() {
    return (
      <Container>
      <Divider/>
        <Grid centered colums = {5}>
         <Image src = "https://thumbs.gfycat.com/WhiteShadowyAsianelephant-size_restricted.gif" size = "medium"/>
            <Grid.Row centered columns = {2}>
                  <Header as='h1'>THE MUSIC APP</Header>
                  <Header as = 'h5'> A proprietary music discovery app, allowing users to create unique, exciting playlists </Header>
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
