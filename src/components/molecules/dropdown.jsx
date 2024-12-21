import React from 'react';
import {  getTeachersForStudent } from "../../features/dashboardSharedApi/studentDashboardFeedbackReducer";

const Dropdown = ({ label, id, options = [], onChange, selectedOption, className = '' }) => {
  const [teacherForStudent, setTeacherForStudent] = useState([]);
  const studentClass = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getTeachersForStudent(`${studentClass?.Class}-${studentClass?.section}`))
      .unwrap()
      .then((response) => {
        setTeacherForStudent(response || []);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch FAQs");
      });
    console.log("getAssign1") // Log the response to check its structure

  }, [dispatch]);

  return (
    <form className="max-w-sm mx-auto">
      <select
        id={id}
        className={`bg-gray-50 border text-gray-900 text-md font-normal border-[#004871] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[238px] mr-4 ${className} outline-none`}
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
    </form>
  );
};

export default Dropdown;
