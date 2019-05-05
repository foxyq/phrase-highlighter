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
  highlightedIndex: 3,
  toDisplay: ''
};

export default initState;
