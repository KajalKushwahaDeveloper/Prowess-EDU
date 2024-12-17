import React from "react";

function StudentDropdown({
    label,
    name,
    value,
    onChange,
    customClass,
    disabled = false,
}) {
    // Determine options based on the type
    const options = [
        { value: "allStudent", label: "All Student" },
        // Add other student options here if needed
    ];

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        // Always return a single array with "All Students" or the selected value as a string
        onChange({
          target: {
            name,
            value: selectedValue === "allStudent" ? ["All Students"] : [selectedValue],
          },
        });
    };

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
                onChange={handleChange}
                disabled={disabled}
                className="w-full rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="" disabled>
                    {label}
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

export default StudentDropdown;
