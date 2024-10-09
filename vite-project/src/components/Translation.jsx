import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Translation({ translation }) {
  const [user_name, setUser_name] = useState('');
  const likes = translation.likes.length;

  const user_id = parseInt(localStorage.getItem('user_id'));
  const liked = translation.likes.includes(user_id);

  const ownTranslation = translation.author === user_id;

  const queryClient = useQueryClient();

  const likeTranslation = async () => {
    const res = await api.patch(`/api/translation/${translation.id}`, {
      likes: [...translation.likes, user_id],
    });
    return res;
  };

  const likeMutation = useMutation({
    mutationFn: likeTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries(['translations', translation.paragraph]);
    },
  });

  const handleLike = () => {
    likeMutation.mutate();
  };

  const unlikeTranslation = async () => {
    const res = await api.patch(`/api/translation/${translation.id}`, {
      likes: translation.likes.filter((id) => id !== user_id),
    });
    return res;
  };

  const unlikeMutation = useMutation({
    mutationFn: unlikeTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries(['translations', translation.paragraph]);
    },
  });

  const handleUnlike = () => {
    unlikeMutation.mutate();
  };

  const deleteTranslation = () => {
    api.delete(`/api/translation/delete/${translation.id}`).then((res) => {
      if (res.status === 204) {
        setTranslations((prev) => {
          return prev.filter((t) => t.id !== translation.id);
        });
      } else {
        alert('Failed to delete translation');
      }
    });
  };

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
          onClick={liked ? handleUnlike : handleLike}
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
        {ownTranslation && (
          <button onClick={deleteTranslation} className='delete-button'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Translation;
