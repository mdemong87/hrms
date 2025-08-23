
const Select = ({ options, placeholder = "Select an option", selectedValue, className = "", onChange, disabled, error = false }) => {


  return (
    <select disabled={disabled}
      className={`h-11 w-full appearance-none rounded-lg border  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${error ? 'text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500' : 'border-gray-300 dark:border-gray-700'} ${selectedValue
        ? "text-gray-800 dark:text-white/90"
        : "text-gray-400 dark:text-gray-400"
        } ${className}`}
      value={selectedValue}
      onChange={onChange}
    >


      {options.map((option, index) => (
        <option
          key={index}
          value={option}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
