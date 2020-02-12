import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  List,
  CollapsibleList,
  SimpleListItem,
} from '@rmwc/list';

import {
  makeSelectBlogListData,
  makeSelectIsBlogListFetching,
} from 'containers/MainLayout/Home/BlogList/selectors';
import { generateKey } from 'utils/utils';
import { fetchBlogList } from 'containers/MainLayout/Home/BlogList/actions';

import '@rmwc/list/collapsible-list.css';
import './archives.scss';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];


const Archives = (props) => {
  const getMonthYear = (datePublished) => (
    `${monthNames[(new Date(datePublished)).getMonth()]} ${new Date(datePublished).getUTCFullYear()}`
  );

  const getDate = (datePublished) => (
    `0${new Date(datePublished).getDate()}`.slice(-2)
  );

  const getFilterData = (data) => {
    const filterMap = {};
    const sortHelper = [];
    const filterData = [];
    data.forEach((x) => {
      const monthYear = getMonthYear(x.date_published);
      const newData = {
        name: x.name,
        date: getDate(x.date_published),
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
  };

  const { isFetching, data, fetchData } = props;
  const filterData = getFilterData(data);

  useEffect(() => {
    if (isFetching) {
      fetchData();
    }
  }, []);

  return (
    <div className="content-center-page archives-page">
      <h1 className="archives-heading">Archives</h1>
      <List>
        {
          !isFetching ? (
            filterData.map((x, i) => (
              <CollapsibleList
                className="collapsible"
                key={generateKey('acc-title', i)}
                handle={(
                  <SimpleListItem
                    text={`${x.datePublished} (${x.dateWiseData.length})`}
                    metaIcon="chevron_right"
                  />
                )}
                // onOpen={() => console.log('open')}
                // onClose={() => console.log('close')}
              >
                {
                  x.dateWiseData.map((y, j) => (
                    <div
                      key={generateKey('acc-body', (i * 100 + j))}
                      className="link-wrapper"
                    >
                      {`${y.date}: `}
                      <Link
                        className="link-item"
                        to={`/home/blog_page${y.url.split('.')[0]}`}
                      >
                        {y.name}
                      </Link>
                    </div>
                  ))
                }
              </CollapsibleList>
            ))
          ) : null
        }
      </List>
    </div>
  );
};

Archives.propTypes = {
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
)(Archives);
