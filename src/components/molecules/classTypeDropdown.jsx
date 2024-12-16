import React from "react";

const ClassTypeDropdown = ({ label, name, value, onChange, error, customClass, disabled = false }) => {
  const classData = JSON.parse(localStorage.getItem("data")) || {};
  const options = classData?.classesCanTeach?.map((classes) => ({
      value: classes, // Ensure this is a string
      label: classes,
  })) || [];

  return (
      <div className={`input-container ${customClass}`}>
          {label && (
              <label htmlFor={name} className="block text-lg font-medium text-gray-700 mb-1">
                  {label}
              </label>
          )}
          <select
              name={name}
              value={value}
              onChange={(e) => {
                  const selectedValue = e.target.value;
                  console.log("Selected Value:", selectedValue); // Debugging output
                  onChange({ target: { name, value: selectedValue } });
              }}
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
          {error && <p className="text-rose-600 text-md mt-1">{error}</p>}
      </div>
  );
};

export default ClassTypeDropdown;
