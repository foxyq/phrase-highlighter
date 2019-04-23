import React from 'react';
import DynamicContent from '../components/DynamicContent/';

const parseStringData = require('parse-string-data');

export const inputIsEmpty = input => input === null || input === '';

export const overlapCoords = (block1, block2) => {
  const start = Math.max(block1.startOffset, block2.startOffset);
  const end = Math.min(block1.endOffset, block2.endOffset);

  return start < end ? [start, end] : null;
};

export const firstHasPriority = (first, second) => {
  return first.priority < second.priority;
};

export const secondIsInsideFirst = (first, second) =>
  second.startOffset >= first.startOffset &&
  second.endOffset <= first.endOffset;

export const formatHighlights = highlights => {
  let data = [];

  if (!Array.isArray(highlights)) {
    data = highlights.replace(/(\r\n|\n|\r)/gm, '').replace(/'/g, '');
    data = parseStringData(data);
  }

  if (!Array.isArray(data)) return [];

  let workingHighlights = data.slice();
  if (!Array.isArray(highlights)) {
    workingHighlights = data.slice();
  } else {
    workingHighlights = highlights.slice();
  }

  // const workingHighlights = highlights.slice();

  // try {
  workingHighlights.sort((a, b) => a.startOffset - b.startOffset);
  // } catch (e) {
  // console.log(e);
  // }

  let i = 1;
  while (i < workingHighlights.length) {
    const prev = workingHighlights[i - 1];
    const curr = workingHighlights[i];

    const overlap = overlapCoords(prev, curr);

    // need to split
    if (overlap) {
      // split longer into 2
      if (secondIsInsideFirst(prev, curr)) {
        if (!firstHasPriority(prev, curr)) {
          const furtherEnd = prev.endOffset;
          prev.endOffset = curr.startOffset;

          const newBlock = { ...prev };
          const currJoin = prev.join || '';

          prev.join = currJoin + ' join-right';
          newBlock.startOffset = curr.endOffset;
          newBlock.endOffset = furtherEnd;
          newBlock.join = ' join-left';

          workingHighlights.splice(i + 1, 0, newBlock);
        }
      } else {
        // shorten one
        if (firstHasPriority(prev, curr)) {
          curr.startOffset = prev.endOffset;
          curr.join = ' join-left';
        } else {
          prev.endOffset = curr.startOffset;
          curr.join = ' join-left';
        }
      }
    }

    // no overlap, do nothing
    i++;
  }
  return workingHighlights;
};

export const createHighlightedElements = (highlights, text) => {
  const arrayOfChildren = [];

  if (inputIsEmpty(highlights)) return <div>{text}</div>;

  let textIndex = 0;

  highlights.forEach((item, index) => {
    //copy words before first highlight || in between highlights
    if (index === 0 || item.startOffset > textIndex) {
      const content = text.substring(textIndex, item.startOffset);
      arrayOfChildren.push(
        React.createElement(DynamicContent, { key: textIndex }, content)
      );
      textIndex = item.startOffset;
    }

    // highlighted word
    const joinClass = item.join || '';
    const className = 'highlight ' + joinClass;
    const content = text.substring(item.startOffset, item.endOffset);

    const styles = {
      backgroundColor: item.color,
      zIndex: 100 - item.priority
    };

    arrayOfChildren.push(
      React.createElement(
        'span',
        {
          className: className,
          key: textIndex,
          style: styles
        },
        content
      )
    );
    textIndex = item.endOffset;

    // copy words after last highlight
    if (index === highlights.length - 1 && textIndex < text.length - 1) {
      const content = text.substring(item.endOffset);
      arrayOfChildren.push(
        React.createElement(DynamicContent, { key: textIndex }, content)
      );
    }
  });

  return React.createElement(
    'div',
    {
      className: 'myList'
    },
    arrayOfChildren
  );
};
