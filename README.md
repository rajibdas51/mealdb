# Recipe App

## 🐛 Bug Fixes

### 1. Missing `await` in `getRecipeDetails`

- Fixed to properly await the API response.
- **Location**: `HttpKit.js` – `getRecipeDetails` method

### 2. Redundant `.then()` in async function

- Removed for cleaner `async/await` usage.
- **Location**: `HttpKit.js` – `getRecipeDetails` method

### 3. Incorrect Key in Recipe List

- Used `recipe.id` instead of `recipe.idMeal`, causing key warnings in React.
- **Fix**: Updated to `key={recipe?.idMeal}`

### 4. `searchInput` was incorrectly updated as an object

- Initialized as a string, but updated using an object.
- **Fix**: Used `setSearchInput(e.target.value)` directly.

### 5. Modal Not Displaying Recipe Details

- Clicking a recipe opened the modal, but didn’t show recipe details correctly.
- **Cause**: `SingleRecipe` was hardcoded inside the modal instead of being passed dynamically as children.
- **Fix**: Updated the `Modal` component to use `{children}` so the selected recipe can be passed properly.
