import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import Translation from '../components/Translation';
import InputForm from '../components/InputForm';

function Translations() {
  const { paragraphId, paragraphContent } = useParams();

  const getTranslationList = async () => {
    try {
      const res = await api.get(`/api/paragraph/${paragraphId}`);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  const {
    // isLoading,
    // error,
    data: translations,
  } = useQuery({
    queryKey: ['translations', paragraphId],
    queryFn: getTranslationList,
  });

  const createTranslation = async (content) => {
    const res = await api.post(`/api/paragraph/${paragraphId}`, {
      content,
      paragraph: paragraphId,
    });
    return res;
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='translation-page'>
      <div className='display-translations'>
        <div className='paragraph-container original-text'>
          <p>{paragraphContent}</p>
        </div>
        {translations &&
          translations
            .sort((a, b) => b.likes.length - a.likes.length)
            .map((translation, index) => (
              <Translation key={index} translation={translation} />
            ))}
      </div>
      <InputForm createTranslation={createTranslation} />
    </div>
  );
}

export default Translations;
