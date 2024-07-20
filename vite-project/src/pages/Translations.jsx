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
    console.log('submitted');
  }

  return (
    <div>
      <div className='paragraph-container'>
        <p>{paragraphContent}</p>
      </div>
      {translations.map((translation, index) => (
        <Translation key={index} translation={translation} />
      ))}
      <form onSubmit={createTranslation} className='create-translation'>
        <textarea
          id='content'
          name='content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type='submit' value='Create Translation'></input>
      </form>
    </div>
  );
}

export default Translations;
