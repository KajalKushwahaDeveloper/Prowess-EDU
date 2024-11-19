import React, { useState } from "react";

function SubjectsDropdown({
  label,
  name,
  selectedValues = [],
  onChange,
  error,
  customClass,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Computer", label: "Computer" },
    { value: "Science", label: "Science" },
    { value: "Maths", label: "Maths" },
    { value: "Hindi", label: "Hindi" },
    { value: "Social Science", label: "Social Science" },
    { value: "English", label: "English" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Biology", label: "Biology" },
    { value: "Sanskrit", label: "Sanskrit" },
    { value: "Physical Science", label: "Physical Science" },
  ];

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      // Remove the value if it's already selected
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      // Add the value to the selected values
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className={` ${customClass}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-lg font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Dropdown */}
      <div
        className="class-container cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0
          ? options
              .filter((option) => selectedValues.includes(option.value))
              .map((option) => option.label)
              .join(", ")
          : `Select ${label}`}
        <span className="float-right">&#x25BC;</span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-full">
          <div className="max-h-32 overflow-y-auto">
            {options.map((option) => (
              <div key={option.value} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`checkbox-${option.value}`}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  disabled={disabled}
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={`checkbox-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectsDropdown;
