import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarActionItem,
} from '@rmwc/top-app-bar';
import { TabBar, Tab } from '@rmwc/tabs';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';

import './TopNavBar.scss';

const TopNavBar = (props) => {
  const {
    leftLogo,
    centerLinks,
    activeTab,
    updateActiveTab,
    rightMenuLinks,
    rightMenu,
    updateRightMenus,
    onSelectRightMenu,
  } = props;

  const LeftLogo = leftLogo;

  return (
    <TopAppBar
      fixed
      className="zt-main__header"
    >
      <TopAppBarRow>

        <TopAppBarSection
          alignStart
          className="zt-top-bar__left-section"
        >
          <LeftLogo />
        </TopAppBarSection>

        <TopAppBarSection className="zt-top-bar__tab-section">
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
          className="zt-top-bar__right-section"
        >
          {
            rightMenuLinks.map((e, i) => (
              <TopAppBarActionItem
                key={e.key}
                aria-label={e.key}
                alt={e.key}
                // onMouseEnter={evt => props.updateRightMenus(i, true)}
                onClick={() => updateRightMenus(i, true)}
                onMouseLeave={() => updateRightMenus(i, false)}
              >
                {e.icon}
                <MenuSurfaceAnchor>
                  <Menu
                    style={{ marginTop: '5px' }}
                    open={rightMenu[i].clicked}
                    onClose={() => updateRightMenus(i, false)}
                    onSelect={(evt) => { onSelectRightMenu(i, evt.detail.index); }}
                  >
                    {
                      e.children.map((x, j) => (
                        <MenuItem
                          key={x.key}
                          tag={Link}
                          to={x.path}
                          selected={rightMenu[i].childIdx === j}
                        >
                          { x.name }
                        </MenuItem>
                      ))
                    }
                  </Menu>
                </MenuSurfaceAnchor>
              </TopAppBarActionItem>
            ))
          }
        </TopAppBarSection>

        {/*
        <TopAppBarSection alignEnd>
          <TopAppBarActionItem
            aria-label="In-App Notifications"
            alt="In-App Notifications"
            onClick={evt => this.setState({'notificationIsOpen': !this.state.notificationIsOpen})}
          >
            notifications_active
          </TopAppBarActionItem>
        </TopAppBarSection>
        */}

      </TopAppBarRow>
    </TopAppBar>
  );
};

TopNavBar.propTypes = {
  leftLogo: PropTypes.func.isRequired,
  centerLinks: PropTypes.arrayOf(Object).isRequired,
  activeTab: PropTypes.number.isRequired,
  updateActiveTab: PropTypes.func.isRequired,
  rightMenuLinks: PropTypes.arrayOf(Object).isRequired,
  rightMenu: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateRightMenus: PropTypes.func.isRequired,
  onSelectRightMenu: PropTypes.func.isRequired,
};

export default TopNavBar;
