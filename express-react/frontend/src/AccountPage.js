import React from 'react';

import {Divider, Card, Image, Input, Form, Button, Segment, Container, Header, Grid, Menu, Modal, Message } from 'semantic-ui-react';

import {MusicCard} from './MusicShowcase';

export class AccountPage extends React.Component {
  render() {
    return(
    <div>
    <Header as='h1'> ACCOUNT</Header>
    <Header as='h2'> USERNAME</Header>
    <Header as='h3'> Playlists </Header>
    <Divider/>
    <Grid columns = {5}>
    <Grid.Row>

    <Grid.Column>
    <MusicCard/>
    </Grid.Column>
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
