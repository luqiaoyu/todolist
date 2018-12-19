import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { $storage } from '../../utils';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    $storage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <a onClick={this.onLogout}>logout</a>
    );
  }
}

export default withRouter(Logout);
