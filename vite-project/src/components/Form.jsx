import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';

function Form({ type }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const method = type === 'login' ? 'Login' : 'Register';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post(`/api/${type}/`, formData);

      if (type === 'login') {
        console.log(response.data);
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1>{method}</h1>
      <input
        className='form-input'
        type='text'
        name='username'
        placeholder='Username'
        onChange={handleChange}
      />
      <input
        className='form-input'
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
      />
      <button className='form-button' type='submit'>
        {method}
      </button>
    </form>
  );
}

export default Form;
