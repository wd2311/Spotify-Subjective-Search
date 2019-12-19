import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { MenuExampleBasic } from './Menu';
import {Explore} from './SliderPage';
import {MusicCard} from './MusicShowcase';
import {AccountPage} from './AccountPage';

import { Image, Button, Container } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: "login", user: null};
  }
  render() {
    if(this.state.page == "login") {
      return (
        <div>
        <Login app={this}/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

        </div>
      );
    } else if(this.state.page == "explore") {
      return (
      <div className="App">
      <MenuExampleBasic app ={this}/>
      <Explore app ={this}/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

      </div>
    );
  } else {
    return (
    <div className="App">
      <MenuExampleBasic app = {this}/>
      <AccountPage app = {this}/>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

    </div>
  );
  }
}
}


export default App;
