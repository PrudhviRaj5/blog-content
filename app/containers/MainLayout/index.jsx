import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
} from '@rmwc/drawer';
import {
  List,
  ListItem,
  ListItemGraphic,
} from '@rmwc/list';

import TopNavBar from 'components/Material/TopNavBar';
import topNavRoutes from './routes';
import './main-layout.scss';

const ZyloLogo = () => (
  <a
    href={topNavRoutes.leftLink.path}
    className="top-nav-logo"
  >
    <img
      src={topNavRoutes.leftLink.logoImg}
      alt="logo"
    />
  </a>
);


const TopNavLayout = (props) => {
  const getLocIndex = () => {
    const { location } = props;
    let idx = null;
    topNavRoutes.centerLinks.forEach((l, i) => {
      if (location.pathname.includes(l.path)) {
        idx = i;
      }
    });
    return idx;
  };

  const [activeTab, setActiveTab] = useState(getLocIndex() || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pushRoute = (idx) => {
    const { history } = props;
    history.push(topNavRoutes.centerLinks[idx].path);
  };

  const updateActiveTab = (idx) => {
    setActiveTab(idx);
    pushRoute(idx);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="main__frame">

      <TopNavBar
        activeTab={activeTab}
        leftLogo={ZyloLogo}
        centerLinks={topNavRoutes.centerLinks}
        updateActiveTab={updateActiveTab}
        toggleDrawer={toggleDrawer}
      />

      <Drawer
        modal
        className="sidebar-nav"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerContent>
          <List>
            {
              topNavRoutes.centerLinks.map((eachLink, i) => (
                <ListItem
                  key={eachLink.key}
                  tag={Link}
                  to={eachLink.path}
                  activated={activeTab === i}
                  onClick={() => updateActiveTab(i)}
                >
                  <ListItemGraphic icon={eachLink.icon} />
                  {eachLink.name}
                </ListItem>
              ))
            }
          </List>
        </DrawerContent>
      </Drawer>

      <div className="main__body">
        <Switch>
          {
            topNavRoutes.centerLinks.map((eachLink) => (
              <Route
                key={eachLink.key}
                path={eachLink.path}
                component={eachLink.component}
                exact={eachLink.exact}
              />
            ))
          }
          <Redirect to="/home" />
        </Switch>
      </div>

    </div>
  );
};

TopNavLayout.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default withRouter(TopNavLayout);
