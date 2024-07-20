import { Link } from 'react-router-dom';
import '../styles/Note.css';

function Paragraph({ paragraph }) {
  return (
    <div className='paragraph-container'>
      <Link
        to={`/paragraph/${paragraph.id}/${paragraph.content}/translations`}
        className='link'
      >
        <p className='paragraph-content'>{paragraph.content}</p>
      </Link>
    </div>
  );
}

export default Paragraph;
