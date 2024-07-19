import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';

function Chapter({ chapter }) {
  //const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');
  return (
    <div className='note-container'>
      <Link to={`/chapter/${chapter.id}/${chapter.title}`}>
        <p className='note-title'>{chapter.title}</p>
      </Link>

      {/* <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formattedDate}</p> */}
      {/* <button onClick={() => onDelete(note.id)}>Delete</button> */}
    </div>
  );
}

export default Chapter;
