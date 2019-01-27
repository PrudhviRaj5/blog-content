import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'components/Material/Button';

import { fetchBlogsList } from 'actions/Home/BlogsList/BlogsList.ax';


class BlogsList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  goToBlogPage = () => {
    const { history } = this.props;
    history.push('/home/blog_page');
  }

  render() {
    const { data, fetching } = this.props;
    console.log('data', data);

    return (
      <div className="content-center-page">
        <div>
          {
            !fetching ? (
              JSON.stringify(data)
            ) : null
          }
        </div>
        BlogsList
        <Button
          rounded
          onClick={() => this.goToBlogPage()}
        >
          Blog
        </Button>
      </div>
    );
  }
}


BlogsList.propTypes = {
  history: PropTypes.any.isRequired,
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
