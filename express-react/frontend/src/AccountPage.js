import React from 'react';

import {Icon, Divider, Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';

import {MusicCard, PlayListCard, PlaylistShower} from './MusicShowcase';

export class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

    <div>

    <Header as='h1'> Account</Header>
    <Icon name = 'user'/>

    <Header as='h2'> {this.props.app.state.user}</Header>

    <Header as='h3'> Playlists </Header>

    <Divider/>
    <Container>
    <PlaylistDisplay app ={this} user = {this.props.app.state.user}/>
    </Container>
    </div>
  );
  }
}

export class PlaylistDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [], modalopen:false};
  }
  componentDidMount() {
      this.runPlaylists();
  }

  async runPlaylists() {
    var url = 'http://localhost:3001/userplaylists';
    url = url + '?username=' + this.props.user;
    var playlists = []

    await fetch(url, { mode: 'cors'}).then(response => response.json()).then(json => {

      for (var i = 0; i < json.data.length; i++) {
        playlists.push(json.data[i]);

      }
      this.setState({playlists: playlists});
    });
  }

  async deletePlaylist(playlistid) {
    var url = 'http://localhost:3001/userplaylistsdelete';
    url = url + '?playlistid=' + playlistid;
    await fetch(url, { method: 'post', mode: 'cors'}).then(response => response.json()).then(json => {

    });
    this.runPlaylists();
  }

  closemodal() {
    this.setState({modalopen: false});
    this.runPlaylists();
  }

  render() { return(
    <Container>
    <Modal open = {this.state.modalopen} onClose = {()=> this.runPlaylists()}trigger = {<Button onClick = {()=>this.setState({modalopen: true})}> New Playlist</Button>}>
      <Modal.Content>
        <AddPlaylist user = {this.props.user} closemodal = {() => this.closemodal()} />
      </Modal.Content>
    </Modal>

  <Grid columns = {5}>
  {this.state.playlists.map(function(item) {
    return(
      <Grid.Column>
      <PlayListCard playlistid = {item.PlaylistID} playlistname = {item.PlaylistName} description = {item.Description}/>
      <Button onClick = {() => this.deletePlaylist(item.PlaylistID)}> Delete Playlist</Button>
      </Grid.Column>
    );
  }, this)}
  </Grid>
  </Container>
)
}

}

class AddPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: "", description: ""}
  }

  async addThePlaylist() {
    var url = 'http://localhost:3001/userplaylistsnew';
    url = url + '?username=' + this.props.user ;
    url = url + '&playlistname=' + this.state.name;
    url = url + '&description=' + this.state.description;

    await fetch(url, {method: 'post', mode: 'cors'}).then(response => response.json()).then(json => {
      console.log(json);
    });
    this.props.closemodal();
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
