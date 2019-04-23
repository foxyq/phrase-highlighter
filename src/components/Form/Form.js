import React from 'react';
import example from '../../records/exampleHighlights';

export default function Form({ text, highlights, handleSubmit }) {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor='text'>Sentence or a paragraph to be highlighted</label>
      <br />
      <textarea name='text' cols='70' rows='3' placeholder={text} />
      <label htmlFor='highlights'>Array of highlighted objects</label>
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
