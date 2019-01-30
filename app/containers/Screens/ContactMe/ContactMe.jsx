import React, { Component } from 'react';
import { TextField } from '@rmwc/textfield';

import '@rmwc/textfield/node_modules/@material/textfield/dist/mdc.textfield.css';
import '@rmwc/textfield/node_modules/@material/floating-label/dist/mdc.floating-label.css';
import '@rmwc/textfield/node_modules/@material/notched-outline/dist/mdc.notched-outline.css';
import '@rmwc/textfield/node_modules/@material/line-ripple/dist/mdc.line-ripple.css';

class ContactMe extends Component {
  state = {}

  render() {
    return (
      <div style={{ padding: '20px' }} className="content-center-page">
        <TextField outlined withLeadingIcon="search" label="Name" />
        <TextField outlined withLeadingIcon="search" label="Email" />
        <TextField outlined withLeadingIcon="search" label="Company Name" />
        <TextField outlined withLeadingIcon="search" label="Message" />
        Contact Me
      </div>
    );
  }
}

export default ContactMe;
