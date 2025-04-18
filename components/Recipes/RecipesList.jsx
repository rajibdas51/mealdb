'use client';
import HttpKit from '@/common/helpers/HttpKit';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import Modal from '../Modal';
import SingleRecipe from './SingleRecipe';

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Query for top recipes
  const { data: topRecipes, isLoading: topRecipesLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: HttpKit.getTopRecipes,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Query for searched recipes
  const {
    data: searchResults,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useQuery({
    queryKey: ['searchRecipes', searchInput],
    queryFn: () => HttpKit.searchRecipesByName(searchInput),
    enabled: searchInput.length > 2,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (searchInput.length > 2 && searchResults) {
      setRecipes(searchResults);
    } else if (topRecipes) {
      setRecipes(topRecipes);
    }
  }, [topRecipes, searchResults, searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  // loading animation on first render
  if (topRecipesLoading && !recipes.length) {
    return (
      <div className='bg-gray-50 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-pulse flex space-x-4 mb-4 justify-center'>
            <div className='rounded-full bg-yellow-300 h-3 w-3'></div>
            <div className='rounded-full bg-yellow-300 h-3 w-3'></div>
            <div className='rounded-full bg-yellow-300 h-3 w-3'></div>
          </div>
          <p>Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 py-10'>
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold'>
          {searchInput.length > 2
            ? `Search Results for "${searchInput}"`
            : 'Top Recipes'}
        </h1>

        {/* Search form  */}
        <div>
          <form className='w-full mt-12' onSubmit={(e) => e.preventDefault()}>
            <div className='relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2'>
              <input
                placeholder='Your favorite food'
                className='w-full p-4 rounded-full outline-none bg-transparent'
                type='text'
                value={searchInput}
                onChange={handleInputChange}
              />
              <button
                type='button'
                title={searchInput ? 'Clear search' : 'Search'}
                onClick={() => searchInput && setSearchInput('')}
                className={`ml-auto py-3 px-6 rounded-full text-center transition ${
                  searchInput
                    ? 'bg-gradient-to-b from-yellow-200 to-yellow-300'
                    : 'bg-gray-100'
                } hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12 relative`}
              >
                {searchFetching && (
                  <span className='absolute inset-0 flex items-center justify-center'>
                    <span className='animate-spin h-5 w-5 border-t-2 border-yellow-900 rounded-full'></span>
                  </span>
                )}
                <span
                  className={`hidden text-yellow-900 font-semibold md:block ${
                    searchFetching ? 'opacity-0' : ''
                  }`}
                >
                  {searchInput ? 'Clear' : 'Search'}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`w-5 mx-auto text-yellow-900 md:hidden ${
                    searchFetching ? 'opacity-0' : ''
                  }`}
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className='relative py-16'>
          <div className='container relative m-auto px-6 text-gray-500 md:px-12'>
            <div className='grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3 relative'>
              {searchFetching && searchInput.length > 2 && (
                <div className='absolute inset-0 bg-gray-50 bg-opacity-60 flex items-center justify-center z-10'>
                  <div className='animate-pulse flex space-x-4'>
                    <div className='rounded-full bg-yellow-300 h-2 w-2'></div>
                    <div className='rounded-full bg-yellow-300 h-2 w-2'></div>
                    <div className='rounded-full bg-yellow-300 h-2 w-2'></div>
                  </div>
                </div>
              )}

              {recipes?.length > 0 ? (
                recipes.map((recipe) => (
                  <div
                    key={recipe?.idMeal}
                    className='transition-opacity duration-300 ease-in-out'
                  >
                    <RecipeCard
                      recipe={recipe}
                      handleDetailsOpen={handleDetailsOpen}
                    />
                  </div>
                ))
              ) : (
                <div className='lg:col-span-3 text-center py-12'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-12 w-12 mx-auto text-yellow-500 mb-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <p className='text-xl'>
                    No recipes found. Try another search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal*/}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default RecipesList;
