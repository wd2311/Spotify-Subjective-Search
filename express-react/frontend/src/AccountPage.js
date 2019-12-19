import React from 'react';

import {Icon, Divider, Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';

import {MusicCard, PlayListCard, PlaylistShower} from './MusicShowcase';

export class AccountPage extends React.Component {
  render() {
    return(

    <div>
    <Icon name = 'user'/>

    <Header as='h1'> Account</Header>
    <Header as='h2'> USERNAME</Header>
    <Modal trigger = {<Button> New Playlist</Button>}>
      <Modal.Content>
        <AddPlaylist/>
      </Modal.Content>
    </Modal>

    <Header as='h3'> Playlists </Header>

    <Divider/>
    <Container>
    <Grid columns = {5}>
    <Grid.Row>
    <Grid.Column>
    <PlayListCard/>
    </Grid.Column>
    <Grid.Column>
    <PlayListCard/>
    </Grid.Column>
    <Grid.Column>
    <PlayListCard/>
    </Grid.Column>

    </Grid.Row>
    </Grid>
    </Container>
    </div>
  );
  }
}

class AddPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: "", description: ""}
  }

  async addThePlaylist() {
    console.log(this.state);
  }

  render() {
    return (
      <Container>
      <Grid centered columns = {2}>

      <Image src='https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png'  size = 'medium' />
      </Grid>

      <Form>
        <Header> Name of the Playlist </Header>
        {/* <Form.Input value={this.state.name} onChange={this.handleInputChange}/> */}
        <input
          required={true}
          id='nameField'
          onChange={()=>{this.setState({name: document.getElementById('nameField').value})}}
        />

        <Header> Description of Playlist </Header>
        {/* <Form.Input/> */}
        <input
          required={true}
          id='descriptionField'
          onChange={()=>{this.setState({description: document.getElementById('descriptionField').value})}}
        />
      
      <Divider/>
      <Divider clearing />
      
      <Grid centered columns = {2}>
        <Button onClick={() => {this.addThePlaylist();}}> Submit </Button>
      </Grid>

      </Form>
      </Container>
    );
  }
}
