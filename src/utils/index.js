import React from 'react';

// import DynamicContent from '../components/DynamicContent/';

export const inputIsEmpty = input =>
  input === null || input === '' || input.length === 0;

/*
const parseStringData = require('parse-string-data');





export const hasOverlap = (block1, block2) => {
  const start = Math.max(block1.startOffset, block2.startOffset);
  const end = Math.min(block1.endOffset, block2.endOffset);

  return start < end;
};

export const firstHasPriority = (first, second) => {
  return first.priority < second.priority;
};

export const secondIsInsideFirst = (first, second) =>
  second.startOffset >= first.startOffset &&
  second.endOffset <= first.endOffset;

export const formatHighlights = highlights => {
  // get correct index where to insert block so highlights stay sorted
  const getIndex = start => {
    let i = 0;
    while (
      i < workingHighlights.length &&
      start > workingHighlights[i].startOffset
    ) {
      i++;
    }
    return i;
  };

  let data = [];

  if (typeof highlights === 'number') return [];

  if (!Array.isArray(highlights)) {
    if (typeof highlights === 'object') return [];
    data = highlights.replace(/(\r\n|\n|\r)/gm, '').replace(/'|"/g, '');
    data = parseStringData(data);
  }

  if (!Array.isArray(data)) return [];

  let workingHighlights = null;

  if (!Array.isArray(highlights)) {
    workingHighlights = data.slice();
  } else {
    workingHighlights = highlights.slice();
  }

  workingHighlights.sort((a, b) => a.startOffset - b.startOffset);
  workingHighlights = workingHighlights.filter(
    x => x.startOffset < x.endOffset
  );

  let i = 1;
  while (i < workingHighlights.length) {
    const prev = workingHighlights[i - 1];
    const curr = workingHighlights[i];

    const overlap = hasOverlap(prev, curr);

    // need to split
    if (overlap) {
      if (secondIsInsideFirst(prev, curr)) {
        // first covers 2nd - ignore 2nd completely
        if (firstHasPriority(prev, curr)) {
          workingHighlights.splice(i, 1);
        }
        // split longer into 2 parts
        else {
          const furtherEnd = prev.endOffset;
          prev.endOffset = curr.startOffset;

          const newBlock = { ...prev };
          const currJoin = prev.join || '';
          if (!currJoin.includes('join-right')) {
            prev.join = currJoin + ' join-right ';
          }
          newBlock.startOffset = curr.endOffset;
          newBlock.endOffset = furtherEnd;
          const newJoin = newBlock.join || '';
          if (!newJoin.includes('join-left')) {
            newBlock.join = ' join-left ';
          }

          const newIndex = getIndex(newBlock.startOffset);
          workingHighlights.splice(newIndex, 0, newBlock);
        }
      } else {
        // shorten one
        if (firstHasPriority(prev, curr)) {
          // move current block ahead to keep arr sorted
          const placeAtIndex = getIndex(prev.endOffset);

          if (placeAtIndex !== i) {
            workingHighlights.splice(placeAtIndex, 0, curr);
            workingHighlights.splice(i, 1);
          }

          curr.startOffset = prev.endOffset;
          const addClass = curr.join || '';
          if (!addClass.includes('join-left')) {
            curr.join = addClass + ' join-left ';
          }
        } else {
          prev.endOffset = curr.startOffset;
          const newClass = prev.join || '';
          if (!newClass.includes('join-right')) {
            prev.join = newClass + ' join-right ';
          }
        }
      }
    }

    // no overlap, do nothing
    i++;
  }

  const isInOrder = (el, index, arr) => {
    const prev = arr[index - 1] || { startOffset: -1, endOffset: -1 };
    return (
      el.startOffset > prev.startOffset &&
      el.endOffset > prev.endOffset &&
      el.startOffset >= prev.endOffset
    );
  };

  if (workingHighlights.every(isInOrder)) return workingHighlights;

  return formatHighlights(workingHighlights);
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
        React.createElement(
          DynamicContent,
          { key: `key-${textIndex}-${item.priority}-${index}` },
          content
        )
      );
      textIndex = item.startOffset;
    }

    // highlighted word
    const addedClass = item.join || '';
    const className = 'highlight ' + addedClass;
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
        React.createElement(DynamicContent, { key: index + textIndex }, content)
      );
    }
  });

  return React.createElement(DynamicContent, {}, arrayOfChildren);
};
*/
//  ----------------------------------------------------------------------
// new utils
// -----------------------------------------------------------------------

