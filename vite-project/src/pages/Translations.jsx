import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import Translation from '../components/Translation';
import InputForm from '../components/InputForm';

function Translations() {
  // const [translations, setTranslations] = useState([]);
  const { paragraphId, paragraphContent } = useParams();

  // useEffect(() => {
  //   getTranslationList();
  // }, []);

  // function getTranslationList() {
  //   api.get(`/api/paragraph/${paragraphId}`).then((res) => {
  //     setTranslations(res.data);
  //   });
  // }

  const getTranslationList = async () => {
    try {
      const res = await api.get(`/api/paragraph/${paragraphId}`);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  const {
    isLoading,
    error,
    data: translations,
  } = useQuery({
    queryKey: ['translations', paragraphId],
    queryFn: getTranslationList,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // function createTranslation(content) {
  //   api
  //     .post(`/api/paragraph/${paragraphId}`, {
  //       content,
  //       paragraph: paragraphId,
  //     })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         alert('Translation created successfully');
  //         getTranslationList();
  //       } else {
  //         alert('Failed to create translation');
  //       }
  //     });
  // }

  return (
    <div className='translation-page'>
      <div className='display-translations'>
        <div className='paragraph-container original-text'>
          <p>{paragraphContent}</p>
        </div>
        {translations
          .sort((a, b) => b.likes.length - a.likes.length)
          .map((translation, index) => (
            <Translation
              key={index}
              translation={translation}
              // setTranslations={setTranslations}
            />
          ))}
      </div>
      {/* <InputForm createTranslation={createTranslation} /> */}
    </div>
  );
}

export default Translations;
