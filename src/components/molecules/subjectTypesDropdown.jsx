function SubjectTypeDropdown({
  label,
  name,
  value,
  onChange,
  error,
  customClass,
  disabled = false,
  className = ''
}) {
  // Safely parse localStorage data
  const subjectdata = JSON.parse(localStorage.getItem("data")) || {}; // Default to empty object
  const type = subjectdata?.type || "N/A"; // Fallback to "N/A" if type is missing

  // Safely extract subjects and map to options
  const options = Array.isArray(subjectdata?.subjects) // Ensure subjects is an array
    ? subjectdata.subjects.map((subject) => ({
        value: subject, // Assuming subject is a string
        label: subject,
      }))
    : []; // Fallback to empty array

  return (
    <div className={`w-full max-w-xs md:max-w-sm mx-auto ${customClass}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm md:text-base font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      {/* Dropdown */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-gray-50 border text-gray-900 text-sm font-normal border-[#004871] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full outline-none"

      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectTypeDropdown;
