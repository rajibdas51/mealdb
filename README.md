# Recipe App

## Bug Fixes

### 1.Missing await in getRecipeDetails – Fixed to properly await the API response.

### 2.Redundant .then() in async function – Removed for cleaner async/await usage.

- **Location**: `HttpKit.js` – `getRecipeDetails` method
