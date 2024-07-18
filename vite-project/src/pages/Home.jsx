import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css';

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
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note deleted successfully');
          getNote();
        } else {
          alert('Failed to delete note');
        }
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post('/api/notes/', { title, content }).then((res) => {
      if (res.status === 201) {
        alert('Note created successfully');
        getNote();
      } else {
        alert('Failed to create note');
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create a Note</h2>
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
      </form>
    </div>
  );
}

export default Home;
