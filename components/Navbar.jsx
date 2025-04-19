'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/store/slices/authSlice';
import AuthModal from '../components/auth/AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate total items in cart
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className='fixed z-50 w-full bg-white md:absolute md:bg-transparent'>
        <div className='container m-auto px-2 md:px-12 lg:px-7'>
          <div className='flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0'>
            <input
              type='checkbox'
              name='toggle_nav'
              id='toggle_nav'
              className='peer hidden'
            />
            <div className='w-full px-6 flex justify-between lg:w-max md:px-0 z-30'>
              <Link
                href='/'
                aria-label='logo'
                className='flex space-x-2 items-center'
              >
                <span className='text-2xl font-bold text-yellow-900 '>
                  Tailus <span className='text-yellow-700 '>Feedus</span>
                </span>
              </Link>

              <div className='flex items-center lg:hidden max-h-10'>
                <label
                  role='button'
                  htmlFor='toggle_nav'
                  aria-label='hamburger'
                  id='hamburger'
                  className='relative w-10 h-auto p-2'
                >
                  <div
                    id='line'
                    className='m-auto h-0.5 w-6 rounded bg-yellow-900 transition duration-300'
                  ></div>
                  <div
                    id='line2'
                    className='m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 transition duration-300'
                  ></div>
                </label>
              </div>
            </div>

            <label
              role='button'
              htmlFor='toggle_nav'
              className='hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200 bg-opacity-30 backdrop-blur backdrop-filter'
            ></label>
            <div className='hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12'>
              <div className='text-gray-600 lg:pr-4 w-full'>
                <ul className='tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full'>
                  <li>
                    <Link
                      href='/all-recipes'
                      className='block md:px-4 transition hover:text-yellow-700'
                    >
                      <span>All recipes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/cart'
                      className='relative block md:px-4 transition hover:text-yellow-700'
                    >
                      <span>Cart</span>
                      {cartItemsCount > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link
                        href='/wishlist'
                        className='block md:px-4 transition hover:text-yellow-700'
                      >
                        <span>Wishlist</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className='w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l'>
                {isAuthenticated ? (
                  <div className='relative group'>
                    <button
                      type='button'
                      className='w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max'
                    >
                      <span className='block text-yellow-800 font-semibold text-sm'>
                        Welcome, {user.name}
                      </span>
                    </button>
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block'>
                      <Link
                        href='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100'
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={openLoginModal}
                      type='button'
                      className='w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max'
                    >
                      <span className='block text-yellow-900 font-semibold text-sm'>
                        Login/Sign Up
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Navbar;
