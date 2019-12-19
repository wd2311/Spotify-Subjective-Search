import React from 'react';

import {Divider, Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
    this.state = { users: [], signedUp: null, loginFailed: null };
    this.res = null;
    this.userPassword = "";
}

  handleLogin() {
    this.props.app.setState({page: "explore"});

    if (this.password ==="" || this.userName === "") {
        // empty fields
    } else {
        this.loginUser(this.userName, this.password).then(()=>{
            if (this.res.status == 200) {
                // valid user/pass
                console.log("Logging in.");

                this.props.app.setState({page: "other"});
                this.setState({ signedUp: null });
                this.setState({ loginFailed: null });
            } else {
                // invalid user/pass
                console.log("Invalid username or password.");
                this.setState({ loginFailed: true });
                this.setState({ signedUp: null });
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
                            <Header>Email:</Header>
                            <Form.Input
                                required={true}
                                type='text'
                                name='username'
                                id="username"
                            />
                            <Header>Password:</Header>
                            <Form.Input
                                required={true}
                                type='password'
                                name='password'
                                id="password"
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
                                content="Invalid email or password."
                            />

                            <Button onClick ={()=>{this.handleLogin();}}>Login</Button>
                            <Button>Sign up</Button>
                        </Form>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
    );
  }
}
