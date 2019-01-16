import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
} from '@rmwc/drawer';
import {
  List,
  ListItem,
} from '@rmwc/list';

import { Button } from '@rmwc/button';

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
        />

        <Drawer
          modal
          open={drawerOpen}
          onClose={() => this.setState({ drawerOpen: false })}
        >
          <DrawerHeader>
            <DrawerTitle>DrawerHeader</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              {
                topNavRoutes.centerLinks.map(eachLink => (
                  <ListItem
                    key={eachLink.key}
                    tag={Link}
                    to={eachLink.path}
                  >
                    {eachLink.name}
                  </ListItem>
                ))
              }
            </List>
          </DrawerContent>
        </Drawer>

        <div className="main__body">
          <Button
            onClick={() => this.setState({ drawerOpen: !drawerOpen })}
            raised
          >
            Toggle Drawer
          </Button>
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

export default withRouter(TopNavLayout);