export const createWords = string => {
  const validWords = [];

  const pattern = /\w+[-]*\w*|[.,?!;:'"()]+/gi;

  let matched = '';
  while ((matched = pattern.exec(string)) !== null) {
    //  This is necessary to avoid infinite loops with zero-width matches
    /*if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }*/

    validWords.push({
      word: matched[0],
      start: matched.index,
      end: matched.index + matched[0].length - 1
    });
  }

  return validWords;
};

const addJoiningClassesToHighlights = highlights => {
  highlights.forEach((highlight, highlightIndex) => {
    if (highlightIndex > 0) {
      // const prevHighlight = highlights[highlightIndex - 1];
      // if (hasOverlap(highlight, prevHighlight)) {
      //   if (secondIsInsideFirst(prevHighlight, highlight)) {
      //     if (!firstHasPriority(prevHighlight, highlight)) {
      //       console.log(
      //         prevHighlight.phrase +
      //           ' ' +
      //           highlight.phrase +
      //           ' => first needs a left join'
      //       );
      //     }
      //   } else {
      //     if (firstHasPriority(prevHighlight, highlight)) {
      //       console.log(
      //         prevHighlight.phrase +
      //           ' ' +
      //           highlight.phrase +
      //           ' => second needs a right join'
      //       );
      //     } else {
      //       console.log(
      //         prevHighlight.phrase +
      //           ' ' +
      //           highlight.phrase +
      //           ' => first needs a left join'
      //       );
      //     }
      //   }
      // }
    }
  });

  return highlights;
};

export const createHighlights = (words, highlights) => {
  const resultHighlights = [];

  highlights.forEach((highlight, highlightIndex) => {
    const color = highlight.color || 'none';

    highlight.phrases.forEach((phrase, phraseIndex) => {
      const pattern = `\\b${phrase}\\b`;
      const regex = new RegExp(pattern, 'gi');

      let found = regex.exec(words);

      while (found !== null) {
        resultHighlights.push({
          phrase,
          color,
          priority: highlightIndex,
          start: found.index,
          end: found.index + phrase.length - 1
        });

        found = regex.exec(words);
      }
    });
  });

  resultHighlights.sort((a, b) => a.start - b.start);

  return addJoiningClassesToHighlights(resultHighlights);
};

const hasOverlap = (block1, block2) => {
  const start = Math.max(block1.start, block2.start);
  const end = Math.min(block1.end, block2.end);

  return start < end;
};

const firstHasPriority = (first, second) => first.priority < second.priority;

const secondIsInsideFirst = (first, second) =>
  second.start >= first.start && second.end <= first.end;

const wordIsIncludedInPhrase = (highlight, word) =>
  highlight.start <= word.start && highlight.end >= word.end;

export const addClassesToWords = (words, highlights, hoveredIndex = null) => {
  const wordsWithClasses = JSON.parse(JSON.stringify(words));

  highlights.forEach((highlight, highlightIndex) => {
    wordsWithClasses.forEach((word, wordIndex) => {
      if (wordIsIncludedInPhrase(highlight, word)) {
        const hasClassesArray = word.classes;
        const hasHighlightIndex = word.highlightIndex;

        if (!hasClassesArray) {
          word.classes = [];
        }

        if (!hasHighlightIndex) {
          word.highlightIndex = [];
        }

        //  really color ?
        word.classes.push(highlight.color);

        if (highlightIndex === hoveredIndex) {
          word.classes.push('highlight-active');
        }

        word.highlightIndex.push(highlightIndex);
      }
    });
  });

  return wordsWithClasses;
};

export const createRenderableDom = (content, onMouseHover, onMouseOut) => {
  if (!Array.isArray(content)) return <span>nothing to display</span>;

  const spanArray = [];
  content.forEach(item => {
    if (!item.classes) {
      spanArray.push(<span key={item.start}>{item.word} </span>);
    } else {
      const names = item.classes.join(' ');
      const dataLabel = item.highlightIndex.join(' ');

      spanArray.push(
        <span
          key={item.start}
          className={'highlight ' + names}
          datahighlightindex={dataLabel}
          onMouseOver={onMouseHover}
          onMouseOut={onMouseOut}
        >
          {item.word}{' '}
        </span>
      );
    }
  });

  return spanArray;
};
