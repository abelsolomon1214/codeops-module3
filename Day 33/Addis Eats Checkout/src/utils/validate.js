const TELEBIRR_PHONE = /^(?:\+251|0)9\d{8}$/;

export function validate(form) {
  const errors = {};

  const normalizedPhone = form.phone.replace(/\s+/g, "");

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!normalizedPhone) {
    errors.phone = "Please enter your TeleBirr number.";
  } else if (!TELEBIRR_PHONE.test(normalizedPhone)) {
    errors.phone = "Use 09... or +2519... for your TeleBirr number.";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  return errors;
}