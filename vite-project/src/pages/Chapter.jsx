import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import Paragraph from '../components/Paragraph';

function Chapter() {
  const { chapterId } = useParams();

  const getParagraphs = async () => {
    //fetch chapter data from the server
    try {
      const res = await api.get(`/api/chapter/${chapterId}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  const {
    isLoading,
    error,
    data: paragraphs,
  } = useQuery({
    queryKey: ['paragraphs', chapterId],
    queryFn: getParagraphs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index} paragraph={paragraph} />
      ))}
    </div>
  );
}

export default Chapter;
