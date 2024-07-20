import React from 'react';
import { Link } from 'react-router-dom';

function Chapter({ chapter, selectedChapter, setSelectedChapter }) {
  //const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');
  return (
    <div
      className={
        selectedChapter === chapter.id
          ? 'chapter-container_activated'
          : 'chapter-container'
      }
    >
      <Link
        to={`/chapter/${chapter.id}/${chapter.title}`}
        onClick={() => setSelectedChapter(chapter.id)}
        className='link'
      >
        <p className='chapter-title'>{chapter.title}</p>
      </Link>
    </div>
  );
}

export default Chapter;
