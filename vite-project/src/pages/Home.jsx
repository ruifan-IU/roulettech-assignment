import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import api from '../api';
import NavBar from '../components/NavBar';
import Chapter from '../components/Chapter';
import LoadingIndicator from '../components/LoadingIndicator';
import { useQuery } from '@tanstack/react-query';

function Home() {
  // const [chapterList, setChapterList] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // useEffect(() => {
  //   getChapterList();
  // }, []);

  const getChapterList = async () => {
    try {
      const res = await api.get('/api/home/');
      const data = res.data;
      // setChapterList(data);
      return data;
    } catch (err) {
      alert(err);
    }
  };

  const {
    isLoading,
    error,
    data: chapters,
  } = useQuery({
    queryKey: ['chapters'],
    queryFn: getChapterList,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <NavBar setSelectedChapter={setSelectedChapter} />
      <div className='display'>
        <div className='display-chapters'>
          {chapters.map((chapter) => (
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
