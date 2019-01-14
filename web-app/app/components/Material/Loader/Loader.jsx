import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CircularProgress } from '@rmwc/circular-progress';

import '@rmwc/circular-progress/circular-progress.css';

const Loader = (props) => {
  const { size, className } = props;

  return (
    <CircularProgress className={cx(className)} size={size} />
  );
};

Loader.defaultProps = {
  size: 60,
  className: '',
};

Loader.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Loader;
