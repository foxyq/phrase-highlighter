import React from 'react';

const helper = require('./index.js');

describe('hasOverlap ', () => {
  const obj1 = { start: 1, end: 10 };
  const obj2 = { start: 4, end: 15 };
  const obj3 = { start: 22, end: 50 };
  const obj4 = { start: 18, end: 23 };

  it('returns true for overlapping objects', () => {
    expect(helper.hasOverlap(obj1, obj2)).toEqual(true);
  });

  it('returns null for NON-overlapping objects', () => {
    expect(helper.hasOverlap(obj1, obj3)).toEqual(false);
  });
  it('returns coords for overlapping objects', () => {
    expect(helper.hasOverlap(obj4, obj3)).toEqual(true);
  });

  it('returns coords of object for the same object', () => {
    expect(helper.hasOverlap(obj4, obj4)).toEqual(true);
  });

  it('returns false non objects', () => {
    expect(helper.hasOverlap(1, 2)).toEqual(false);
  });
  it('returns false non objects', () => {
    expect(helper.hasOverlap('string', 'anotherOne')).toEqual(false);
  });
  it('returns false non objects', () => {
    expect(helper.hasOverlap('test', 2)).toEqual(false);
  });

  it('returns false incomplete objects', () => {
    expect(helper.hasOverlap({}, { startOffset: 4 })).toEqual(false);
  });

  it('returns false incomplete objects', () => {
    expect(helper.hasOverlap({}, { startOffset: 4, endOffset: 10 })).toEqual(
      false
    );
  });
  it('returns false incomplete objects', () => {
    expect(helper.hasOverlap({ startOffset: 5 }, { startOffset: 4 })).toEqual(
      false
    );
  });
  it('returns false incomplete objects', () => {
    expect(
      helper.hasOverlap({ startOffset: 2, endOffset: 6 }, { startOffset: 4 })
    ).toEqual(false);
  });
});

describe('isHighlightsInputValid ', () => {
  it('returns false for non-array parameter', () => {
    expect(helper.isHighlightsInputValid(9)).toEqual(false);
    expect(helper.isHighlightsInputValid('string')).toEqual(false);
    expect(helper.isHighlightsInputValid({})).toEqual(false);
    expect(helper.isHighlightsInputValid(() => {})).toEqual(false);
  });

  it('returns false for non-complete highlights array / not specs-described array', () => {
    const testArr = [
      [1],
      [{ color: 1 }],
      [{ color: 'green' }],
      [{ color: 'blue', phrases: 'say what' }],
      [{ color: 'blue', phrases: [1, 2, 3] }]
    ];

    testArr.forEach(test => {
      expect(helper.isHighlightsInputValid(test)).toEqual(false);
    });
  });

  it('returns true for empty and valid array ', () => {
    const validArr = [{ color: 'orange', phrases: ['one two', 'yeah yeah'] }];
    expect(helper.isHighlightsInputValid(validArr)).toEqual(true);
  });
});

describe('arrayFromHighlightsInput ', () => {
  it('returns null for invalid input', () => {
    const arrInputs = ['abc', '[]', '{foo: "bar"'];

    arrInputs.forEach(input => {
      expect(helper.arrayFromHighlightsInput(input)).toEqual(null);
    });
  });

  it('returns [] for object ', () => {
    expect(helper.arrayFromHighlightsInput({})).toEqual([]);
  });

  it('returns array valid inputs ', () => {
    const input = '[ "foo", 42, "bar"]';
    const res = ['foo', 42, 'bar'];

    expect(helper.arrayFromHighlightsInput(input)).toEqual(res);
  });
});

describe('hideNeighboringPhrases ', () => {
  it('returns correct highlights to hide', () => {
    const highlights = [
      { start: 2, end: 15 },
      { start: 5, end: 20 },
      { start: 12, end: 35 },
      { start: 25, end: 35 }
    ];

    const toHide = highlights.filter((val, i) => ![3, 1].includes(i));

    expect(helper.hideNeighboringPhrases(highlights, 1)).toEqual(toHide);
  });

  it('returns null when not provided highlight index', () => {
    expect(helper.hideNeighboringPhrases([])).toEqual(null);
  });
});

describe('setWordClasses', () => {
  it('reaches all branches', () => {
    expect(
      helper.setWordClasses({}, { classes: [], hide: true }, 1, 1)
    ).toEqual(undefined);
  });

  it('works without highlight index', () => {
    expect(helper.setWordClasses({}, { classes: [], hide: true }, 1)).toEqual(
      undefined
    );
  });
});

describe('createHighlights', () => {
  it('reaches branch hideNeighboringPhrases', () => {
    expect(helper.createHighlights([], [], 1)).toEqual([]);
  });

  it('works without hoveredIndex', () => {
    expect(helper.createHighlights([], [])).toEqual([]);
  });
});

describe('addClassesToWords', () => {
  const highlights = [
    { color: 'blue', start: 0, end: 10 },
    { color: 'green', start: 5, end: 20 }
  ];
  const words = [{ start: 2, end: 5 }, { start: 8, end: 15 }];
  const res1 = [
    { start: 2, end: 5, classes: ['blue'], highlightIndex: [0] },
    {
      start: 8,
      end: 15,
      classes: ['green'],
      highlightIndex: [1]
    }
  ];
  const res2 = [
    { start: 2, end: 5, classes: ['blue'], highlightIndex: [0] },
    {
      start: 8,
      end: 15,
      classes: ['green', 'green-active'],
      highlightIndex: [1]
    }
  ];

  it('adds correct classes', () => {
    expect(helper.addClassesToWords(words, highlights)).toEqual(res1);
  });

  it('calls addRoundBorders with hoveredIndex and returns correct output', () => {
    expect(helper.addClassesToWords(words, highlights, 1)).toEqual(res2);
  });
});

describe('createRenderableDom ', () => {
  const fallback = <span>nothing to display</span>;

  it('returns a fallback with incorrect input', () => {
    expect(helper.createRenderableDom('123', () => {}, () => {})).toEqual(
      fallback
    );
  });
});
