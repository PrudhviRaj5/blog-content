import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
} from '@rmwc/top-app-bar';
import { TabBar, Tab } from '@rmwc/tabs';
// import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';

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
          <TabBar
            activeTabIndex={activeTab}
            onActivate={(evt) => {
              if (props.activeTab !== null) {
                updateActiveTab(evt.detail.index);
              } else {
                updateActiveTab(null);
              }
            }}
          >
            {
              centerLinks.map(eachLink => (
                <Tab
                  key={eachLink.key}
                  tag={Link}
                  to={eachLink.path}
                >
                  {eachLink.name}
                </Tab>
              ))
            }
          </TabBar>
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
