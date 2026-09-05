# Question 2 - Category Filter Chips

A React menu that uses state to select a category and filters dishes based on the selected category.

## Features

- Category selection using React state
- Categories stored in an array
- Category buttons rendered with `map()`
- Selected category is highlighted
- Menu filters dishes based on the selected category
- Reusable `Dish` component

## How It Works

The `Menu` component stores the selected category using `useState()`.

The categories are stored in an array:

```javascript
const categories = ["All", "Vegetarian", "Meat"];