import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TextField } from '@rmwc/textfield';

import './TextField.scss';

const TextBox = (props) => {
  const {
    className,
    ...rest
  } = props;

  const clName = {
    'm-txt': true,
  };

  if (className) {
    clName[className] = true;
  }

  return (
    <TextField
      className={cx(clName)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

TextBox.defaultProps = {
  className: '',
  type: 'text',
  outlined: true,
};

TextBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  type: PropTypes.string,
  outlined: PropTypes.bool,
};

export default TextBox;
