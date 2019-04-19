import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
} from '@rmwc/top-app-bar';

import './TopNavBar.scss';

const TopNavBar = (props) => {
  const {
    leftLogo,
    centerLinks,
    activeTab,
    updateActiveTab,
    toggleDrawer,
  } = props;

  const LeftLogo = leftLogo;

  return (
    <TopAppBar
      fixed
      className="main__header"
    >
      <TopAppBarRow
        className="top-bar__small-screen"
      >
        <TopAppBarSection
          alignStart
          className="top-bar__left-section"
        >
          <TopAppBarNavigationIcon
            icon="menu"
            onClick={toggleDrawer}
          />
        </TopAppBarSection>

        <TopAppBarSection
          className="top-bar__mid-section"
        >
          <LeftLogo />
        </TopAppBarSection>

        <TopAppBarSection
          alignEnd
          className="top-bar__right-section"
        />
      </TopAppBarRow>


      {/* DOM for large screen */}
      <TopAppBarRow
        className="top-bar__large-screen"
      >

        <TopAppBarSection
          alignStart
          className="top-bar__left-section"
        />

        <TopAppBarSection
          className="top-bar__mid-section"
        >
          <LeftLogo />
        </TopAppBarSection>

        <TopAppBarSection className="top-bar__tab-section">
          <nav
            className="tab-bar-layout__tabs"
          >
            {
              centerLinks.map((e, i) => (
                <button
                  className={cx({
                    'tab-layout__tab': true,
                    'mdc-tab': true,
                    'tab-layout__tab--active': activeTab === i,
                  })}
                  type="button"
                  key={e.key}
                  onClick={() => updateActiveTab(i)}
                >
                  <div className="mdc-tab__content">
                    <span className="mdc-tab__text-label">
                      {e.name}
                    </span>
                  </div>
                </button>
              ))
            }
          </nav>
        </TopAppBarSection>

        <TopAppBarSection
          alignEnd
          className="top-bar__right-section"
        />

      </TopAppBarRow>
    </TopAppBar>
  );
};

TopNavBar.defaultProps = {
  activeTab: null,
};

TopNavBar.propTypes = {
  leftLogo: PropTypes.func.isRequired,
  centerLinks: PropTypes.arrayOf(Object).isRequired,
  activeTab: PropTypes.number,
  updateActiveTab: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default TopNavBar;
