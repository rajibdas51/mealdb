import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  setError,
  setLoading,
} from '../../app/store/slices/authSlice';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));

    setTimeout(() => {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user) => user.email === formData.email);

      if (userExists) {
        dispatch(setError('User with this email already exists'));
        return;
      }

      // Add new user to localStorage
      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      localStorage.setItem('users', JSON.stringify([...users, newUser]));

      const userForState = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      dispatch(register(userForState));
      onClose();
    }, 1000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='name'
        >
          Full Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] focus:border-none ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
        )}
      </div>

      <div className='mb-3'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='email'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className={`w-full px-3 py-2 border rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
        )}
      </div>

      <div className='mb-3'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='phone'
        >
          Phone Number
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          className={`w-full px-3 py-2 border rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
        )}
      </div>

      <div className='mb-3'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='password'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className={`w-full px-3 py-2 border rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
        )}
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='confirmPassword'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className={`w-full px-3 py-2 border rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword}</p>
        )}
      </div>

      {error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-[#FCDF5A] text-black py-2 px-4 rounded hover:bg-[#FCDF5A] focus:outline-none focus:ring-2 focus:ring-[#FCDF5A] disabled:opacity-50'
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;
