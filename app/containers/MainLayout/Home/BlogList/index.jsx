import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { generateKey } from 'utils/utils';
import {
  makeSelectBlogListData,
  makeSelectIsBlogListFetching,
} from './selectors';
import { fetchBlogList } from './actions';

import './blog-list.scss';


const BlogList = (props) => {
  const { isFetching, fetchData, data } = props;

  useEffect(() => {
    if (isFetching) {
      fetchData();
    }
  }, []);

  return (
    <div className="content-center-page blog-list-page">
      <h1 className="blog-list-heading">All Posts</h1>
      <ul className="blog-list-grid">
        {
          !isFetching ? (
            data.map((x, i) => (
              <li
                key={generateKey('blogs-list', i)}
                className="blog-card"
                // elevationOut={0}
              >
                <Link
                  className="blog-card-heading"
                  to={`/home/blog_page${x.url.split('.')[0]}`} // removing .md from url; problem in the reload of url
                >
                  {x.name}
                </Link>
                <div className="blog-card-date">
                  {
                    (() => {
                      const d = new Date(x.date_published).toString().split(' ');
                      return `${d[1]} ${d[2]}, ${d[3]}`;
                    })()
                  }
                </div>
              </li>
            ))
          ) : null
        }
      </ul>
    </div>
  );
};

BlogList.propTypes = {
  data: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectBlogListData(),
  isFetching: makeSelectIsBlogListFetching(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchBlogList()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(BlogList);
