import { useState, useEffect } from "react";
import { getClassSection } from "../../features/dashboardSharedApi/classSectionReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dropdown = ({ label, name, onChange, customClass, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState({});
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

  const handleClassChange = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
      setSelectedSections((prev) => {
        const updated = { ...prev };
        delete updated[classId];
        return updated;
      });
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const handleSectionChange = (classId, section) => {
    setSelectedSections((prev) => {
      const currentSections = prev[classId] || [];
      if (currentSections.includes(section)) {
        return {
          ...prev,
          [classId]: currentSections.filter((s) => s !== section),
        };
      } else {
        return {
          ...prev,
          [classId]: [...currentSections, section],
        };
      }
    });
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
    const formattedSelection = selectedClasses.map((classId) => {
      const classItem = classData.find((c) => c.id === classId);
      const sections = selectedSections[classId] || [];
      return sections.map((section) => `${classItem.Class}-${section}`);
    }).flat();
    onChange(formattedSelection.length > 0 ? formattedSelection : null);
  };

  return (
    <div className={`relative ${customClass}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-600 mb-1"
        >
          {label}
        </label>
      )}

      <div
        className="class-container cursor-pointer border border-gray-300 rounded-lg p-3 bg-white flex justify-between items-center w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-700">
          {selectedClasses.length > 0
            ? selectedClasses.map((classId) => {
                const classItem = classData.find((c) => c.id === classId);
                const sections = selectedSections[classId] || [];
                return sections.map((section) => `${classItem.Class}-${section}`).join(", ");
              }).join(", ")
            : `Select class ${label}`}
        </span>
        <span className="text-gray-500">&#x25BC;</span>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full overflow-hidden"
          style={{ maxHeight: "15rem", overflowY: "auto" }}
        >
          {classData.map((classItem) => (
            <div key={classItem.id} className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${classItem.id}`}
                  value={classItem.id}
                  checked={selectedClasses.includes(classItem.id)}
                  onChange={() => handleClassChange(classItem.id)}
                  disabled={disabled}
                  className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor={`checkbox-${classItem.id}`}
                  className="ml-2 text-sm text-gray-800 font-medium"
                >
                  {classItem.Class}
                </label>
              </div>

              {selectedClasses.includes(classItem.id) && (
                <div className="ml-6 mt-2">
                  {classItem.sections.map((section) => (
                    <div
                      key={section.sectionId}
                      className="flex items-center mb-2"
                    >
                      <input
                        type="checkbox"
                        id={`section-${classItem.id}-${section.sectionId}`}
                        value={section.section}
                        checked={
                          (selectedSections[classItem.id] || []).includes(section.section)
                        }
                        onChange={() => handleSectionChange(classItem.id, section.section)}
                        disabled={disabled}
                        className="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded"
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
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none text-sm"
            onClick={handleDropdownClose}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;













