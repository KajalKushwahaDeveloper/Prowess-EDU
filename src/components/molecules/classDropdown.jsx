import { useState, useEffect } from "react";
import { getClassSection } from "../../features/dashboardSharedApi/classSectionReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dropdown = ({ label, name, onChange, customClass, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [classData, setClassData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await dispatch(getClassSection()).unwrap();
        setClassData(response || []);
      } catch (error) {
        toast.error(error || "Failed to fetch class data");
      }
    };
    fetchClass();
  }, [dispatch]);

  const handleClassChange = (classValue) => {
    if (selectedClass === classValue) {
      setSelectedClass(null);
      setSelectedSection(null);
    } else {
      setSelectedClass(classValue);
      setSelectedSection(null); // Reset section when class changes
    }
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setIsOpen(false); // Close the dropdown when section is selected
    const selectedClassData = classData.find(
      (classItem) => classItem.id === selectedClass
    );
    const formattedSelection = `${selectedClassData.Class}-${section}`;
    onChange(formattedSelection); // Pass selected class and section
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
    if (selectedClass && selectedSection) {
      const selectedClassData = classData.find(
        (classItem) => classItem.id === selectedClass
      );
      const formattedSelection = `${selectedClassData.Class}-${selectedSection}`;
      onChange(formattedSelection);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`relative ${customClass}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div
        className="class-container cursor-pointer border border-gray-300 rounded-md p-2 bg-white flex justify-between items-center w-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedClass && selectedSection
            ? `${
                classData.find((c) => c.id === selectedClass)?.Class
              } - ${selectedSection}`
            : `Select class ${label}`}
        </span>
        <span>&#x25BC;</span>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-full overflow-hidden"
          style={{ maxHeight: "15rem", overflowY: "auto" }}
        >
          {classData.map((classItem) => (
            <div key={classItem.id} className="mb-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`radio-${classItem.id}`}
                  value={classItem.id}
                  checked={selectedClass === classItem.id}
                  onChange={() => handleClassChange(classItem.id)}
                  disabled={disabled}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor={`radio-${classItem.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {classItem.Class}
                </label>
              </div>

              {selectedClass === classItem.id && (
                <div className="ml-6 mt-2">
                  {classItem.sections.map((section) => (
                    <div
                      key={section.sectionId}
                      className="flex items-center mb-1"
                    >
                      <input
                        type="radio"
                        id={`section-${classItem.id}-${section.sectionId}`}
                        value={section.section}
                        checked={selectedSection === section.section}
                        onChange={() => handleSectionChange(section.section)}
                        disabled={disabled}
                        className="form-radio h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`section-${classItem.id}-${section.sectionId}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {section.section}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleDropdownClose}
          >
            Done
          </button>
        </div>
      )}

      {/* Show the selected class and section in a single input field */}
      {selectedClass && selectedSection && (
        <input
          type="text"
          value={`${
            classData.find((c) => c.id === selectedClass)?.Class
          } - ${selectedSection}`}
          readOnly
          className="mt-2 w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
        />
      )}
    </div>
  );
};

export default Dropdown;
