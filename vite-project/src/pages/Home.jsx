import { useState, useEffect } from 'react';
import api from '../api';

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      });
  };

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
