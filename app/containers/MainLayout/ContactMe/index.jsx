import React, { useState, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Snackbar } from '@rmwc/snackbar';
import TextField from 'components/Material/TextField';
import Button from 'components/Material/Button';

import './contact-me.scss';

const ContactMe = () => {
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('Test');

  let nameRef = createRef();
  let emailRef = createRef();
  let phoneRef = createRef();
  let companyRef = createRef();
  let messageRef = createRef();

  const handleSubmit = () => {
    const nameInput = nameRef.value;
    const emailInput = emailRef.value;
    const phoneInput = phoneRef.value;
    const companyInput = companyRef.value;
    const messageInput = messageRef.value;
    /* eslint no-useless-escape: 0 */
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!nameInput) {
      setSnackbarIsOpen(true);
      setSnackbarMsg('Name input field is required!');
      return;
    }
    if (!emailInput) {
      setSnackbarIsOpen(true);
      setSnackbarMsg('Email input field is required!');
      return;
    }
    if (!reEmail.test(String(emailInput).toLowerCase())) {
      setSnackbarIsOpen(true);
      setSnackbarMsg('Please input valid Email!');
      return;
    }
    if (!messageInput) {
      setSnackbarIsOpen(true);
      setSnackbarMsg('Message input field is required!');
      return;
    }
    console.log(JSON.stringify({
      nameInput,
      emailInput,
      phoneInput,
      companyInput,
      messageInput,
    }));
    // eslint-disable-next-line consistent-return
    return 0;
    // return mailMe(JSON.stringify({
    //   nameInput,
    //   emailInput,
    //   phoneInput,
    //   companyInput,
    //   messageInput,
    // }))
    //   .then(() => {
    //     nameRef.value = '';
    //     emailRef.value = '';
    //     phoneRef.value = '';
    //     companyRef.value = '';
    //     messageRef.value = '';
    //     setSnackbarIsOpen(true);
    //     setSnackbarMsg('Your Message has been sent!');
    //   });
  };

  return (
    <div className="content-center-page contact-me-page">
      <Snackbar
        open={snackbarIsOpen}
        onClose={() => setSnackbarIsOpen(false)}
        message={snackbarMsg}
        timeout={1500}
      />
      <h1 className="contact-me-heading">Contact Me</h1>
      <div className="contact-form">
        <TextField
          required
          icon="account_circle"
          label="Name"
          inputRef={(elm) => { nameRef = elm; }}
        />
        <TextField
          required
          icon="email"
          label="Email"
          inputRef={(elm) => { emailRef = elm; }}
        />
        <TextField
          icon="work"
          label="Company Name"
          inputRef={(elm) => { companyRef = elm; }}
        />
        <TextField
          icon="phone"
          label="Phone Number"
          inputRef={(elm) => { phoneRef = elm; }}
        />
        {/* <span className="message-label">Please input your Message below</span> */}
        <TextField
          className="message-box"
          textarea
          required
          label="Message"
          inputRef={(elm) => { messageRef = elm; }}
          fullwidth
          rows={4}
          maxLength={200}
          characterCount
          helpText={{
            validationMsg: true,
            children: 'This field is required',
          }}
        />
        {/* <div className="contact-me-submit">
          <Button
            rounded
            icon="touch_app"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div> */}
      </div>
      <div className="contact-me-submit">
        <Button
          rounded
          icon="touch_app"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default withRouter(ContactMe);
