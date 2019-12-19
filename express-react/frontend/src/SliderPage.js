import React from 'react';
import {Dropdown, Image, Modal, Divider, Button, Container, Header, Grid, Table, Item } from 'semantic-ui-react';
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

const keys = [
  {
    key: 0,
    text: "C",
    value: 0,
  },
  {
    key: 1,
    text: "C#",
    value: 1,
  },
  {
    key: 2,
    text: "D",
    value: 2,
  },
  {
    key: 3,
    text: "D#",
    value: 3,
  },
  {
    key: 4,
    text: "E",
    value: 4,
  },
  {
    key: 5,
    text: "F",
    value: 5,
  },
  {
    key: 6,
    text: "F#",
    value: 6,
  },
  {
    key: 7,
    text: "G",
    value: 7,
  },
  {
    key: 8,
    text: "G#",
    value: 8,
  },
  {
    key: 9,
    text: "A",
    value: 9,
  },
  {
    key: 10,
    text: "A#",
    value: 10,
  },
  {
    key: 11,
    text: "B",
    value: 11,
  },
]

export class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {acousticness: 50, danceability: 50, energy: 50, instrumentalness: 50, liveness: 50, loudness: 50, speechiness: 50, valence: 50, tempo: 50, key: 0, songs: []};
  }

  async runSearch() {
    this.setState({songs: []});

    var url = 'http://localhost:3001/subsim';
    url = url + '?acousticness=' + String((this.state.acousticness / 100));
    url = url + '&danceability=' + String((this.state.danceability / 100));
    url = url + "&energy=" + String((this.state.energy / 100));
    url = url + "&instrumentalness=" + String((this.state.instrumentalness / 100));
    url = url + "&liveness=" + String((this.state.liveness / 100));
    url = url + "&loudness=" + String((1-(this.state.loudness / 100)) * -60);
    url = url + "&speechiness=" + String((this.state.speechiness / 100));
    url = url + "&valence=" + String((this.state.valence / 100));
    url = url + "&tempo=" + String((this.state.tempo/100) * 220);
    url = url + "&key=" + String(this.state.key);

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
                <Image src = "https://developer.spotify.com/assets/audio/acousticness.png"/>

                <Slider axis="x" x={this.state.acousticness} onChange={({ x }) => this.setState({acousticness: x})} />
                <Header as='h6'>{this.state.acousticness * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Acousticness</a></Header>}>
                    <Modal.Header>Acousticness </Modal.Header>
                    <Modal.Content>
                    A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
                  </Modal.Content>
                </Modal>
              </div>
              <Divider />
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/danceability.png"/>

                <Slider axis="x" x={this.state.danceability} onChange={({ x }) => this.setState({danceability: x})} />
                <Header as='h6'>{this.state.danceability * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Danceability</a></Header>}>
                    <Modal.Header>Danceability </Modal.Header>
                    <Modal.Content>
                    Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
                    </Modal.Content>
                  </Modal>

              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/energy.png"/>

                <Slider axis="x" x={this.state.energy} onChange={({ x }) => this.setState({energy: x})} />
                <Header as='h6'>{this.state.energy * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Energy</a></Header>}>
                    <Modal.Header>Energy </Modal.Header>
                    <Modal.Content>
                    Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.                    </Modal.Content>
                  </Modal>
              </div>
              <Divider />
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/instrumentalness.png"/>

                <Slider axis="x" x={this.state.instrumentalness} onChange={({ x }) => this.setState({instrumentalness: x})} />
                <Header as='h6'>{this.state.instrumentalness * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Instrumentalness</a></Header>}>
                    <Modal.Header>Instrumentalness </Modal.Header>
                    <Modal.Content>
	                   Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
                     </Modal.Content>
                      </Modal>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/liveness.png"/>

                <Slider axis="x" x={this.state.liveness} onChange={({ x }) => this.setState({liveness: x})} />
                <Header as='h6'>{this.state.liveness * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Liveness</a></Header>}>
                    <Modal.Header>Liveness </Modal.Header>
                    <Modal.Content>
	                   Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                     </Modal.Content>
                     </Modal>
              </div>
              <Divider />
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/loudness.png"/>

                <Slider axis="x" x={this.state.loudness} onChange={({ x }) => this.setState({loudness: x})} />
                <Header as='h6'>{((1-(this.state.loudness / 100)) * -60).toFixed(3)}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Loudness</a></Header>}>
                    <Modal.Header>Loudness </Modal.Header>
                    <Modal.Content>
	                   The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
                     </Modal.Content>
                         </Modal>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/speechiness.png"/>

                <Slider axis="x" x={this.state.speechiness} onChange={({ x }) => this.setState({speechiness: x})} />
                <Header as='h6'>{this.state.speechiness * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Speechiness</a></Header>}>
                    <Modal.Header>Loudness </Modal.Header>
                    <Modal.Content>
Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
</Modal.Content>
</Modal>
              </div>
              <Divider />
              <div>
              <Image src = "https://developer.spotify.com/assets/audio/valence.png"/>

                <Slider axis="x" x={this.state.valence} onChange={({ x }) => this.setState({valence: x})} />
                <Header as='h6'>{this.state.valence * .01}</Header>
                <Modal size = "small" trigger = {<Header as='h4'> <a>Valence</a></Header>}>
                    <Modal.Header>Valence </Modal.Header>
                    <Modal.Content>
	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
  </Modal.Content>
</Modal>
              </div>
            </Grid.Column>
            <Grid.Row columns = {2}>
            <Grid.Column>
            <Image src = "https://developer.spotify.com/assets/audio/tempo.png"/>

            <Header>Minimum Tempo</Header>
            <Slider axis="x" x={this.state.tempo} onChange={({ x }) => this.setState({tempo: x})} />
            <Header as='h6'>{(this.state.tempo/100) * 220 }</Header>

            </Grid.Column>
            <Grid.Column>
            <Header>Key</Header>

            <Dropdown placeholder = "Select Key"
            fluid
            selection
            options={keys}
            defaultValue={0}
            onChange = {(e, {value}) => this.setState({key: value})}
            />
            </Grid.Column>

            </Grid.Row>
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
                  user = {this.props.app.state.user}
                  songid = {item.id}
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
              }, this)}
          </Grid>
          }
        </Container>
        <Divider/>
      </Container>
    );
  }
}
