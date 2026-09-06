# Question 6 - Controlled Delivery Form

A React delivery form that uses one state object and one change handler to manage customer delivery information.

## Features

* Controlled form inputs
* One state object for all form fields
* One change handler for all inputs
* Name, phone, and area fields
* Form submission handling
* Delivery information logged to the browser console
* Simple CSS styling

## How It Works

The form stores all input values in one state object:

```javascript
{
  name: "",
  phone: "",
  area: ""
}
```

Each input uses the `value` from the state and updates the state through the same `handleChange` function.

The input `name` attribute determines which property of the state object is updated.

For example:

* `name="name"` updates the name
* `name="phone"` updates the phone
* `name="area"` updates the area

The form uses `handleSubmit` to prevent the default browser submission and log the completed delivery information to the console.

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Testing

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Test the form by:

1. Entering a name.
2. Entering a phone number.
3. Entering an area.
4. Clicking "Submit Delivery".
5. Opening the browser console.
6. Checking that the delivery information is displayed.

## Technologies

* React
* Vite
* JavaScript
* React State
* Controlled Forms
* CSS
* ESLint
