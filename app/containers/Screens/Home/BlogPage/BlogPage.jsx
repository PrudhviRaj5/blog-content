import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
} from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import {
  Drawer,
} from '@rmwc/drawer';
import Button from 'components/Material/Button/CustomButton';

import { fetchBlogPost } from 'actions/Home/BlogPage/BlogPage.ax';

import './BlogPage.scss';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import 'highlight.js/styles/atom-one-dark.css';

// const htmlParser = require('react-markdown/plugins/html-parser');

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('python', python);

// class hTag extends Component {
//   render() {

//   }
// }

class BlogPage extends Component {
  static generateRefs = (len) => {
    return Array(len).fill().map(() => React.createRef());
  }

  state = {
    outlineDrawer: true,
  }

  outlineListId = 'blog-outline'

  allRefsArr = BlogPage.generateRefs(10)

  counter = 0

  headingEls = [];

  outlineCounter = 0

  // only for plain html content in md files
  parseHtml = htmlParser({
    isValidNode: () => {
      // console.log(node);
      return true;
    },
    // processingInstructions: [/* ... */],
  })

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  componentDidUpdate() {
    const preTagElms = document.querySelectorAll('pre');
    const { fetching } = this.props;
    if (!fetching) {
      preTagElms.forEach((el) => {
        hljs.highlightBlock(el);
      });
      // don't delete
      // hljs.initHighlighting(); // works only for initial render
    }
  }

  hTag = (level, children, props) => {
    switch (level) {
      case 1:
        return <h1 {...props}>{children}</h1>;
      case 2:
        return <h2 {...props}>{children}</h2>;
      case 3:
        return <h3 {...props}>{children}</h3>;
      case 4:
        return <h4 {...props}>{children}</h4>;
      case 5:
        return <h5 {...props}>{children}</h5>;
      case 6:
        return <h6 {...props}>{children}</h6>;
      default:
        return <p {...props}>{children}</p>;
    }
  }

  generateKey = (str, i) => `${str}-${i}`

  renderOutline = () => {
    const self = this;
    const Comp = () => (
      self.headingEls.map((el, i) => (
        <ListItem
          key={self.generateKey('otline-key', i)}
          className={`outline-list-item item-level-${self.headingEls[i].level}`}
          onClick={() => {
            window.scrollTo(
              0,
              self.allRefsArr[i].current.offsetTop,
            );
          }}
        >
          {self.headingEls[i].text}
        </ListItem>
      ))
    );
    const Comp1 = () => (
      <React.Fragment>
        <Comp />
        {
          Array(20).fill().map((x, i) => (
            <ListItem
              className="outline-list-item"
              key={self.generateKey('outline-arr', i)}
            >
              Test adasvda aaf af f ffafasf asffasfas af ajhdiufvafu afigifb af iuag
            </ListItem>
          ))
        }
      </React.Fragment>
    );
    setTimeout(() => {
      render(<Comp1 />, document.getElementById(self.outlineListId));
    }, 200);
  }

  render() {
    const self = this;
    const { data, fetching } = this.props;
    const { outlineDrawer } = this.state;

    return (
      <Fragment>
        <div className="content-center-page blog-page">
          <div id="md-container" className="markdown-container">
            {
              (() => {
                self.counter = 0;
                self.allRefs = {};
                self.headingEls = [];
                return !fetching ? (
                  <ReactMarkdown
                    source={data}
                    escapeHtml={false}
                    linkTarget="_blank"
                    astPlugins={[
                      // this.parseHtml,
                    ]}
                    renderers={{
                      heading: (props) => {
                        self.counter += 1;
                        self.headingEls.push({
                          level: props.level,
                          text: props.children[0].props.value,
                        });
                        return self.hTag(
                          props.level,
                          props.children[0].props.value,
                          { ref: self.allRefsArr[self.counter - 1] },
                        );
                      },
                    }}
                  />
                ) : null;
              })()
            }
          </div>
          <nav className="nav-big-outline">
            <Button
              icon="list_alt"
              className="show-outline"
              onClick={() => this.setState({ outlineDrawer: true })}
            >
              Show Outline
            </Button>
            <Drawer dismissible open={outlineDrawer}>
              <div className="nav-big-outline__heading">
                <div className="nav-big-outline__heading-text"><span>Outline</span></div>
                <div className="nav-big-outline__heading-icon">
                  <Icon
                    icon="clear"
                    iconOptions={{ strategy: 'ligature' }}
                    onClick={() => this.setState({ outlineDrawer: false })}
                  />
                </div>
              </div>
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
              >
                <List
                  id={self.outlineListId}
                >
                  {
                    (() => {
                      self.renderOutline();
                    })()
                  }
                </List>
              </Scrollbars>
            </Drawer>
          </nav>
          <nav className="nav-big-blog-recent">
            <div className="nav-big-blog-recent__heading">
              <span>Recent Blogs</span>
            </div>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              <List>
                {
                  Array(10).fill().map((x, i) => (
                    <ListItem
                      key={self.generateKey('test-arr', i)}
                    >
                      Some Test Article Item
                    </ListItem>
                  ))
                }
              </List>
            </Scrollbars>
          </nav>
        </div>
        <nav className="nav-small-blog-lists">
          Hello
        </nav>
      </Fragment>
    );
  }
}

BlogPage.propTypes = {
  data: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.Home_BlogPage.data,
    fetching: state.Home_BlogPage.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchBlogPost()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogPage));
