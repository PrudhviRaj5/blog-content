import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from 'components/Material/Button';

class BlogsList extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/PrudhviRaj5/my-awesome-blog/master/blog-content/all_blog_urls.json',
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }

  goToBlogPage = () => {
    const { history } = this.props;
    history.push('/home/blog_page');
  }

  render() {
    const { data } = this.state;

    return (
      <div className="content-center-page">
        <div>
          {
            data ? (
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
};

export default withRouter(BlogsList);
