import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Elevation } from '@rmwc/elevation';

import './VanillaPaper.scss';

class VanillaPaper extends Component {
  constructor(props) {
    super(props);
    const elevation = props.elevationOut;
    this.state = {
      elevation,
    };
  }

  updateElevationMouseOver = () => {
    const { elevationIn } = this.props;
    this.setState({
      elevation: elevationIn,
    });
  }

  updateElevationMouseOut = () => {
    const { elevationOut } = this.props;
    this.setState({
      elevation: elevationOut,
    });
  }

  render() {
    const {
      style,
      className,
      rounded,
    } = this.props;

    const passProps = {
      style,
    };
    const newClassName = {
      'zt-vanilla-paper': true,
    };
    if (rounded) {
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
  rounded: false,
  elevationIn: 8,
  elevationOut: 2,
};

VanillaPaper.propTypes = {
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  rounded: PropTypes.bool,
  children: PropTypes.instanceOf(Element).isRequired,
  elevationIn: PropTypes.number,
  elevationOut: PropTypes.number,
};

export default VanillaPaper;
