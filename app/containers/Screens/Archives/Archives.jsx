import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import { generateKey } from 'utils/utils';
import { fetchBlogsList } from 'actions/Home/BlogsList/BlogsList.ax';

import 'react-accessible-accordion/dist/fancy-example.css';
import './Archives.scss';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
class Archives extends Component {
  componentDidMount() {
    const { fetching, fetchData } = this.props;
    if (fetching) {
      fetchData();
    }
  }

  getMonthYear = datePublished => (
    `${monthNames[(new Date(datePublished)).getMonth()]} ${new Date(datePublished).getUTCFullYear()}`
  )

  getDate = datePublished => (
    `${new Date(datePublished).getDate()}`
  )

  getFilterData = (data) => {
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

  render() {
    const { data } = this.props;
    const filterData = this.getFilterData(data);

    return (
      <div className="content-center-page blog-page">
        <div className="markdown-container">
          <Accordion accordion={false}>
            {
              filterData.map((x, i) => (
                <AccordionItem
                  key={generateKey('acc-title', i)}
                >
                  <AccordionItemTitle
                    className="accordion_heading"
                  >
                    <h3 className="u-position-relative">
                      <div className="accordion__arrow" role="presentation" />
                      {`${x.datePublished} (${x.dateWiseData.length})`}
                    </h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    {
                      x.dateWiseData.map((y, j) => (
                        <div
                          key={generateKey('acc-body', (i * 100 + j))}
                        >
                          {`${y.date}: `}
                          <Link
                            className="accordionLink"
                            to={`/home/blog_page${y.url.split('.')[0]}`}
                            // rel="noopener noreferrer"
                            // href={`${y.url}`}
                          >
                            {y.name}
                          </Link>
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

Archives.propTypes = {
  data: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.Home_BlogsList.data,
    fetching: state.Home_BlogsList.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchBlogsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Archives));
