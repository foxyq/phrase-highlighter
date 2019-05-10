import React from 'react';

const parseStringData = require('parse-string-data');

/* --------------
Helper functions
--------------- */

export const hasOverlap = (block1, block2) => {
  const start = Math.max(block1.start, block2.start);
  const end = Math.min(block1.end, block2.end);

  return start < end;
};

const wordIsIncludedInPhrase = (highlight, word) =>
  highlight.start <= word.start && highlight.end >= word.end;

export const arrayFromHighlightsInput = input => {
  if (typeof input === 'object') return [];
  const preppedText = input.replace(/(\r\n|\n|\r)/gm, '').replace(/'|"/g, '');
  const wannabeArray = parseStringData(preppedText);

  return wannabeArray;
};

export const isHighlightsInputValid = highlights => {
  if (!Array.isArray(highlights)) return false;

  for (let highlight of highlights) {
    if (!highlight.hasOwnProperty('color')) {
      return false;
    }

    if (typeof highlight.color !== 'string') {
      return false;
    }

    if (!highlight.hasOwnProperty('phrases')) {
      return false;
    }

    if (!Array.isArray(highlight.phrases)) {
      return false;
    }

    for (let phrase of highlight.phrases) {
      if (typeof phrase !== 'string') {
        return false;
      }
    }
  }

  return true;
};

export const hideNeighboringPhrases = (highlights, hoveredIndex = null) => {
  if (hoveredIndex === null) return hoveredIndex;

  const hoveredBlock = highlights[hoveredIndex];

  const neighbors = highlights.filter(
    (block, index) => hasOverlap(block, hoveredBlock) && index !== hoveredIndex
  );

  neighbors.forEach(block => (block.hide = true));

  return neighbors;
};

const addRoundBorders = (phrase, word, isHighlighted = false) => {
  const active = isHighlighted ? '-active' : '';

  if (word.start === phrase.start) {
    const addClass = `${phrase.color}${active}-round-left`;
    word.classes.push(addClass);
  }

  if (word.end === phrase.end) {
    const addClass = `${phrase.color}${active}-round-right`;
    word.classes.push(addClass);
  }
};

export const setWordClasses = (
  word,
  highlight,
  highlightIndex,
  hoveredIndex = null
) => {
  const hasClassesArray = word.classes;
  const hasHighlightIndex = word.highlightIndex;

  if (!hasClassesArray) {
    word.classes = [];
  }

  if (!hasHighlightIndex) {
    word.highlightIndex = [];
  }

  word.classes.push(highlight.color);

  if (highlight.classes) {
    word.classes = word.classes.concat(highlight.classes);
  }

  if (highlight.hide) {
    word.classes.push('transparent-background');
  }

  if (highlightIndex === hoveredIndex) {
    word.classes.push(`${highlight.color}-active`);
  }

  word.highlightIndex.push(highlightIndex);
};

/* ----------------------------
Main parsing and creating DOM 
--------------------------- */

export const createWords = string => {
  const validWords = [];
  const pattern = /\w+[-]*\w*|[.,?!;:'"()]+/gi;
  let matched = '';

  while ((matched = pattern.exec(string)) !== null) {
    validWords.push({
      word: matched[0],
      start: matched.index,
      end: matched.index + matched[0].length - 1
    });
  }

  return validWords;
};

export const createHighlights = (words, highlights, hoveredIndex = null) => {
  const resultHighlights = [];

  highlights.forEach((highlight, highlightIndex) => {
    highlight.phrases.forEach((phrase, phraseIndex) => {
      const pattern = `\\b${phrase}\\b`;
      const regex = new RegExp(pattern, 'gi');

      let found = regex.exec(words);
      const color = highlight.color;

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

  // possibly hide neighboring phrases
  if (hoveredIndex !== null) {
    hideNeighboringPhrases(resultHighlights, hoveredIndex);
  }

  return resultHighlights;
};

export const addClassesToWords = (words, highlights, hoveredIndex = null) => {
  const wordsWithClasses = JSON.parse(JSON.stringify(words));

  highlights.forEach((highlight, highlightIndex) => {
    wordsWithClasses.forEach((word, wordIndex) => {
      if (wordIsIncludedInPhrase(highlight, word)) {
        setWordClasses(word, highlight, highlightIndex, hoveredIndex);
        addRoundBorders(highlight, word);

        // rewrite round borders for highlighted phrase
        if (hoveredIndex !== null) {
          addRoundBorders(highlights[hoveredIndex], word, true);
        }
      }
    });
  });

  return wordsWithClasses;
};

export const createRenderableDom = (content, onMouseHover, onMouseOut) => {
  if (!Array.isArray(content)) return <span>nothing to display</span>;

  const elementArray = [];

  content.forEach(word => {
    if (!word.classes) {
      elementArray.push(
        <React.Fragment key={word.start}>{word.word} </React.Fragment>
      );
    } else {
      const classNames = word.classes.join(' ');
      const dataLabel = word.highlightIndex.join(' ');

      elementArray.push(
        <span
          key={word.start}
          className={'highlight ' + classNames}
          datahighlightindex={dataLabel}
          onMouseOver={onMouseHover}
          onMouseOut={onMouseOut}
        >
          {word.word + ' '}
        </span>
      );
    }
  });

  return elementArray;
};
