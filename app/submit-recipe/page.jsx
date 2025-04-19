'use client';

import React, { useState } from 'react';

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Beverage',
];

export default function SubmitRecipe() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: ['', '', ''],
    instructions: '',
    images: [],
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleIngredientChange = (idx, value) => {
    setFormData((f) => {
      const ings = [...f.ingredients];
      ings[idx] = value;
      return { ...f, ingredients: ings };
    });
  };

  const handleFiles = (e) => {
    setFormData((f) => ({ ...f, images: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting recipe', formData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && formData.category !== '';
      case 2:
        return formData.ingredients.some((ing) => ing.trim() !== '');
      case 3:
        return formData.instructions.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className='mt-10 '>
      <h1 className='text-3xl font-bold text-center my-8'>Submit Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className='max-w-xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md '
      >
        {/* Numeric Step Indicator */}
        <div className='flex justify-center space-x-4 mb-6'>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-lg font-medium
              ${
                step === n
                  ? 'border-yellow-400 bg-yellow-400 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-center'>Basic Details</h2>

            <label className='block'>
              <span className='block mb-1'>Recipe Name</span>
              <input
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full p-2 border rounded'
              />
            </label>

            <label className='block'>
              <span className='block mb-1'>Category</span>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                required
                className='w-full p-2 border rounded'
              >
                <option value=''>Select one…</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Step 2: Ingredients */}
        {step === 2 && (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-center'>Ingredients</h2>
            {formData.ingredients.map((ing, i) => (
              <input
                key={i}
                value={ing}
                onChange={(e) => handleIngredientChange(i, e.target.value)}
                placeholder={`Ingredient #${i + 1}`}
                className='w-full p-2 border rounded'
              />
            ))}
            <button
              type='button'
              onClick={() =>
                setFormData((f) => ({
                  ...f,
                  ingredients: [...f.ingredients, ''],
                }))
              }
              className='mt-2 text-sm text-yellow-600 '
            >
              + Add one more
            </button>
          </div>
        )}

        {/* Step 3: Instructions & Images */}
        {step === 3 && (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-center'>
              Instructions & Images
            </h2>
            <label className='block'>
              <span className='block mb-1'>Instructions</span>
              <textarea
                name='instructions'
                value={formData.instructions}
                onChange={handleChange}
                rows={5}
                required
                className='w-full p-2 border rounded'
              />
            </label>
            <label className='block'>
              <span className='block mb-1'>Upload Images</span>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleFiles}
                className='block'
              />
            </label>
            {formData.images.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-2'>
                {formData.images.map((file, i) => (
                  <span key={i} className='text-sm'>
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={back}
            disabled={step === 1}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type='button'
              onClick={next}
              disabled={!isStepValid()}
              className='px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 text-black disabled:opacity-50'
            >
              Next
            </button>
          ) : (
            <button
              type='submit'
              disabled={!isStepValid()}
              className='px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 text-black disabled:opacity-50'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
