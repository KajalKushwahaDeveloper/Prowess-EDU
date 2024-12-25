import React from "react";

function GenderDropdown({
  label,
  name,
  value,
  onChange,
  error,
  customClass,
  disabled = false,
}) {
  const subjectdata = JSON.parse(localStorage.getItem("data"))
  const type = subjectdata.type

 // Determine options based on the type
 const options =
 type === 3
   ? subjectdata?.subjects?.map((subject) => ({
       value: subject, // Assuming subject is a string
       label: subject,
     })) || [] // Fallback to an empty array
   : [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    // { value: "Other", label: "Other" },
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

export default GenderDropdown;
