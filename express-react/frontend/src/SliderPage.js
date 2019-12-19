import React from 'react';
import {Divider, Button, Container, Header, Grid, Table, Item } from 'semantic-ui-react';
import Slider from 'react-input-slider';
import {MusicCard} from './MusicShowcase';

// export class SliderSetter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {val: 50, label: props.label};
//   }

//   render() {
//     return (
//         <div>
//         <Slider axis="x" x={this.state.val} onChange={({ x }) => this.setState({val: x})} />
//         <Header as='h6'>{this.state.val}</Header>
//         <Header as='h4'>{this.state.label}</Header>
//         </div>
//     );
//   }
// }

export class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {acousticness: 50, danceability: 50, energy: 50, instrumentalness: 50, liveness: 50, loudness: 50, speechiness: 50, valence: 50, songs: []};
  }

  async runSearch() {
    var url = 'http://localhost:3001/subsim';
    url = url + '?acousticness=' + String((this.state.acousticness / 100));
    url = url + '&danceability=' + String((this.state.danceability / 100));
    url = url + "&energy=" + String((this.state.energy / 100));
    url = url + "&instrumentalness=" + String((this.state.instrumentalness / 100));
    url = url + "&liveness=" + String((this.state.liveness / 100));
    url = url + "&loudness=" + String((this.state.loudness / 100));
    url = url + "&speechiness=" + String((this.state.speechiness / 100));
    url = url + "&valence=" + String((this.state.valence / 100));
    // console.log(url);
    // const response = await fetch(url, { mode: 'cors' });
    // console.log(response);

    // const jsonResponse = response.json();
    // console.log(jsonResponse);
    // console.log(jsonResponse.data);

    var newSongs = [];
    await fetch(url, { mode: 'cors'}).then(response => response.json()).then(json => {
      console.log(json.data);
      console.log(json.data.length);
      for (var i = 0; i < json.data.length; i++) {
        newSongs.push(json.data[i]);
      }
    });
    this.setState({songs: newSongs});
    console.log(this.state.songs);
  }

  render() {
    return (
      <Container>
        <Header as='h1'>Explore Page</Header>
        <Divider />
        <Container>
          <Grid columns={4} divided>

            <Grid.Column>
              <div>
                <Slider axis="x" x={this.state.acousticness} onChange={({ x }) => this.setState({acousticness: x})} />
                <Header as='h6'>{this.state.acousticness}</Header>
                <Header as='h4'>Acousticness</Header>
              </div>
              <Divider />
              <div>
                <Slider axis="x" x={this.state.danceability} onChange={({ x }) => this.setState({danceability: x})} />
                <Header as='h6'>{this.state.danceability}</Header>
                <Header as='h4'>Danceability</Header>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
                <Slider axis="x" x={this.state.energy} onChange={({ x }) => this.setState({energy: x})} />
                <Header as='h6'>{this.state.energy}</Header>
                <Header as='h4'>Energy</Header>
              </div>
              <Divider />
              <div>
                <Slider axis="x" x={this.state.instrumentalness} onChange={({ x }) => this.setState({instrumentalness: x})} />
                <Header as='h6'>{this.state.instrumentalness}</Header>
                <Header as='h4'>Instrumentalness</Header>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
                <Slider axis="x" x={this.state.liveness} onChange={({ x }) => this.setState({liveness: x})} />
                <Header as='h6'>{this.state.liveness}</Header>
                <Header as='h4'>Liveness</Header>
              </div>
              <Divider />
              <div>
                <Slider axis="x" x={this.state.loudness} onChange={({ x }) => this.setState({loudness: x})} />
                <Header as='h6'>{this.state.loudness}</Header>
                <Header as='h4'>Loudness</Header>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
                <Slider axis="x" x={this.state.speechiness} onChange={({ x }) => this.setState({speechiness: x})} />
                <Header as='h6'>{this.state.speechiness}</Header>
                <Header as='h4'>Speechiness</Header>
              </div>
              <Divider />
              <div>
                <Slider axis="x" x={this.state.valence} onChange={({ x }) => this.setState({valence: x})} />
                <Header as='h6'>{this.state.valence}</Header>
                <Header as='h4'>Valence</Header>
              </div>
            </Grid.Column>

          </Grid>
          <Divider />
          <Button onClick={() => {this.runSearch();}}>Run Search</Button>
          <Divider />
          {this.state.songs.length > 0 &&
          <Grid columns = {3}>
              {this.state.songs.map(function(item) {
                return (
                  <Grid.Column key={item.song}>
                  <MusicCard
                    name={item.song} 
                    artist={item.artist}
                    date={item.date}
                    duration_ms={item.duration_ms}
                    diffAc={"Difference in Acousticness: " + String(item.diffAc.toFixed(3))}
                    diffDa={"Difference in Danceability: " + String(item.diffDa.toFixed(3))}
                    diffEn={"Difference in Energy: " + String(item.diffEn.toFixed(3))}
                    diffIn={"Difference in Instrumentalness: " + String(item.diffIn.toFixed(3))}
                    diffLi={"Difference in Liveness: " + String(item.diffLi.toFixed(3))}
                    diffLo={"Difference in Loudness: " + String(item.diffLo.toFixed(3))}
                    diffSp={"Difference in Speechiness: " + String(item.diffSp.toFixed(3))}
                    diffVa={"Difference in Valence: " + String(item.diffVa.toFixed(3))}
                  />
                  </Grid.Column>
                );
              })}
          </Grid>
          }
        </Container>
        <Divider/>
      </Container>
    );
  }
}
