import React, { Component } from 'react'
import {Card, Image,Icon, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';

export class MusicCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date'>Artist</span>
          </Card.Meta>
          <Card.Description>
          Some other information
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            Song Date
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
        <Image src='https://upload.wikimedia.org/wikipedia/commons/c/ca/CD-ROM.png' wrapped ui={false} />
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
