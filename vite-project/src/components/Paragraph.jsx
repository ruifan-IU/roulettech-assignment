import { Link } from 'react-router-dom';
import '../styles/Note.css';

function Paragraph({ paragraph }) {
  return (
    <div className='note-container'>
      <Link to={`/paragraph/${paragraph.id}/${paragraph.content}/translations`}>
        <p className='note-title'>{paragraph.content}</p>
      </Link>
    </div>
  );
}

export default Paragraph;
