import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TextField } from '@rmwc/textfield';

import '@rmwc/textfield/node_modules/@material/textfield/dist/mdc.textfield.css';
import '@rmwc/textfield/node_modules/@material/floating-label/dist/mdc.floating-label.css';
import '@rmwc/textfield/node_modules/@material/notched-outline/dist/mdc.notched-outline.css';
import '@rmwc/textfield/node_modules/@material/line-ripple/dist/mdc.line-ripple.css';

import './TextField.scss';

const TextBox = (props) => {
  const {
    className,
    textarea,
    type,
    fullwidth,
    inputRef,
    disabled,
    required,
    dense,
    outlined,
    withLeadingIcon,
    rootProps,
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
      textarea={textarea}
      type={type}
      fullwidth={fullwidth}
      inputRef={inputRef}
      disabled={disabled}
      required={required}
      dense={dense}
      outlined={outlined}
      withLeadingIcon={withLeadingIcon}
      rootProps={rootProps}
      {...rest}
    />
  );
};

TextBox.defaultProps = {
  className: '',
  textarea: false,
  type: 'text',
  fullwidth: false,
  inputRef: undefined,
  disabled: false,
  required: false,
  invalid: false,
  dense: false,
  outlined: true,
  withLeadingIcon: undefined,
  rootProps: {},
};

TextBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  textarea: PropTypes.bool,
  type: PropTypes.string,
  fullwidth: PropTypes.bool,
  inputRef: PropTypes.any,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  dense: PropTypes.bool,
  outlined: PropTypes.bool,
  withLeadingIcon: PropTypes.any,
  rootProps: PropTypes.any,
};

export default TextBox;
