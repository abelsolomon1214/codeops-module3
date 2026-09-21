# Performance Profile

## Interaction Profiled

The application was profiled while adding three dishes from the Menu page to the cart.

## Before Optimization

React DevTools Profiler Ranked view showed:

- Menu: 15.2ms
- DishCard key="5": 6.6ms
- DishCard key="1": 6.5ms
- DishCard key="3": 5.2ms
- DishCard key="9": 4.9ms
- ErrorBoundary: 4.8ms

### Problem

The Menu and multiple DishCard components were rendering during the interaction. DishCard is a repeated component, so unnecessary renders across several cards can increase the total rendering work.

## Fix

`DishCard` was wrapped with `React.memo`.

The component receives stable `dish` and `onAddToCart` props, so unchanged cards can skip rendering when the parent updates.

## After Optimization

React DevTools Profiler Ranked view showed:

- Routes: 10.6ms
- Layout: 7.1ms
- App: 6.7ms
- Menu: 4.2ms
- DishCard (Memo) key="7": 2.8ms
- DishCard (Memo) key="4": 2.5ms
- DishCard (Memo) key="10": 2.4ms
- DishCard (Memo) key="2": 2.3ms

## Result

The measured Menu render decreased from 15.2ms before the optimization to 4.2ms after the optimization.

The profiling result supports keeping the `React.memo` optimization for DishCard.