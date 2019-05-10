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
        'do not want',
        'new'
      ]
    },
    {
      color: 'green',
      phrases: ['adorable', 'creative', 'our candidates', 'will deliver new']
    },
    {
      color: 'blue',
      phrases: ['an adorable puppy', 'aggressive', 'arm', 'very unlikely']
    },
    {
      color: 'purple',
      phrases: ['do not cross', 'log file', 'our team', 'radio', 'test']
    },
    {
      color: 'grey',
      phrases: [
        'very unlikely to leave',
        'new technology',
        'text',
        'another test'
      ]
    }
  ],
  highlightedIndex: null,
  toDisplay: ''
};
/*
const initState2 = {
  text: 'We expect our candidates to be action-oriented, an adorable puppy',
  highlights: [
    { color: 'orange', phrases: ['be action-oriented'] },
    { color: 'green', phrases: ['to be'] },
    { color: 'blue', phrases: ['candidates to be action-oriented'] },
    {
      color: 'purple',
      phrases: ['expect our candidates to be action-oriented']
    }
  ]
};
*/
export default initState;
