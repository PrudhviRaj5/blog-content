import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'components/Material/Button';

class BlogsList extends Component {
  state = {
    // data: null,
  }

  goToBlogPage = () => {
    const { history } = this.props;
    history.push('/home/blog_page');
  }

  render() {
    return (
      <div className="content-center-page">
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
};

export default withRouter(BlogsList);
