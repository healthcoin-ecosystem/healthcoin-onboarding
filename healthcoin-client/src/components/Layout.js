import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Nav/>
        <main style={{ marginLeft: 268, marginTop: 16, marginRight: 16, marginBottom: 16 }}>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}
