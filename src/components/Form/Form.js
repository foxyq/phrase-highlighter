import React from 'react';

export default function Form({ text, highlights, handleSubmit }) {
  const example = `[{startOffset: 4, endOffset: 31, color: '#d9f593', priority: 2}]`;
  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor='text'>Sentence or a paragraph to be highlighted</label>
      <br />
      <textarea name='text' cols='70' rows='3' placeholder={text} />
      <label htmlFor='highlights'>Array of highlights objects</label>
      <br />
      <textarea
        name='highlights'
        cols='70'
        rows='10'
        placeholder={highlights}
      />

      <pre name='example'>{example}</pre>
      <input type='submit' value='Submit' />
    </form>
  );
}
