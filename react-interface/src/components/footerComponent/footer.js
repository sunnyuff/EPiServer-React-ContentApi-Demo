import React, { Component } from 'react';


class Footer extends Component {
  constructor(props) {
		super(props)
		this.state = {}
  }
  render() {
    return (
      <footer>
        Copyright © {(new Date().getFullYear())} EPiServer-React-Demo
      </footer>
    );
  }
}

export default Footer;
