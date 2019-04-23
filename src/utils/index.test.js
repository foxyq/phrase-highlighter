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
    expect(helper.inputIsEmpty([])).toBe(false);
    expect(helper.inputIsEmpty({})).toBe(false);
  });
});

describe('overlapCoords ', () => {
  const obj1 = { startOffset: 1, endOffset: 10 };
  const obj2 = { startOffset: 4, endOffset: 15 };
  const obj3 = { startOffset: 22, endOffset: 50 };
  const obj4 = { startOffset: 18, endOffset: 23 };
  const res1 = [4, 10];

  it('returns coords for overlapping objects', () => {
    expect(helper.overlapCoords(obj1, obj2)).toEqual(res1);
  });

  it('returns null for NON-overlapping objects', () => {
    expect(helper.overlapCoords(obj1, obj3)).toEqual(null);
  });
  it('returns coords for overlapping objects', () => {
    expect(helper.overlapCoords(obj4, obj3)).toEqual([22, 23]);
  });

  it('returns coords of object for the same object', () => {
    expect(helper.overlapCoords(obj4, obj4)).toEqual([
      obj4.startOffset,
      obj4.endOffset
    ]);
  });

  it('returns null non objects', () => {
    expect(helper.overlapCoords(1, 2)).toEqual(null);
  });
  it('returns null non objects', () => {
    expect(helper.overlapCoords('string', 'anotherOne')).toEqual(null);
  });
  it('returns null non objects', () => {
    expect(helper.overlapCoords('test', 2)).toEqual(null);
  });

  it('returns null incomplete objects', () => {
    expect(helper.overlapCoords({}, { startOffset: 4 })).toEqual(null);
  });

  it('returns null incomplete objects', () => {
    expect(helper.overlapCoords({}, { startOffset: 4, endOffset: 10 })).toEqual(
      null
    );
  });
  it('returns null incomplete objects', () => {
    expect(
      helper.overlapCoords({ startOffset: 5 }, { startOffset: 4 })
    ).toEqual(null);
  });
  it('returns null incomplete objects', () => {
    expect(
      helper.overlapCoords({ startOffset: 2, endOffset: 6 }, { startOffset: 4 })
    ).toEqual(null);
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
