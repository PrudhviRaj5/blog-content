import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  List,
  ListItem,
} from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import {
  Drawer,
} from '@rmwc/drawer';
import Button from 'components/Material/Button/CustomButton';

import { URL } from 'constants/app.config';
import { generateKey } from 'utils/utils';
import { fetchBlogPost } from 'containers/MainLayout/Home/BlogPage/actions';
import { fetchBlogList } from 'containers/MainLayout/Home/BlogList/actions';
import {
  makeSelectBlogPostData,
  makeSelectIsBlogPostFetching,
} from 'containers/MainLayout/Home/BlogPage/selectors';
import {
  makeSelectBlogListData,
  makeSelectIsBlogListFetching,
} from 'containers/MainLayout/Home/BlogList/selectors';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import { createElement } from './helper';

import 'highlight.js/styles/atom-one-dark.css';
import './blog-page.scss';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('python', python);

const generateRefs = (len) => {
  return Array(len).fill().map(() => React.createRef());
};

const BlogPage = (props) => {
  const outlineListId = 'blog-outline';
  const allRefsArr = generateRefs(100);
  let counter = 0;
  const headingEls = [];
  const { location: { pathname } } = props;
  const url = pathname.split('blog_page')[1];

  const {
    history,
    fetching,
    data,
    listData,
    fetchData,
    listFetching,
    fetchListData,
  } = props;

  // const [savedUrl, setSavedUrl] = useState(url);
  const [outlineDrawer, setOutlineDrawer] = useState(false);
  const [bottomOutlineDrawer, setBottomOutlineDrawer] = useState(false);
  const [bottomRecentDrawer, setBottomRecentDrawer] = useState(false);

  const hightlightCodeBlocks = () => {
    const preTagElms = document.querySelectorAll('pre');
    if (!fetching) {
      preTagElms.forEach((el) => {
        hljs.highlightBlock(el);
      });
      // don't delete
      // hljs.initHighlighting(); // works only for initial render
    }
  };

  const renderOutline = () => {
    const Comp = () => (
      headingEls.map((el, i) => (
        <ListItem
          key={generateKey('outline-key', i)}
          className={`outline-list-item item-level-${headingEls[i].level}`}
          onClick={() => {
            window.scrollTo(
              0,
              allRefsArr[i].current.offsetTop,
            );
          }}
        >
          {headingEls[i].text}
        </ListItem>
      ))
    );
    // const Comp1 = () => (
    //   <React.Fragment>
    //     <Comp />
    //     {
    //       Array(10).fill().map(j => (
    //         <ListItem
    //           key={generateKey('next-outline-key', j)}
    //           className="outline-list-item item-level-2"
    //         >
    //           Im just testing
    //         </ListItem>
    //       ))
    //     }
    //   </React.Fragment>
    // );
    setTimeout(() => {
      render(<Comp />, document.getElementById(`${outlineListId}-big`));
      render(<Comp />, document.getElementById(`${outlineListId}-small`));
    }, 300);
  };

  useEffect(() => {
    fetchData(url);
    if (listFetching) {
      fetchListData();
    }
    hightlightCodeBlocks();
  }, [url]);


  return (
    <>
      <div className="content-center-page blog-page">
        <div id="md-container" className="markdown-container">
          {
            (() => {
              counter = 0;
              return !fetching ? (
                <ReactMarkdown
                  source={data}
                  escapeHtml={false}
                  linkTarget="_blank"
                  // astPlugins={[
                  //   parseHtml,
                  // ]}
                  // https://github.com/rexxars/commonmark-react-renderer/blob/master/src/commonmark-react-renderer.js
                  renderers={{
                    // assigning refs for h tags for scroll to for outline
                    heading: (rProps) => {
                      counter += 1;
                      headingEls.push({
                        level: rProps.level,
                        text: rProps.children[0].props.value,
                      });
                      return createElement(
                        `h${rProps.level}`,
                        { ref: allRefsArr[counter - 1] },
                        rProps.children,
                      );
                    },
                    // to render images from local folder
                    image: (iProps) => {
                      const splitStr = 'blog-assets';
                      const imgProps = { src: iProps.src, alt: iProps.alt };
                      if (iProps.src.indexOf(splitStr) > -1) {
                        imgProps.src = `${URL}/${splitStr}${iProps.src.split(splitStr)[1]}`;
                      }
                      return createElement(
                        'img',
                        imgProps,
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
            icon="vertical_split"
            className="show-outline"
            onClick={() => setOutlineDrawer(true)}
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
                  onClick={() => setOutlineDrawer(false)}
                />
              </div>
            </div>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              <List
                id={`${outlineListId}-big`}
              >
                {
                  (() => {
                    renderOutline();
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
                listData.map((x, i) => (
                  <ListItem
                    key={generateKey('test-arr', i)}
                    tag={Link}
                    className="recent-list-item-link"
                    to={`/home/blog_page${x.url.split('.')[0]}`}
                    activated={url === x.url.split('.')[0]}
                  >
                    {x.name}
                  </ListItem>
                ))
              }
            </List>
          </Scrollbars>
        </nav>
      </div>
      <nav className="bottom-nav-small">
        <button
          className="bottom-nav-items"
          type="button"
          onClick={() => setBottomOutlineDrawer(!bottomOutlineDrawer)}
        >
          <Icon icon="vertical_split" iconOptions={{ strategy: 'ligature' }} />
          <span>Outline</span>
        </button>
        <div />
        <button
          className="bottom-nav-items"
          type="button"
          onClick={() => history.push('/home')}
        >
          <Icon icon="home" iconOptions={{ strategy: 'ligature' }} />
          <span>Home</span>
        </button>
        <div />
        <button
          className="bottom-nav-items"
          type="button"
          onClick={() => setBottomRecentDrawer(!bottomRecentDrawer)}
        >
          <Icon icon="undo" iconOptions={{ strategy: 'ligature' }} />
          <span>Recent</span>
        </button>
      </nav>

      <div
        className={cx({ 'bottom-outline-drawer': true, '--close': !bottomOutlineDrawer })}
      >
        <div className="drawer-heading">
          <h2>Outline</h2>
          <Icon
            icon="close"
            iconOptions={{ strategy: 'ligature' }}
            onClick={() => setBottomOutlineDrawer(!bottomOutlineDrawer)}
          />
        </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <List
            id={`${outlineListId}-small`}
          />
        </Scrollbars>
      </div>

      <div
        className={cx({ 'bottom-recent-drawer': true, '--close': !bottomRecentDrawer })}
      >
        <div className="drawer-heading">
          <h2>Recent</h2>
          <Icon
            icon="close"
            iconOptions={{ strategy: 'ligature' }}
            onClick={() => setBottomRecentDrawer(!bottomRecentDrawer)}
          />
        </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <List>
            {
              listData.map((x, i) => (
                <ListItem
                  key={generateKey('test-arr', i)}
                  tag={Link}
                  className="recent-list-item-link"
                  to={`/home/blog_page${x.url.split('.')[0]}`}
                  activated={url === x.url.split('.')[0]}
                >
                  {x.name}
                </ListItem>
              ))
            }
          </List>
        </Scrollbars>
      </div>

    </>
  );
};

BlogPage.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  listData: PropTypes.any.isRequired,
  listFetching: PropTypes.bool.isRequired,
  fetchListData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectBlogPostData(),
  fetching: makeSelectIsBlogPostFetching(),
  listData: makeSelectBlogListData(),
  listFetching: makeSelectIsBlogListFetching(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchBlogPost(url)),
    fetchListData: () => dispatch(fetchBlogList()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(BlogPage);
