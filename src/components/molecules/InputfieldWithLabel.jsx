import InputField from "../atoms/inputField";

const InputFieldWithLabel = ({
  type = "text",
  labelText,               // Label Text for the input
  inputLabelFor,           // Label "for" attribute to associate with the input
  placeholder,
  value,
  onChange,
  width,
  disabled = false,
  customClass,
  keyfilter = null,
  maxLength,
  name,
  autoComplete = "off",
  required = false         // Optional: Make the label show a required indicator
}) => {
  return (
    <div className={`input-container ${customClass}`}>
      {/* Label */}
      <label
        htmlFor={inputLabelFor || name}
        className="block text-lg font-medium text-gray-700 mb-1"  // Tailwind CSS for styling
      >
        {labelText}
      </label>
      {/* Input Field */}
      <InputField
        type={type}
        id={inputLabelFor || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: width || "100%",
          height: "48px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          border: "2px solid #004871",
          outline: "none",
          padding: "0 10px",
          backgroundColor: "red",
        }}
        disabled={disabled}
        keyfilter={keyfilter}
        maxLength={maxLength}
        name={name}
        autoComplete={autoComplete}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputFieldWithLabel;
