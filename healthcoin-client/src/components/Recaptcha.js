import React, { Component } from 'react';

export default class Recaptcha extends Component {
  script = document.createElement('script');

  componentDidMount() {
    this.script.src = '//www.google.com/recaptcha/api.js';
    this.script.async = true;
    document.body.appendChild(this.script);
  }

  componentWillUnmount() {
    document.body.removeChild(this.script);
  }

  render() {
    return (
      <div className="g-recaptcha" data-sitekey="6LefJhoUAAAAAAtiMe3bqtyaSOrHXiIt_vXfMRSc"></div>
    );
  }
}
