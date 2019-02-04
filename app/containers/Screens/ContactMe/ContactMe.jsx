import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Snackbar } from '@rmwc/snackbar';
import TextField from 'components/Material/TextField';
import Button from 'components/Material/Button';

import { mailMe } from 'actions/ContactMe/ContactMe.ax';

import './ContactMe.scss';

class ContactMe extends Component {
  state = {
    snackbarIsOpen: false,
    snackbarMsg: 'Test',
    // name: '',
  }

  // just for reference
  contactRefs = {
    nameRef: React.createRef(),
    emailRef: React.createRef(),
    phoneRef: React.createRef(),
    companyRef: React.createRef(),
    messageRef: React.createRef(),
  }

  setTextInputRef = (element, name) => {
    this.contactRefs[name] = element;
  };

  handleSubmit = () => {
    const nameInput = this.contactRefs.nameRef.value;
    const emailInput = this.contactRefs.emailRef.value;
    const phoneInput = this.contactRefs.phoneRef.value;
    const companyInput = this.contactRefs.companyRef.value;
    const messageInput = this.contactRefs.messageRef.value;
    /* eslint no-useless-escape: 0 */
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!nameInput) {
      return this.setState({ snackbarIsOpen: true, snackbarMsg: 'Name input field is required!' });
    }
    if (!emailInput) {
      return this.setState({ snackbarIsOpen: true, snackbarMsg: 'Email input field is required!' });
    }
    if (!reEmail.test(String(emailInput).toLowerCase())) {
      return this.setState({ snackbarIsOpen: true, snackbarMsg: 'Please input valid Email!' });
    }
    if (!messageInput) {
      return this.setState({ snackbarIsOpen: true, snackbarMsg: 'Message input field is required!' });
    }
    return mailMe(JSON.stringify({
      nameInput,
      emailInput,
      phoneInput,
      companyInput,
      messageInput,
    }))
      .then(() => {
        this.contactRefs.nameRef.value = '';
        this.contactRefs.emailRef.value = '';
        this.contactRefs.phoneRef.value = '';
        this.contactRefs.companyRef.value = '';
        this.contactRefs.messageRef.value = '';
      });
  }

  render() {
    const { snackbarIsOpen, snackbarMsg } = this.state;

    return (
      <div className="content-center-page contact-me-page">
        <Snackbar
          open={snackbarIsOpen}
          onClose={() => this.setState({ snackbarIsOpen: false })}
          message={snackbarMsg}
          timeout={3000}
          // dismissesOnAction
        />
        <h1 className="contact-me-heading">Contact Me</h1>
        <div className="contact-form">
          <TextField
            required
            withLeadingIcon="account_circle"
            label="Name"
            inputRef={elm => this.setTextInputRef(elm, 'nameRef')}
          />
          <TextField
            required
            withLeadingIcon="email"
            label="Email"
            inputRef={elm => this.setTextInputRef(elm, 'emailRef')}
          />
          <TextField
            withLeadingIcon="work"
            label="Company Name"
            inputRef={elm => this.setTextInputRef(elm, 'phoneRef')}
          />
          <TextField
            withLeadingIcon="phone"
            label="Phone Number"
            inputRef={elm => this.setTextInputRef(elm, 'companyRef')}
          />
          <TextField
            className="message-box"
            textarea
            required
            label="Message"
            rows="8"
            inputRef={elm => this.setTextInputRef(elm, 'messageRef')}
          />
          <div className="contact-me-submit">
            <Button
              rounded
              icon="touch_app"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ContactMe);
