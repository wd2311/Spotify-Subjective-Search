import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.props.app.setState({ page: name })
  handleSignOut = () => this.props.app.setState({page: "login", user: null})

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>

        <Menu.Item
          name='explore'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Explore
        </Menu.Item>

        <Menu.Item
          name='account'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Account
        </Menu.Item>

        <Menu.Item position = 'right' onClick= {this.handleSignOut} style={{paddingLeft: '15px'}}>Sign Out</Menu.Item>

      </Menu>
    )
  }
}
