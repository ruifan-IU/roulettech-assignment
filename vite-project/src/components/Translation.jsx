import { useState, useEffect } from 'react';
import api from '../api';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Translation({ translation }) {
  const [user_name, setUser_name] = useState('');
  const [likes, setLikes] = useState(translation.likes.length);
  const [liked, setLiked] = useState(
    translation.likes.includes(parseInt(localStorage.getItem('user_id')))
  );

  const user_id = localStorage.getItem('user_id');

  function likeTranslation() {
    api
      .patch(`/api/translation/${translation.id}`, {
        likes: [...translation.likes, user_id],
      })
      .then((res) => {
        if (res.status === 200) {
          setLikes(likes + 1);
          setLiked(true);
        } else {
          alert('Failed to like translation');
        }
      })
      .catch((err) => alert(err));
  }

  function unlikeTranslation() {
    api
      .patch(`/api/translation/${translation.id}`, {
        likes: translation.likes.filter((id) => id !== user_id),
      })
      .then((res) => {
        if (res.status === 200) {
          setLikes(likes - 1);
          setLiked(false);
        } else {
          alert('Failed to unlike translation');
        }
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    api
      .get(`/api/user/${translation.author}`)
      .then((res) => res.data)
      .then((data) => {
        setUser_name(data.username);
      })
      .catch((err) => alert(err));
  }, [translation]);

  return (
    <div className='translation-container'>
      <p className='translation-content'>{translation.content}</p>
      <div className='translation-info'>
        <span className='translation-author'> -by {user_name} </span>
        <button
          onClick={liked ? unlikeTranslation : likeTranslation}
          className='like-button'
        >
          {liked ? (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: 'rgb(220 38 38)' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={farHeart}
              style={{ color: 'rgb(220 38 38)' }}
            />
          )}
        </button>
        <span className='translation-likes'>{likes}</span>
      </div>
    </div>
  );
}

export default Translation;
