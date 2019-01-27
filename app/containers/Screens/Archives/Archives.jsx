import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import axios from 'axios';
import {
  fetchError,
} from 'actions/common.ax';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import './Archives.scss';
import '../Home/BlogPage/BlogPage.scss';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DateFormatter = (props) => {
  const { datePublished } = props;
  const date = `${monthNames[(new Date(datePublished)).getMonth()]} ${new Date(datePublished).getUTCFullYear()}`;
  return (
    <React.Fragment>
      {date}
    </React.Fragment>
  );
};

const DatePublished = (props) => {
  const { datePublished } = props;
  const date = `${new Date(datePublished).getDate()} : `;
  return (
    <React.Fragment>
      {date}
    </React.Fragment>
  );
};

DateFormatter.propTypes = {
  datePublished: PropTypes.string.isRequired,
};
DatePublished.propTypes = {
  datePublished: PropTypes.string.isRequired,
};

class Archives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData(dispatch) {
    axios({
      method: 'GET',
      url: 'http://localhost:5500/blog-content/all_blog_urls.json',
    })
      .then((response) => {
        this.setState({ userData: response.data });
      })
      .catch((e) => {
        dispatch(fetchError(e));
      });
  }

  render() {
    const { userData } = this.state;

    return (
      <div className="content-center-page blog-page">
        <div className="markdown-container">
          <Accordion accordion={false}>
            {
              userData.map(x => (
                <AccordionItem
                  key={x.name}
                >
                  <AccordionItemTitle>
                    <h3 className="u-position-relative">
                      <DateFormatter datePublished={x.date_published} />
                    </h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <DatePublished datePublished={x.date_published} />
                    <a
                      className="accordionLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${x.url}`}
                    >
                      {x.content}
                    </a>
                  </AccordionItemBody>
                </AccordionItem>
              ))
            }
          </Accordion>
        </div>
      </div>
    );
  }
}

export default Archives;
