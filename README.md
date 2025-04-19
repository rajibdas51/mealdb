# Recipe App

**GitHub Repository:** [https://github.com/rajibdas51/mealdb](https://github.com/rajibdas51/mealdb)  
**Live Site:** [https://tailusfeedus.vercel.app/](https://tailusfeedus.vercel.app/)

## Features Implemented

1. Implemented authentication flow using name, email, phone, and password.
2. Created an "All Recipes" page with:
   - Recipe listing
   - Search by name
   - Filter by category and ingredients
   - Pagination
3. Implemented multi-step form for submitting recipes:
   - Step 1: Basic info (name, category)
   - Step 2: Ingredients
   - Step 3: Instructions and image upload
4. Integrated Redux Toolkit for global state management.
5. Developed cart functionality:
   - Stores data locally when not logged in
   - Syncs to user account when logged in
6. Developed wishlist functionality to mark favorites.
7. Implemented search functionality throughout the application.
8. Custom pagination built from scratch and applied in recipe listings.

## Bug Fixes

### 1. Missing `await` in `getRecipeDetails`

- Fixed to properly await the API response.
- Location: `HttpKit.js` – `getRecipeDetails` method

### 2. Redundant `.then()` in async function

- Removed for cleaner `async/await` usage.
- Location: `HttpKit.js` – `getRecipeDetails` method

### 3. Incorrect Key in Recipe List

- Used `recipe.id` instead of `recipe.idMeal`, causing key warnings in React.
- Fix: Updated to `key={recipe?.idMeal}`

### 4. `searchInput` was incorrectly updated as an object

- Initialized as a string, but updated using an object.
- Fix: Used `setSearchInput(e.target.value)` directly.

### 5. Modal Not Displaying Recipe Details

- Clicking a recipe opened the modal, but didn’t show recipe details correctly.
- Cause: `SingleRecipe` was hardcoded inside the modal instead of being passed dynamically as children.
- Fix: Updated the `Modal` component to use `{children}` so the selected recipe can be passed properly.

## Time Estimate

Total time spent on the assessment: **14–16 hours**
