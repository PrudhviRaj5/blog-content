import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import './Home.scss';


class Home extends Component {
  state = {
    // data: null,
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/wiki/PrudhviRaj5/blog-content/Home.md',
    })
      .then((response) => {
        console.log('data', response.data);
        render(
          <ReactMarkdown source={response.data} />,
          document.getElementById('md-container'),
        );
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }

  render() {
    return (
      <div className="home-page">
        <div id="md-container" className="markdown-container">
          Home
        </div>
      </div>
    );
  }
}

export default Home;
