import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError, setLoading } from '../../app/store/slices/authSlice';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    // For demo purposes, simulate an API call
    setTimeout(() => {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === formData.email);

      if (user && user.password === formData.password) {
        // Successful login
        dispatch(
          login({
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );
        onClose();
      } else {
        // Failed login
        dispatch(setError('Invalid email or password'));
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-[#FCDF5A]'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='w-full px-3 py-2 border focus:border-none border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FCDF5A]'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-[#FCDF5A] text-black py-2 px-4 rounded hover:bg-[#e2c028] focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] disabled:opacity-50'
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
