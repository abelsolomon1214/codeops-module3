# Question 7 - TeleBirr Number Validation

A React delivery form that validates a TeleBirr number while the user types and disables the submit button until the number is valid.

## Features

* Controlled form inputs
* One state object for all form fields
* One change handler for all inputs
* TeleBirr number validation while typing
* Regular expression validation
* Validation error message
* Submit button disabled until the phone number is valid
* Simple CSS styling

## How It Works

The form stores the name, phone, and area in one state object.

The TeleBirr number is validated using a regular expression:

```javascript
/^09\d{8}$/
```

The validation requires:

* The number to start with `09`
* Eight additional digits
* A total of 10 digits

For example:

```text
0912345678
```

is valid.

The submit button uses the validation result:

```javascript
disabled={!isPhoneValid}
```

When the phone number is invalid, the submit button remains disabled.

When the phone number becomes valid, the submit button becomes enabled.

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

1. Leaving the phone field empty and checking that Submit is disabled.
2. Typing an invalid number and checking that the validation message appears.
3. Typing a valid 10-digit number starting with `09`.
4. Checking that the Submit button becomes enabled.
5. Submitting the form.
6. Checking the browser console for the delivery information.

## Technologies

* React
* Vite
* JavaScript
* React State
* Controlled Forms
* Regular Expressions
* CSS
* ESLint
