import { useState, useEffect } from 'react';
import api from '../api';
import Chapter from '../components/Chapter';
import '../styles/Home.css';

function ChapterList() {
  const [chapterList, setChapterList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getChapterList();
  }, []);

  const getChapterList = () => {
    api
      .get('/api/home/')
      .then((res) => res.data)
      .then((data) => {
        setChapterList(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Chapters</h2>
      {chapterList.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
}

export default ChapterList;
