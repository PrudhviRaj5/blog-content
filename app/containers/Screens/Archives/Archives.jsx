import React, { Component } from 'react';
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

import 'react-accessible-accordion/dist/fancy-example.css';
import './Archives.scss';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
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

  getUserData = (dispatch) => {
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

  getMonthYear = datePublished => (
    `${monthNames[(new Date(datePublished)).getMonth()]} ${new Date(datePublished).getUTCFullYear()}`
  )

  getDate = datePublished => (
    `${new Date(datePublished).getDate()}`
  )

  getFilterData = (data) => {
    data.sort((a, b) => new Date(b.date_published) - new Date(a.date_published));
    const filterMap = {};
    const sortHelper = [];
    const filterData = [];
    data.forEach((x) => {
      const monthYear = this.getMonthYear(x.date_published);
      const newData = {
        name: x.name,
        date: this.getDate(x.date_published),
        url: x.url,
      };
      if (monthYear in filterMap) {
        filterMap[monthYear].push(newData);
      } else {
        filterMap[monthYear] = [newData];
        sortHelper.push(monthYear);
      }
    });
    sortHelper.forEach((z) => {
      filterData.push({
        datePublished: z,
        dateWiseData: filterMap[z],
      });
    });
    return filterData;
  }

  generateKey = (str, i) => `${str}-${i}`

  render() {
    const { userData } = this.state;
    const filterData = this.getFilterData(userData);

    return (
      <div className="content-center-page blog-page">
        <div className="markdown-container">
          <Accordion accordion={false}>
            {
              filterData.map((x, i) => (
                <AccordionItem
                  key={this.generateKey('acc-title', i)}
                >
                  <AccordionItemTitle>
                    <h3 className="u-position-relative">
                      <div className="accordion__arrow" role="presentation" />
                      {`${x.datePublished} (${x.dateWiseData.length})`}
                    </h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    {
                      x.dateWiseData.map((y, j) => (
                        <div
                          key={this.generateKey('acc-body', (i * 100 + j))}
                        >
                          {`${y.date}: `}
                          <a
                            className="accordionLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${y.url}`}
                          >
                            {y.name}
                          </a>
                        </div>
                      ))
                    }
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
