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

  const classData = JSON.parse(localStorage.getItem("data"))
  const type = classData.classesCanTeach
 // Determine options based on the type
 const options = classData?.classesCanTeach?.map((classes) => ({
  value: classes, // Assuming classes is a string
  label: classes,
})) || [] // Fallback to an empty array// Fallback to an empty array
   
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
