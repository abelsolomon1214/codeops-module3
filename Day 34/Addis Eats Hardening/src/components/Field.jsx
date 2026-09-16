function Field({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  options = [],
  placeholder = "",
}) {
  const showError = touched && error;
  const errorId = `${id}-error`;

  const commonProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
    "aria-invalid": Boolean(showError),
    "aria-describedby": showError ? errorId : undefined,
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {type === "select" ? (
        <select {...commonProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...commonProps}
          placeholder={placeholder}
          rows="4"
        />
      ) : (
        <input
          {...commonProps}
          type={type}
          placeholder={placeholder}
        />
      )}

      {showError && (
        <p id={errorId} className="field-error" role="alert">
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  );
}

export default Field;