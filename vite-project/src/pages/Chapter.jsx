import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Paragraph from '../components/Paragraph';

function Chapter() {
  const [paragraphs, setParagraphs] = useState([]);
  const { chapterId } = useParams();

  useEffect(() => {
    function getParagraphs() {
      //fetch chapter data from the server
      api.get(`/api/chapter/${chapterId}`).then((res) => {
        setParagraphs(res.data);
      });
    }
    getParagraphs();
  }, [chapterId]);

  return (
    <div>
      {/* <h1 className='chapter-title'>{chapterTitle}</h1> */}
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index} paragraph={paragraph} />
      ))}
    </div>
  );
}

export default Chapter;
