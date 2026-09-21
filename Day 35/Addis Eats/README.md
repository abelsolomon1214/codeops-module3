# Addis Eats Checkout

Addis Eats Checkout is a React-based Ethiopian food ordering application focused on building accessible, controlled forms and reliable checkout interactions.

The project uses a single React state object to manage the checkout form, a pure validation function for client-side validation, touched-field tracking for user-friendly errors, and asynchronous submission handling with success and failure states.

## Day 33 Learning Objectives

- Build controlled React forms
- Manage multiple form fields with one state object
- Use one shared change handler
- Build reusable form field components
- Create pure validation functions
- Track touched fields
- Display validation errors only when appropriate
- Implement accessible form controls
- Use `aria-invalid` and `aria-describedby`
- Associate errors with fields using `role="alert"`
- Manage submitting, failed, and succeeded states
- Prevent duplicate form submissions
- Preserve form data when submission fails
- Focus the first invalid field
- Work with derived validation errors
- Keep cart state managed by Zustand

## Features

### Controlled Checkout Form

The checkout form contains:

- Customer name
- TeleBirr phone number
- Delivery area
- Optional delivery notes

All fields are controlled from one state object:

```js
const [form, setForm] = useState({
  name: "",
  phone: "",
  area: "Bole",
  notes: "",
});