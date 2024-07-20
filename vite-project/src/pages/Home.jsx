import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import api from '../api';
import NavBar from '../components/NavBar';
import Chapter from '../components/Chapter';

function Home() {
  const [chapterList, setChapterList] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

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
      <NavBar setSelectedChapter={setSelectedChapter} />
      <div className='display'>
        <div className='display-chapters'>
          {chapterList.map((chapter) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
            />
          ))}
        </div>
        <div className='display-paragraphs'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
