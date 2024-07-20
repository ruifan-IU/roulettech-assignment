import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar({ setSelectedChapter }) {
  const user_name = localStorage.getItem('user_name');

  const navigate = useNavigate();

  function handleBackHome() {
    setSelectedChapter(null);
    navigate('/');
  }

  return (
    <>
      <nav>
        <button onClick={handleBackHome}>Translation Hub</button>
        <ul>
          <li>
            <p>Welcome, {user_name}</p>
          </li>
          <li>
            <button onClick={() => navigate('/logout')}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
