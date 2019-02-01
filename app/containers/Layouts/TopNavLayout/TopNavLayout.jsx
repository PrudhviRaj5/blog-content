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
    this.state = {
      drawerOpen: false,
      activeTab: this.getLocIndex(props),
    };
  }

  componentDidMount() {
    const { activeTab } = this.state;
    const { history } = this.props;
    if (activeTab === null) {
      history.push('/home');
    }
  }

  componentDidUpdate() {
    const actualActiveTab = this.getLocIndex(this.props);
    const { activeTab } = this.state;
    if (actualActiveTab !== activeTab) {
      this.updateActiveTab(actualActiveTab);
    }
  }

  getLocIndex = ({ location }) => {
    let idx = null;
    topNavRoutes.centerLinks.forEach((l, i) => {
      if (location.pathname.includes(l.path)) {
        idx = i;
      }
    });
    return idx;
  }

  slowUpdateActiveTab = () => {
    const self = this;
    setTimeout(() => {
      const aT = self.getLocIndex(self.props);
      if (aT !== null) {
        this.setState({
          activeTab: aT,
        });
      }
    }, 100);
  }

  updateActiveTab = (idx) => {
    if (idx === null) {
      this.slowUpdateActiveTab();
    } else {
      this.setState({
        activeTab: idx,
      });
    }
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
};

export default withRouter(TopNavLayout);
