import HttpKit from '@/common/helpers/HttpKit';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipe-details', id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  if (isLoading) return <p>Loading recipe details...</p>;
  if (error || !data) return <p>Something went wrong loading the recipe.</p>;

  // Extract ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className='flex flex-col gap-4 max-h-[80vh] overflow-y-auto'>
      <div className='flex justify-end'>
        <button
          onClick={() => setIsOpen(false)}
          className='text-sm text-red-500 hover:underline'
        >
          Close
        </button>
      </div>

      <Image
        src={data?.strMealThumb}
        width={500}
        height={300}
        alt={data?.strMeal}
        className='rounded-lg'
      />

      <h2 className='text-2xl font-bold'>{data?.strMeal}</h2>
      <p className='text-gray-600'>
        <strong>Category:</strong> {data?.strCategory} <br />
        <strong>Area:</strong> {data?.strArea}
      </p>

      <div>
        <h3 className='font-semibold text-lg'>Ingredients:</h3>
        <ul className='list-disc list-inside'>
          {ingredients.map((item, index) => (
            <li key={index} className='text-gray-700'>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className='font-semibold text-lg mt-4'>Instructions:</h3>
        <p className='text-gray-700 whitespace-pre-line'>
          {data?.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default SingleRecipe;
