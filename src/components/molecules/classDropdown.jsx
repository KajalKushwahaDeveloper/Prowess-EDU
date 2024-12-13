import React, { useState } from "react";

function Dropdown({
  label,
  name,
  onChange,
  customClass,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState({}); // Tracks selected sections for each class

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

  const sections = ["A", "B", "C", "D", "E"]; // Sections for each class

  const handleClassChange = (classValue) => {
    setSelectedClasses((prev) => {
      const updated = { ...prev };
      if (updated[classValue]) {
        // Remove the class if it's already selected
        delete updated[classValue];
      } else {
        // Add the class with an empty section array
        updated[classValue] = [];
      }
      return updated;
    });
  };

  const handleSectionChange = (classValue, section) => {
    setSelectedClasses((prev) => {
      const updated = { ...prev };
      if (!updated[classValue]) {
        updated[classValue] = [];
      }
      if (updated[classValue].includes(section)) {
        // Remove section
        updated[classValue] = updated[classValue].filter((s) => s !== section);
      } else {
        // Add section
        updated[classValue].push(section);
      }
      return updated;
    });
  };

  const getFormattedSelection = () => {
    return Object.entries(selectedClasses)
      .filter(([_, sections]) => sections.length > 0)
      .map(([classValue, sections]) =>
        sections.map((section) => `${classValue}-${section}`).join(", ")
      )
      .join(", ");
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
    const formattedSelection = getFormattedSelection();
    onChange(formattedSelection);
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
        className="class-container cursor-pointer border border-gray-300 rounded-md p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getFormattedSelection() || `Select ${label}`}
        <span className="float-right">&#x25BC;</span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-full">
          <div className="max-h-32 overflow-y-auto">
            {options.map((option) => (
              <div key={option.value} className="mb-2">
                {/* Class Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${option.value}`}
                    value={option.value}
                    checked={!!selectedClasses[option.value]}
                    onChange={() => handleClassChange(option.value)}
                    disabled={disabled}
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`checkbox-${option.value}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>

                {/* Section Dropdown */}
                {selectedClasses[option.value] && (
                  <div className="ml-6 mt-2">
                    {sections.map((section) => (
                      <div key={section} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          id={`section-${option.value}-${section}`}
                          value={section}
                          checked={selectedClasses[option.value]?.includes(section)}
                          onChange={() => handleSectionChange(option.value, section)}
                          disabled={disabled}
                          className="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`section-${option.value}-${section}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          Section {section}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-2 w-full bg-blue-500 text-white py-1 rounded"
            onClick={handleDropdownClose}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
