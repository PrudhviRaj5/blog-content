import React from 'react';
import htmlParser from 'react-markdown/plugins/html-parser';

export const parseHtml = htmlParser({
  isValidNode: () => {
    // console.log(node);
    return true;
  },
  // processingInstructions: [/* ... */],
});

const reduceChildren = (children, child) => {
  const childrenCopy = [...children];
  const lastIndex = childrenCopy.length - 1;
  if (typeof child === 'string' && typeof childrenCopy[lastIndex] === 'string') {
    childrenCopy[lastIndex] += child;
  } else {
    childrenCopy.push(child);
  }
  return childrenCopy;
};

/* eslint prefer-spread: 0 */
export const createElement = (tagName, props, children) => {
  const nodeChildren = Array.isArray(children) && children.reduce(reduceChildren, []);
  const args = [tagName, props].concat(nodeChildren || children);
  return React.createElement.apply(React, args);
};
