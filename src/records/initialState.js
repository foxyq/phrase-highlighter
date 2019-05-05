const initState = {
  text:
    'We expect our candidates to be action-oriented, an adorable puppy, and have creative ideas for our team. They will deliver new technology and their creativity will be very unlikely to leave.',

  highlights: [
    {
      color: 'orange',
      phrases: [
        'action-oriented',
        'alarming',
        'candidates',
        'leave',
        'do not want'
      ]
    },
    {
      color: 'green',
      phrases: ['adorable', 'creative', 'love', 'will deliver new']
    },
    {
      color: 'blue',
      phrases: ['an adorable puppy', 'aggressive', 'arm', 'very unlikely']
    },
    {
      color: 'purple',
      phrases: ['do not cross', 'log file', 'our team', 'radio']
    },
    { color: 'grey', phrases: ['very unlikely to leave', 'new technology'] }
  ],

  toDisplay: ''
};

//// various states for quick demo purposes
/*
const initState2 = {
  text: 'You will deliver new technology with an adorable puppy. Perfect!',
  highlights: [
    {
      startOffset: 0,
      endOffset: 31,
      color: '#d9f593',
      priority: 3
    },
    {
      startOffset: 4,
      endOffset: 25,
      color: '#e8e8e8',
      priority: 2
    },
    {
      startOffset: 9,
      endOffset: 20,
      color: '#bfe6fc',
      priority: 1
    },
    {
      startOffset: 32,
      endOffset: 48,
      color: '#d9f593',
      priority: 3
    },
    {
      startOffset: 40,
      endOffset: 55,
      color: '#e8e8e8',
      priority: 2
    },
    {
      startOffset: 49,
      endOffset: 70,
      color: '#bfe6fc',
      priority: 1
    }
  ],

  toDisplay: ''
};

const initState3 = {
  text: "A new testing sentence, woah! Who would've expected that?",
  highlights: [
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
  ],

  toDisplay: ''
};

const initState4 = {
  text: "A new testing sentence, woah! Who would've expected that?",
  highlights: [
    {
      startOffset: 0,
      endOffset: 50,
      color: '#d9f593',
      priority: 5
    },
    {
      startOffset: 5,
      endOffset: 45,
      color: '#e8e8e8',
      priority: 4
    },
    {
      startOffset: 10,
      endOffset: 40,
      color: '#bfe6fc',
      priority: 3
    },

    {
      startOffset: 15,
      endOffset: 35,
      color: 'yellow',
      priority: 2
    },
    {
      startOffset: 20,
      endOffset: 30,
      color: 'crimson',
      priority: 1
    }
  ],

  toDisplay: ''
};

const initState5 = {
  text: "A new testing sentence, woah! Who would've expected that?",
  highlights: [
    {
      startOffset: 0,
      endOffset: 51,
      color: '#d9f593',
      priority: 5
    },
    {
      startOffset: 5,
      endOffset: 51,
      color: '#e8e8e8',
      priority: 4
    },
    {
      startOffset: 10,
      endOffset: 51,
      color: '#bfe6fc',
      priority: 3
    },

    {
      startOffset: 15,
      endOffset: 51,
      color: 'yellow',
      priority: 2
    },
    {
      startOffset: 20,
      endOffset: 51,
      color: 'crimson',
      priority: 1
    }
  ],

  toDisplay: ''
};

const initState6 = {
  text: "A new testing sentence, woah! Who would've expected that?",
  highlights: [
    { startOffset: 2, endOffset: 40, color: '#d9f593', priority: 2 },

    { startOffset: 15, endOffset: 29, color: 'red', priority: 1 },
    { startOffset: 6, endOffset: 22, color: 'aliceblue', priority: 0 }
  ],
  toDisplay: ''
};

const initState7 = {
  text:
    'test sentence to be highlighted or another paragraph to be highlighted',
  highlights: [
    { startOffset: 0, endOffset: 13, color: 'aliceblue', priority: 3 },
    { startOffset: 4, endOffset: 31, color: '#d9f593', priority: 4 },
    { startOffset: 20, endOffset: 40, color: 'yellow', priority: 2 },
    { startOffset: 31, endOffset: 52, color: 'crimson', priority: 2 }
  ],
  toDisplay: ''
};
*/
export default initState;
