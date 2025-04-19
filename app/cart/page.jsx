'use client';

import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice';

import Link from 'next/link';
import Image from 'next/image';
import useHasMounted from '@/hooks/useHasMounted';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const handleRemoveItem = (idMeal) => {
    dispatch(removeFromCart(idMeal));
  };

  const handleQuantityChange = (idMeal, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ idMeal, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate cart total
  const cartTotal = items
    .reduce((total, item) => total + 10 * item.quantity, 0)
    .toFixed(2);

  if (!hasMounted) {
    return null; // Prevent rendering until mounted
  }
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8 '>
        <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>

        {items.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-600 mb-4'>Your cart is empty</p>
            <Link
              href='/all-recipes'
              className='bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500'
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop view - table layout */}
            <div className='hidden md:block bg-white rounded-lg shadow-md overflow-hidden mb-6'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-3 px-4 text-left'>Recipe</th>
                    <th className='py-3 px-4 text-left'>Price</th>
                    <th className='py-3 px-4 text-left'>Quantity</th>
                    <th className='py-3 px-4 text-left'>Subtotal</th>
                    <th className='py-3 px-4 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {items.map((item) => (
                    <tr key={item.idMeal}>
                      <td className='py-4 px-4'>
                        <div className='flex items-center'>
                          <Image
                            width={100}
                            height={100}
                            src={item.strMealThumb}
                            alt={item.strMeal}
                            className='w-16 h-16 object-cover rounded mr-4'
                          />
                          <div>
                            <h3 className='font-medium text-gray-800 truncate max-w-xs'>
                              {item.strMeal}
                            </h3>
                            <p className='text-sm text-gray-600'>
                              {item.strCategory}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-4'>$10.00</td>
                      <td className='py-4 px-4'>
                        <div className='flex items-center'>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.idMeal,
                                item.quantity - 1
                              )
                            }
                            className='bg-gray-200 px-2 py-1 rounded-l'
                          >
                            -
                          </button>
                          <span className='bg-gray-100 px-4 py-1'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.idMeal,
                                item.quantity + 1
                              )
                            }
                            className='bg-gray-200 px-2 py-1 rounded-r'
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className='py-4 px-4'>
                        ${(10 * item.quantity).toFixed(2)}
                      </td>
                      <td className='py-4 px-4'>
                        <button
                          onClick={() => handleRemoveItem(item.idMeal)}
                          className='text-red-600 hover:text-red-800'
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view - card layout */}
            <div className='md:hidden space-y-4'>
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
                      <p className='text-sm font-semibold'>$10.00</p>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-4'>
                    <div className='flex items-center'>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.idMeal, item.quantity - 1)
                        }
                        className='bg-gray-200 px-3 py-1 rounded-l'
                      >
                        -
                      </button>
                      <span className='bg-gray-100 px-4 py-1 text-sm'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.idMeal, item.quantity + 1)
                        }
                        className='bg-gray-200 px-3 py-1 rounded-r'
                      >
                        +
                      </button>
                    </div>
                    <p className='font-semibold'>
                      ${(10 * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.idMeal)}
                      className='text-red-600 hover:text-red-800 text-sm'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 bg-white p-4 rounded-lg shadow-md'>
              <div className='flex justify-between items-center'>
                <button
                  onClick={handleClearCart}
                  className='text-red-600 hover:text-red-800'
                >
                  Clear Cart
                </button>
                <div className='text-right'>
                  <p className='text-lg font-semibold'>Total: ${cartTotal}</p>
                  <button className='mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500'>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
