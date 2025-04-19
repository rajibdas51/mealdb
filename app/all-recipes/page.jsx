'use client';

import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from '../../components/Recipes/RecipeCard';
import Pagination from '../../components/Pagination';
import HttpKit from '../../common/helpers/HttpKit';

const commonIngredients = [
  'Chicken',
  'Beef',
  'Pork',
  'Fish',
  'Rice',
  'Pasta',
  'Potato',
  'Tomato',
  'Onion',
  'Garlic',
  'Cheese',
];

const initialFilters = { search: '', category: '', ingredient: '' };

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 12;

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [categoriesData, ...areaData] = await Promise.all([
        HttpKit.getCategories(),
        HttpKit.filterByArea('American'),
        HttpKit.filterByArea('Italian'),
        HttpKit.filterByArea('Indian'),
      ]);

      const allRecipes = areaData.flat();
      setCategories(categoriesData);
      setRecipes(allRecipes);
      setFilteredRecipes(allRecipes);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const applyAllFilters = useCallback(async () => {
    setLoading(true);
    try {
      let result = [...recipes];

      if (filters.search) {
        result = await HttpKit.searchRecipesByName(filters.search);
      } else if (filters.category) {
        result = await HttpKit.filterByCategory(filters.category);
      } else if (filters.ingredient) {
        result = await HttpKit.searchRecipesByIngredient(filters.ingredient);
      }

      if (filters.search && filters.category) {
        const filtered = [];
        for (const recipe of result) {
          const details = await HttpKit.getRecipeDetails(recipe.idMeal);
          if (details?.strCategory === filters.category) {
            filtered.push(recipe);
          }
        }
        result = filtered;
      }

      if ((filters.search || filters.category) && filters.ingredient) {
        const ingredientList = await HttpKit.searchRecipesByIngredient(
          filters.ingredient
        );
        const ingredientIds = new Set(ingredientList.map((r) => r.idMeal));
        result = result.filter((r) => ingredientIds.has(r.idMeal));
      }

      setFilteredRecipes(result || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError('Error applying filters');
    } finally {
      setLoading(false);
    }
  }, [filters, recipes]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    applyAllFilters();
  }, [applyAllFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setFilteredRecipes(recipes);
    setCurrentPage(1);
  };

  const currentRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const renderStatus = () => {
    if (loading) {
      return (
        <div className='text-center py-10'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FCDF5A] border-r-transparent'></div>
          <p className='mt-2'>Loading recipes...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className='text-center py-10'>
          <p className='text-red-500'>{error}</p>
          <button
            onClick={resetFilters}
            className='mt-4 px-6 py-2 bg-[#FCDF5A] hover:bg-[#eece40] text-black font-medium rounded-lg'
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!filteredRecipes.length) {
      return (
        <div className='text-center py-10'>
          <p className='text-xl text-gray-600'>
            No recipes found matching your criteria.
          </p>
          <button
            onClick={resetFilters}
            className='mt-4 px-6 py-2 bg-[#FCDF5A] hover:bg-[#eece40] text-black font-medium rounded-lg'
          >
            Clear Filters
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-4xl font-bold text-center mb-10'>All Recipes</h1>

      {/* Filter Inputs */}
      <div className='mb-8'>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <input
            type='text'
            placeholder='Search recipes...'
            className='flex-grow p-3 border border-gray-300 rounded-lg'
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <button
            className='px-6 py-3 bg-[#FCDF5A] hover:bg-[#eece40] text-black font-semibold rounded-lg'
            onClick={applyAllFilters}
          >
            Search
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className='p-3 border border-gray-300 rounded-lg'
          >
            <option value=''>All Categories</option>
            {categories.map((c) => (
              <option key={c.idCategory} value={c.strCategory}>
                {c.strCategory}
              </option>
            ))}
          </select>

          <select
            value={filters.ingredient}
            onChange={(e) => handleFilterChange('ingredient', e.target.value)}
            className='p-3 border border-gray-300 rounded-lg'
          >
            <option value=''>All Ingredients</option>
            {commonIngredients.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className='p-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg'
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Status UI */}
      {renderStatus()}

      {/* Recipes Grid */}
      {!loading && !error && filteredRecipes.length > 0 && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                handleDetailsOpen={() =>
                  console.log(`Opening recipe details for: ${recipe.idMeal}`)
                }
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRecipes.length / recipesPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllRecipes;
