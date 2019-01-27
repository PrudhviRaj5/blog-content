import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Elevation } from '@rmwc/elevation';

import './VanillaPaper.scss';

const paperElev = {
  in: {
    elevation: 8,
  },
  out: {
    elevation: 2,
  },
};


class VanillaPaper extends Component {
  state = {
    elevation: paperElev.out.elevation,
  }

  updateElevationMouseOver = () => {
    this.setState({
      elevation: paperElev.in.elevation,
    });
  }

  updateElevationMouseOut = () => {
    this.setState({
      elevation: paperElev.out.elevation,
    });
  }

  render() {
    const {
      style,
      className,
      sharpEdge,
    } = this.props;

    const passProps = {
      style,
    };
    const newClassName = {
      'zt-vanilla-paper': true,
    };
    if (!sharpEdge) {
      newClassName['--rounded'] = true;
    }
    passProps.className = cx(newClassName, className);

    const { children } = this.props;
    const { elevation } = this.state;

    return (
      <Elevation
        z={elevation}
        transition
        onMouseOver={() => this.updateElevationMouseOver()}
        onFocus={() => this.updateElevationMouseOver()}
        onMouseOut={() => this.updateElevationMouseOut()}
        onBlur={() => this.updateElevationMouseOut()}
        {...passProps}
      >
        {children}
      </Elevation>
    );
  }
}

VanillaPaper.defaultProps = {
  style: {},
  className: '',
  sharpEdge: false,
};

VanillaPaper.propTypes = {
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  sharpEdge: PropTypes.bool,
  children: PropTypes.instanceOf(Element).isRequired,
};

export default VanillaPaper;
