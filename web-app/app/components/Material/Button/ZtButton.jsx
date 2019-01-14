import React from 'react';
import cx from 'classnames';
import { Button, ButtonIcon } from 'rmwc/Button';

import './ZtButton.scss';

const ZtButton = (props) => {
  const {
    icon,
    rounded,
    className,
    children,
    ...rest
  } = props;

  const clName = {
    'zt-button': true,
  };

  if (className) {
    clName[className] = true;
  }
  if (rounded) {
    clName['zt-round-button'] = true;
  }

  return (
    <Button
      raised
      className={cx(clName)}
      {...rest}
    >
      {
        icon ? <ButtonIcon icon={icon} /> : null
      }
      { children }
    </Button>
  );
};

export default ZtButton;
