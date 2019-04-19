import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  withRouter,
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
import topNavRoutes from 'routes/topNavRoutes';
import './TopNavLayout.scss';

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

class TopNavLayout extends Component {
  constructor(props) {
    super(props);
    const locIndex = this.getLocIndex();
    this.state = {
      drawerOpen: false,
      activeTab: locIndex || 0,
    };
  }

  componentDidMount() {
    const activeIdx = this.getLocIndex();
    if (activeIdx === null) {
      const { activeTab } = this.state;
      this.pushRoute(activeTab);
    }
  }

  // componentDidUpdate() {
  //   const actualActiveTab = this.getLocIndex(this.props);
  //   const { activeTab } = this.state;
  //   if (actualActiveTab !== activeTab) {
  //     this.updateActiveTab(actualActiveTab);
  //   }
  // }

  pushRoute = (idx) => {
    const { history } = this.props;
    history.push(topNavRoutes.centerLinks[idx].path);
  }

  getLocIndex = () => {
    const { location } = this.props;
    let idx = null;
    topNavRoutes.centerLinks.forEach((l, i) => {
      if (location.pathname.includes(l.path)) {
        idx = i;
      }
    });
    return idx;
  }

  updateActiveTab = (idx) => {
    this.setState({
      activeTab: idx,
    });
    this.pushRoute(idx);
  }

  toggleDrawer = () => {
    const {
      drawerOpen,
    } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  }

  render() {
    const {
      drawerOpen,
      activeTab,
    } = this.state;
    return (
      <div className="main__frame">

        <TopNavBar
          activeTab={activeTab}
          leftLogo={ZyloLogo}
          centerLinks={topNavRoutes.centerLinks}
          updateActiveTab={this.updateActiveTab}
          toggleDrawer={this.toggleDrawer}
        />

        <Drawer
          modal
          className="sidebar-nav"
          open={drawerOpen}
          onClose={() => this.setState({ drawerOpen: false })}
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
                    onClick={() => this.updateActiveTab(i)}
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
              topNavRoutes.centerLinks.map(eachLink => (
                <Route
                  key={eachLink.key}
                  path={eachLink.path}
                  component={eachLink.component}
                  exact={eachLink.exact}
                />
              ))
            }
          </Switch>
        </div>

      </div>
    );
  }
}

TopNavLayout.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default withRouter(TopNavLayout);
