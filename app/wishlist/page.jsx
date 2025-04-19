'use client';

import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromWishlist,
  clearWishlist,
} from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import useHasMounted from '@/hooks/useHasMounted';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import RecipeCard from '@/components/Recipes/RecipeCard';

export default function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const handleRemoveItem = (idMeal) => {
    dispatch(removeFromWishlist(idMeal));
    toast.success('Item removed from wishlist!');
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.strMeal} added to cart!`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (!hasMounted) {
    return null; // Prevent rendering until mounted
  }
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8 pt-28'>
        <h1 className='text-2xl font-bold mb-6'>Your Wishlist</h1>

        {items.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-600 mb-4'>Your wishlist is empty</p>
            <Link
              href='/all-recipes'
              className='bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500'
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop view - grid layout */}
            <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
              {items.map((item) => (
                <RecipeCard recipe={item} key={item.idMeal} />
              ))}
            </div>

            {/* Mobile view - card layout */}
            <div className='md:hidden space-y-4 mb-6'>
              {items.map((item) => (
                <div
                  key={item.idMeal}
                  className='bg-white p-4 rounded-lg shadow-md'
                >
                  <div className='flex gap-4'>
                    <Image
                      width={100}
                      height={100}
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      className='w-20 h-20 object-cover rounded flex-shrink-0'
                    />
                    <div className='flex-grow'>
                      <h3 className='font-medium text-gray-800 text-sm sm:text-base line-clamp-2'>
                        {item.strMeal}
                      </h3>
                      <p className='text-xs text-gray-600 mb-1'>
                        {item.strCategory}
                      </p>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    <button
                      onClick={() => handleRemoveItem(item.idMeal)}
                      className='text-red-600 hover:text-red-800 text-sm flex items-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        className='mr-1'
                      >
                        <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                      </svg>
                      Remove
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className='bg-yellow-400 text-black rounded hover:bg-yellow-500 px-3 py-1  text-sm'
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex justify-between items-center'>
              <button
                onClick={handleClearWishlist}
                className='text-red-600 hover:text-red-800 flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                  className='mr-1'
                >
                  <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
                </svg>
                Clear Wishlist
              </button>
              <Link
                href='/cart'
                className='bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500'
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
