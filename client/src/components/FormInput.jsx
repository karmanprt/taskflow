function FormInput({ label, type, name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-4">
      {/* Label associated with the input */}
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>

      {/* Controlled input: value comes from parent state */}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Display error only when an error exists */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;
