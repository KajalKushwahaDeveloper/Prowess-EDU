import React from "react";

function ClassTypeDropdown({
  label,
  name,
  value,
  onChange,
  error,
  customClass,
  disabled = false,
}) {
// 

 // Determine options based on the type
 const options = [
    { value: "1", label: "1st" },
    { value: "2", label: "2nd" },
    { value: "3", label: "3rd" },
    { value: "4", label: "4th" },
    { value: "5", label: "5th" },
    { value: "6", label: "6th" },
    { value: "7", label: "7th" },
    { value: "8", label: "8th" },
    { value: "9", label: "9th" },
    { value: "10", label: "10th" },
    { value: "11", label: "11th" },
    { value: "12", label: "12th" },
    { value: "lkg", label: "LKG" },
    { value: "ukg", label: "UKG" },
  ];

  return (
    <div className={`input-container ${customClass}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-lg font-medium text-gray-700 mb-1"
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
        className="w-full rounded-lg px-3 py-2  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

export default ClassTypeDropdown;
