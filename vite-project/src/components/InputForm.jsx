import { useState } from 'react';

function InputForm({ createTranslation }) {
  const [content, setContent] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    createTranslation(content);
    setContent('');
  }

  return (
    <form onSubmit={onSubmit} className='create-translation'>
      <textarea
        id='content'
        name='content'
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='create-translation_textarea'
      ></textarea>
      <br />
      <input
        type='submit'
        value='Create Translation'
        className='create-translation_input'
      ></input>
    </form>
  );
}

export default InputForm;
