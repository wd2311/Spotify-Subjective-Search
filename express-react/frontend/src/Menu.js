import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.props.app.setState({ page: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
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

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
    )
  }
}
