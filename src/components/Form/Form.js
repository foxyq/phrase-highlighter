import React from 'react';

const Form = ({
  text,
  highlights,
  handleSubmit,
  onTextChange,
  onHighlightsChange
}) => {
  return (
    <form className='form'>
      <label htmlFor='text'>Sentence or a paragraph to be highlighted</label>
      <textarea
        name='text'
        cols='70'
        rows='3'
        value={text}
        onChange={onTextChange}
      />
      <br />
      <label htmlFor='text'>Colors: orange, green, blue, purple, grey</label>
      <textarea
        name='highlights'
        cols='70'
        rows='6'
        placeholder={highlights}
        onChange={onHighlightsChange}
      />
    </form>
  );
};

export default React.memo(Form);
