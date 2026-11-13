function FormInput({ label, autoComplete, type, name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Reserved space prevents layout shifting when errors appear */}
      <div className="mt-1 min-h-10">
        {error && (
          <p className="text-sm leading-5 text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormInput;
