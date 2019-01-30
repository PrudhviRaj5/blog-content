import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchBlogsList } from 'actions/Home/BlogsList/BlogsList.ax';
// import VanillaPaper from 'components/Material/Paper/VanillaPaper';
import { generateKey } from 'utils/utils';

import './BlogList.scss';

class BlogsList extends Component {
  componentDidMount() {
    const { fetching, fetchData } = this.props;
    if (fetching) {
      fetchData();
    }
  }

  render() {
    const { data, fetching } = this.props;

    return (
      <div className="content-center-page blog-list-page">
        <h1 className="blog-list-heading">All Posts</h1>
        <ul className="blog-list-grid">
          {
            !fetching ? (
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
  }
}


BlogsList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogsList));
