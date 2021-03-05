import React, { Component } from "react";
import { connect } from "react-redux";

import { OverviewView } from "./OverviewView";
import { logout } from "../../actions/auth";

export class Overview extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ contacts: data });
      })
      .catch(console.log);
  }

  render() {
    return <OverviewView onLogout={() => this.props.logout()} />;
  }
}

export default connect(null, { logout })(Overview);
