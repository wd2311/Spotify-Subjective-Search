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
          <a>
            <Icon name='user' />
            {this.props.date}
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export class PlayListCard extends React.Component {
  render() {

    return (
      <Card>
        {/* <Image src='https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png' wrapped ui={false} /> */}
        <Card.Content>
        <Modal trigger = { <Card.Header><a>PlaylistName</a></Card.Header> }>
        <Modal.Content>
          <PlaylistShower/>
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
  render() {
    return(
      <div>
      <Grid columns = {4}>
        <Grid.Row>
        <Grid.Column>
          <MusicCard/>
        </Grid.Column>
        <Grid.Column>
          <MusicCard/>
        </Grid.Column>

        </Grid.Row>
      </Grid>
      </div>
      );
  }
}
