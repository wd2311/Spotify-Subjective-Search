import React, { Component } from 'react'
import {Card, Image,Icon, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message, Item } from 'semantic-ui-react';

export class MusicCard extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Card>
        {/* <Image src='https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png' wrapped ui={false} /> */}
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date'>by {this.props.artist}</span>
          </Card.Meta>
          <Card.Description>
            {((this.props.duration_ms / 1000) / 60).toFixed(0)}:{(((this.props.duration_ms / 1000) % 60).toFixed(0) > 9) ? ((this.props.duration_ms / 1000) % 60).toFixed(0) : ("0" + String(((this.props.duration_ms / 1000) % 60).toFixed(0)))} <br/> <br/>
            {this.props.diffAc} <br/>
            {this.props.diffDa} <br/>
            {this.props.diffEn} <br/>
            {this.props.diffIn} <br/>
            {this.props.diffLi} <br/>
            {this.props.diffLo} <br/>
            {this.props.diffSp} <br/>
            {this.props.diffVa}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Modal trigger = {<Button> Add to Playlist </Button>}>
        <Modal.Content>
        <PlaylistSelector user = {this.props.user} song = {this.props.songid}/>
        </Modal.Content>
        </Modal>
        </Card.Content>
      </Card>
    );
  }
}

export class PlaylistSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: []};
    this.test = this.test.bind(this);

  }
  async runPlaylists() {
    var url = 'http://localhost:3001/userplaylists';
    url = url + '?username=' + this.props.user;
    var playlists = []

    await fetch(url, { mode: 'cors'}).then(response => response.json()).then(json => {

      for (var i = 0; i < json.data.length; i++) {
        playlists.push(json.data[i]);

      }
      this.setState({playlists: playlists})
    });
  }
  componentDidMount() {
      this.runPlaylists();
  }

  async addSongToPlaylist(playlistID) {
    var url = 'http://localhost:3001/addplaylistsong';
    url = url + '?playlistid=' + playlistID;
    url = url + '&songid=' + this.props.song;

    await fetch(url, { method: 'post', mode: 'cors'}).then(response => response.json()).then(json => {
    });
  }

  test() {
    alert("hey");
  }

  render() { return(
  <Grid columns = {5}>
  {this.state.playlists.map(function(item) {
    return(
      <Grid.Column>
      <Button onClick = {() => this.addSongToPlaylist(item.PlaylistID)}> {item.PlaylistName}</Button>
      </Grid.Column>
    );
  }, this)}
  </Grid>
)
}

}
export class PlayListCard extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {

    return (
      <Card>
        <Card.Content>
        <Modal trigger = { <Card.Header><a>{this.props.playlistname}</a></Card.Header> }>
        <Modal.Content>
          <PlaylistShower playlistid = {this.props.playlistid}/>
        </Modal.Content>
        </Modal>
          <Card.Meta>
            <span className='date'>Artist</span>
          </Card.Meta>
          <Card.Description>
          Description
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

}

export class PlaylistShower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playlistsongs: []}

  }

  componentDidMount() {
      this.getSongs();
  }

  async getSongs() {
    this.setState({playlistsongs: []})

    var url = 'http://localhost:3001/playlistsongs';
    url = url + '?playlistid=' + this.props.playlistid;
    var playlistsongs = []

    await fetch(url, { mode: 'cors'}).then(response => response.json()).then(json => {
      for (var i = 0; i < json.data.length; i++) {
        playlistsongs.push(json.data[i]);
      }
      this.setState({playlistsongs: playlistsongs})
    });
  }

  render() {
    return(
      <div>
      <Grid columns = {4}>
      {this.state.playlistsongs.map(function(item) {
        return(
          <Grid.Column>
          <MusicCard name = {item.song}/>
          </Grid.Column>
        );
      })}
      </Grid>

      </div>
      );
  }
}
