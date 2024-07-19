import { useState, useEffect } from 'react';
import api from '../api';
import Chapter from '../components/Chapter';
import '../styles/Home.css';

function Home() {
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

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note deleted successfully');
          getChapterList();
        } else {
          alert('Failed to delete note');
        }
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post('/api/home/', { title }).then((res) => {
      if (res.status === 201) {
        alert('Note created successfully');
        getChapterList();
      } else {
        alert('Failed to create note');
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Chapters</h2>
        {chapterList.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}
      </div>
      {/* <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title: </label>
        <br />
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Title'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor='content'>Content: </label>
        <br />
        <textarea
          id='content'
          name='content'
          placeholder='Content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type='submit' value='Create Note'></input>
      </form> */}
    </div>
  );
}

export default Home;
