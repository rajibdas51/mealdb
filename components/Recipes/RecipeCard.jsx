'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../app/store/slices/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../app/store/slices/wishlistSlice';
import { toast } from 'react-toastify';

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [isMounted, setIsMounted] = React.useState(false);
  const isInCart = cartItems.some((item) => item.idMeal === recipe.idMeal);
  const isInWishlist = wishlistItems.some(
    (item) => item.idMeal === recipe.idMeal
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCartToggle = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (isInCart) {
      dispatch(removeFromCart(recipe.idMeal));
      toast.success('Recipe removed from cart successfully!');
    } else {
      dispatch(addToCart(recipe));
      toast.success('Recipe added to cart successfully!');
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (isInWishlist) {
      dispatch(removeFromWishlist(recipe.idMeal));
      toast.success('Recipe removed from wishlist successfully!');
    } else {
      dispatch(addToWishlist(recipe));
      toast.success('Recipe added to wishlist successfully!');
    }
  };
  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }
  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className='group space-y-6 border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10'
    >
      <div className='relative'>
        <Image
          className='mx-auto rounded-2xl'
          src={recipe?.strMealThumb}
          alt={`Image of ${recipe?.strMeal}`}
          loading='lazy'
          width={500}
          height={500}
        />
        {/* Position the icons at the top right corner of the image */}
        <div className='absolute top-2 right-2 flex space-x-2'>
          <button
            onClick={handleWishlistToggle}
            className='p-1 bg-white rounded-full shadow'
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? (
              <FaHeart className='text-red-500 text-2xl' />
            ) : (
              <FaRegHeart className='text-gray-500 text-2xl hover:text-red-500' />
            )}
          </button>

          <button
            onClick={handleCartToggle}
            className='p-1 bg-white rounded-full shadow'
            title={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            <FaShoppingCart
              className={`text-2xl ${
                isInCart
                  ? 'text-[#FCDF5A]'
                  : 'text-gray-500 hover:text-[#eece40]'
              }`}
            />
          </button>
        </div>
      </div>

      <h3 className='text-2xl font-semibold text-gray-800'>
        {recipe?.strMeal}
      </h3>

      <p>
        Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
        consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
        animi officiis.
      </p>

      <div className='relative mx-auto flex items-center justify-center invisible group-hover:visible'>
        <button className='text-primary'>Click to see details</button>
      </div>
    </div>
  );
};

export default RecipeCard;
