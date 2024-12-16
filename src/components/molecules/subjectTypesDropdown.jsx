import React from "react";

function SubjectTypeDropdown({
  label,
  name,
  value,
  onChange,
  error,
  customClass,
  disabled = false,
}) {
  // Safely parse localStorage data
  const subjectdata = JSON.parse(localStorage.getItem("data")) || {}; // Default to empty object
  const type = subjectdata?.type || "N/A"; // Fallback to "N/A" if type is missing

  // Safely extract subjects and map to options
  const options =
    Array.isArray(subjectdata?.subjects) // Ensure subjects is an array
      ? subjectdata.subjects.map((subject) => ({
          value: subject, // Assuming subject is a string
          label: subject,
        }))
      : []; // Fallback to empty array

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
        className="w-full rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
