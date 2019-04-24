import React from 'react';
import DynamicContent from '../components/DynamicContent/';

const helper = require('./index.js');

describe('inputIsEmpty ', () => {
  it('returns true for null', () => {
    expect(helper.inputIsEmpty(null)).toBe(true);
  });
  it('returns true for empty string', () => {
    expect(helper.inputIsEmpty('')).toBe(true);
  });

  it('returns false for non empty string', () => {
    expect(helper.inputIsEmpty('stuff')).toBe(false);
  });

  it('returns false for a number', () => {
    expect(helper.inputIsEmpty(6)).toBe(false);
  });

  it('returns false for an object', () => {
    expect(helper.inputIsEmpty({})).toBe(false);
  });

  it('returns true for an empty array', () => {
    expect(helper.inputIsEmpty([])).toBe(true);
  });

  it('returns false for non empty array', () => {
    expect(helper.inputIsEmpty([1, 2])).toBe(false);
  });
});

describe('hasOverlap ', () => {
  const obj1 = { startOffset: 1, endOffset: 10 };
  const obj2 = { startOffset: 4, endOffset: 15 };
  const obj3 = { startOffset: 22, endOffset: 50 };
  const obj4 = { startOffset: 18, endOffset: 23 };

  it('returns coords for overlapping objects', () => {
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

describe('firstHasPriority ', () => {
  const obj1 = { priority: 1 };
  const obj2 = { priority: 5 };
  const obj4 = { priority: 'test' };
  const obj3 = { priority: -2 };

  it('returns true for 1 < 5', () => {
    expect(helper.firstHasPriority(obj1, obj2)).toBe(true);
  });

  it('returns false for 5 < 1', () => {
    expect(helper.firstHasPriority(obj2, obj1)).toBe(false);
  });

  it('returns false for 1 < 5', () => {
    expect(helper.firstHasPriority(obj1, obj2)).toBe(true);
  });

  it('returns true for -2 < 1', () => {
    expect(helper.firstHasPriority(obj3, obj1)).toBe(true);
  });

  it('returns false for comparing string vs number', () => {
    expect(helper.firstHasPriority(obj4, obj2)).toBe(false);
  });

  it('returns false for comparing number vs string', () => {
    expect(helper.firstHasPriority(obj2, obj4)).toBe(false);
  });
  it('returns false for comparing object vs string', () => {
    expect(helper.firstHasPriority({}, [])).toBe(false);
  });
});

describe('secondIsInsideFirst ', () => {
  const obj1 = { startOffset: 1, endOffset: 10 };
  const obj2 = { startOffset: 3, endOffset: 6 };
  const obj3 = { startOffset: 2, endOffset: 5 };
  const obj4 = { startOffset: 5, endOffset: 14 };

  it('returns true for included object', () => {
    expect(helper.secondIsInsideFirst(obj1, obj2)).toBe(true);
  });

  it('returns true for included obj 2 ', () => {
    expect(helper.secondIsInsideFirst(obj1, obj3)).toBe(true);
  });

  it('returns false for overlapping NOT included objects', () => {
    expect(helper.secondIsInsideFirst(obj1, obj4)).toBe(false);
  });

  it('returns false for overlapping NOT included objects 2', () => {
    expect(helper.secondIsInsideFirst(obj2, obj4)).toBe(false);
  });

  it('returns false for empty objects', () => {
    expect(helper.secondIsInsideFirst({}, {})).toBe(false);
  });

  it('returns false for wrong objects', () => {
    expect(helper.secondIsInsideFirst({ foo: 2 }, { bar: 9 })).toBe(false);
  });

  it('returns false for wrong types', () => {
    expect(helper.secondIsInsideFirst('test', '{ bar: 9 }')).toBe(false);
  });

  it('returns false for wrong types', () => {
    expect(helper.secondIsInsideFirst(56, [])).toBe(false);
  });
});

describe('formatHighlights ', () => {
  const h1 = [{ startOffset: 4, endOffset: 31, color: '#d9f593', priority: 2 }];

  const h2 = [
    { startOffset: 4, endOffset: 31, color: '#d9f593', priority: 2 },
    { startOffset: 10, endOffset: 20, color: 'red', priority: 1 }
  ];
  const res2 = [
    {
      startOffset: 4,
      endOffset: 10,
      color: '#d9f593',
      priority: 2,
      join: ' join-right '
    },
    {
      startOffset: 10,
      endOffset: 20,
      color: 'red',
      priority: 1
    },
    {
      startOffset: 20,
      endOffset: 31,
      color: '#d9f593',
      join: ' join-left ',
      priority: 2
    }
  ];

  const h3 = [
    { startOffset: 4, endOffset: 15, color: '#d9f593', priority: 2 },
    { startOffset: 10, endOffset: 20, color: 'red', priority: 3 }
  ];
  const res3 = [
    {
      startOffset: 4,
      endOffset: 15,
      color: '#d9f593',
      priority: 2
    },
    {
      startOffset: 15,
      endOffset: 20,
      color: 'red',
      priority: 3,
      join: ' join-left '
    }
  ];

  const h4 = [
    { startOffset: 4, endOffset: 25, color: '#d9f593', priority: 2 },
    { startOffset: 20, endOffset: 39, color: 'green', priority: 1 },
    { startOffset: 10, endOffset: 22, color: 'red', priority: 0 }
  ];
  const res4 = [
    {
      startOffset: 4,
      endOffset: 10,
      color: '#d9f593',
      priority: 2,
      join: ' join-right '
    },
    {
      startOffset: 10,
      endOffset: 22,
      color: 'red',
      priority: 0
    },
    {
      startOffset: 22,
      endOffset: 39,
      color: 'green',
      priority: 1,
      join: ' join-left '
    }
  ];

  const string =
    "[{ startOffset: 4, endOffset: 31, color:'#d9f593', priority: 2 }]";

  const insideCut = [
    { startOffset: 4, endOffset: 31, color: '#d9f593', priority: 2 },
    { startOffset: 15, endOffset: 25, color: 'red', priority: 4 }
  ];

  const cutSecond = [
    { startOffset: 4, endOffset: 20, color: '#d9f593', priority: 2 },
    { startOffset: 15, endOffset: 25, color: 'red', priority: 0 }
  ];

  const cutRes = [
    {
      startOffset: 4,
      endOffset: 15,
      color: '#d9f593',
      priority: 2,
      join: ' join-right '
    },
    {
      startOffset: 15,
      endOffset: 25,
      color: 'red',
      priority: 0
    }
  ];

  const recallFn = [
    {
      startOffset: 0,
      endOffset: 13,
      color: '#d9f593',
      priority: 2
    },
    {
      startOffset: 5,
      endOffset: 13,
      color: '#e8e8e8',
      priority: 1
    },
    {
      startOffset: 5,
      endOffset: 22,
      color: '#bfe6fc',
      priority: 2
    },

    {
      startOffset: 30,
      endOffset: 42,
      color: '#bfe6fc',
      priority: 4
    },
    {
      startOffset: 33,
      endOffset: 51,
      color: 'orange',
      priority: 2
    },
    {
      startOffset: 43,
      endOffset: 90,
      color: 'limegreen',
      priority: 1
    }
  ];

  const recallRes = [
    {
      startOffset: 0,
      endOffset: 5,
      color: '#d9f593',
      priority: 2,
      join: ' join-right '
    },
    { startOffset: 5, endOffset: 13, color: '#e8e8e8', priority: 1 },
    {
      startOffset: 13,
      endOffset: 22,
      color: '#bfe6fc',
      priority: 2,
      join: ' join-left '
    },
    {
      startOffset: 30,
      endOffset: 33,
      color: '#bfe6fc',
      priority: 4,
      join: ' join-right '
    },
    {
      startOffset: 33,
      endOffset: 43,
      color: 'orange',
      priority: 2,
      join: ' join-right '
    },
    { startOffset: 43, endOffset: 90, color: 'limegreen', priority: 1 }
  ];

  it('returns an empty array for wrong type', () => {
    expect(helper.formatHighlights('string')).toEqual([]);
    expect(helper.formatHighlights(9)).toEqual([]);
    expect(helper.formatHighlights(9.123)).toEqual([]);
    expect(helper.formatHighlights({})).toEqual([]);
  });

  it('returns the same array with 1 object', () => {
    expect(helper.formatHighlights(h1)).toEqual(h1);
  });

  it('splits one object into two', () => {
    expect(helper.formatHighlights(h2)).toEqual(res2);
  });

  it('splits one object into two2', () => {
    expect(helper.formatHighlights(h3)).toEqual(res3);
  });

  // it('splits one object into two3', () => {
  //   expect(helper.formatHighlights(h4)).toEqual(res4);
  // });

  it('takes input string and returns object', () => {
    expect(helper.formatHighlights(string)).toEqual(h1);
  });

  it('ignores enclosed object with lower priority', () => {
    expect(helper.formatHighlights(insideCut)).toEqual(h1);
  });

  it('ignores enclosed object with lower priority', () => {
    expect(helper.formatHighlights(cutSecond)).toEqual(cutRes);
  });

  it('re-calls function to finish formatting', () => {
    expect(helper.formatHighlights(recallFn)).toEqual(recallRes);
  });
});

describe('createHighlightedElements', () => {
  const styleObj = {
    backgroundColor: '#d9f593',
    zIndex: 100
  };

  const createChildren1 = () => {
    children.push(
      React.createElement(DynamicContent, { key: `key-0-0-0` }, 'You ')
    );

    children.push(
      React.createElement(
        'span',
        { key: 4, className: 'highlight ', style: styleObj },
        'will deliver new'
      )
    );

    children.push(
      React.createElement(
        DynamicContent,
        { key: 20 },
        ' technology with an adorable puppy. Perfect!'
      )
    );
  };

  const createChildren2 = () => {
    children2.push(
      React.createElement(DynamicContent, { key: 'key-0-0-0' }, '')
    );

    children2.push(
      React.createElement(
        'span',
        { key: 0, className: 'highlight ', style: styleObj },
        'You will deliver new'
      )
    );
    children2.push(
      React.createElement(DynamicContent, { key: 'key-20-0-1' }, ' tech')
    );
    children2.push(
      React.createElement(
        'span',
        { key: 25, className: 'highlight ', style: styleObj },
        'nolog'
      )
    );
    children2.push(
      React.createElement(
        DynamicContent,
        { key: 31 },
        'y with an adorable puppy. Perfect!'
      )
    );
  };

  const text =
    'You will deliver new technology with an adorable puppy. Perfect!';

  const oneHighlight = [
    {
      startOffset: 4,
      endOffset: 20,
      color: '#d9f593',
      priority: 0
    }
  ];

  const children = [];
  createChildren1();

  const resComponent = React.createElement(DynamicContent, {}, children);

  const twoHighlights = [
    {
      startOffset: 0,
      endOffset: 20,
      color: '#d9f593',
      priority: 0
    },
    {
      startOffset: 25,
      endOffset: 30,
      color: '#d9f593',
      priority: 0
    }
  ];

  const children2 = [];
  createChildren2();

  const resComponent2 = React.createElement(DynamicContent, {}, children2);

  it('empty highlights returns div with text', () => {
    expect(helper.createHighlightedElements('', text)).toEqual(
      <div>{text}</div>
    );
  });

  it('returns three correct children with one highlight in the middle of text', () => {
    expect(helper.createHighlightedElements(oneHighlight, text)).toEqual(
      resComponent
    );
  });

  it('returns correct children with two highlights', () => {
    expect(helper.createHighlightedElements(twoHighlights, text)).toEqual(
      resComponent2
    );
  });
});
