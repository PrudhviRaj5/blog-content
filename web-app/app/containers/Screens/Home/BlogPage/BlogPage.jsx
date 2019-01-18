import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('python', python);


class BlogPage extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/wiki/PrudhviRaj5/blog-content/Home.md',
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }

  componentDidUpdate() {
    const preTagElms = document.querySelectorAll('pre');
    const { data } = this.state;
    if (data) {
      preTagElms.forEach((el) => {
        hljs.highlightBlock(el);
      });
      // hljs.initHighlighting(); // works only for initial render
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="content-center-page">
        <div id="md-container" className="markdown-container">
          {
            data ? (
              <ReactMarkdown
                source={data}
                escapeHtml={false}
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default withRouter(BlogPage);
