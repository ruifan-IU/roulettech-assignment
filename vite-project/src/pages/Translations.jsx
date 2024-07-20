import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Translation from '../components/Translation';

function Translations() {
  const [translations, setTranslations] = useState([]);
  const [content, setContent] = useState('');
  const { paragraphId, paragraphContent } = useParams();

  useEffect(() => {
    //fetch translations data from the server
    getTranslationList();
  }, [paragraphId]);

  function getTranslationList() {
    api.get(`/api/paragraph/${paragraphId}`).then((res) => {
      setTranslations(res.data);
      console.log(res.data);
    });
  }

  function createTranslation(e) {
    e.preventDefault();
    api
      .post(`/api/paragraph/${paragraphId}`, {
        content,
        paragraph: paragraphId,
      })
      .then((res) => {
        if (res.status === 201) {
          alert('Translation created successfully');
          getTranslationList();
        } else {
          alert('Failed to create translation');
        }
      });
    setContent('');
  }

  return (
    <div>
      <div className='paragraph-container original-text'>
        <p>{paragraphContent}</p>
      </div>
      {translations
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((translation, index) => (
          <Translation key={index} translation={translation} />
        ))}
      <form onSubmit={createTranslation} className='create-translation'>
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
    </div>
  );
}

export default Translations;
