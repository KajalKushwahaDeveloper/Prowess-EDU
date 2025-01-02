const TeacherDropdown = ({ label, id, onChange, selectedOption, options = [], className = '' }) => {
  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto">
      <select
        id={id}
       className="bg-gray-50 border text-gray-900 text-sm font-normal border-[#004871] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full outline-none"

        onChange={onChange}
        value={selectedOption || ""}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherDropdown;
