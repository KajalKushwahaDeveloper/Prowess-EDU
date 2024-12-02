import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function LevelDropdown({
  label,
  name,
  selectedValues = [],
  onChange,
  error,
  customClass,
  disabled = false,
  value, // Add value to the destructured props
}) {
  const teacherDashboardType = JSON.parse(localStorage.getItem("data"));
  const Type = teacherDashboardType?.type;
  console.log("type:", Type);
  const location = useLocation();
  const options =
    location.pathname === "/teacher/teacherDashboardStudents"
      ? [
        { value: "Weak", label: "Weak" },
        { value: "Strong", label: "Strong" },
      ]
      : location.pathname === "/teacher/teacherDashboardAssignment"
        ? [
          { value: "Easy", label: "Easy" },
          { value: "Medium", label: "Medium" },
          { value: "Hard", label: "Hard" },
        ]
        : []; // Default case (no options)



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
        value={value} // Ensure the value prop is used here
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

      {/* Error Message */}
      {error && (
        <p className="text-rose-600 text-sm absolute left-0 mt-1">{error}</p>
      )}
    </div>
  );
}

export default LevelDropdown;


