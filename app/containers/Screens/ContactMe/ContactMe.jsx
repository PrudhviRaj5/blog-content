import React, { Component } from 'react';
import TextField from 'components/Material/TextField';
import Button from 'components/Material/Button';

import './ContactMe.scss';

class ContactMe extends Component {
  state = {}

  render() {
    return (
      <div className="content-center-page contact-me-page">
        <h1 className="contact-me-heading">Contact Me</h1>
        <div className="contact-form">
          <TextField required withLeadingIcon="account_circle" label="Name" />
          <TextField required withLeadingIcon="email" label="Email" />
          <TextField withLeadingIcon="work" label="Company Name" />
          <TextField withLeadingIcon="phone" label="Phone Number" />
          <TextField className="message-box" textarea required label="Message" rows="8" />
          <div className="contact-me-submit"><Button rounded icon="touch_app">Submit</Button></div>
        </div>
      </div>
    );
  }
}

export default ContactMe;
