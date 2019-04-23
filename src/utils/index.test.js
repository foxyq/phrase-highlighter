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
      join: ' join-right'
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
      join: ' join-left',
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
      join: ' join-left'
    }
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
});
