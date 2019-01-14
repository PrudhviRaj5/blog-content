import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import TopNavBar from 'components/Material/TopNavBar';
import topNavRoutes from 'routes/topNavRoutes';
import './TopNavLayout.scss';

const ZyloLogo = () => (
  <a
    href={topNavRoutes.leftLink.path}
    className="zt-top-nav-logo"
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
      activeTab: this.getLocIndex(props),
      rightMenu: this.initRightMenuState(props),
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

  getLocRightMenu = ({ location }) => {
    let idx = null;
    let subIdx = null;
    topNavRoutes.rightMenuLinks.forEach((link, i) => {
      link.children.forEach((l, j) => {
        if (location.pathname.includes(l.path)) {
          idx = i;
          subIdx = j;
        }
      });
    });
    return [idx, subIdx];
  }

  initRightMenuState = (props) => {
    const state = {};
    const [idx, subIdx] = this.getLocRightMenu(props);
    topNavRoutes.rightMenuLinks.forEach((e, i) => {
      state[i] = {
        clicked: false,
        selected: false,
        childIdx: null,
      };
    });
    if (idx !== null) {
      state[idx].selected = true;
      state[idx].childIdx = subIdx;
    }
    return state;
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
    }, 150);
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

  updateRightMenus = (idx, state) => {
    const { rightMenu } = { ...this.state };
    rightMenu[idx].clicked = state;
    this.setState({
      rightMenu,
    });
  }

  onSelectRightMenu = (i, idx) => {
    const { rightMenu } = { ...this.state };
    rightMenu[i].selected = true;
    rightMenu[i].childIdx = idx;
    this.setState({
      activeTab: null,
      rightMenu,
    });
  }

  render() {
    const {
      activeTab,
      rightMenu,
    } = this.state;
    return (
      <div className="zt-main__frame">

        <TopNavBar
          activeTab={activeTab}
          rightMenu={rightMenu}
          leftLogo={ZyloLogo}
          centerLinks={topNavRoutes.centerLinks}
          rightMenuLinks={topNavRoutes.rightMenuLinks}
          updateActiveTab={this.updateActiveTab}
          updateRightMenus={this.updateRightMenus}
          onSelectRightMenu={this.onSelectRightMenu}
        />

        <div className="zt-main__body">
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
