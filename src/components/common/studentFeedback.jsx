import { useState, useEffect } from "react";
import SubjectTypeDropdown from "../molecules/subjectTypesDropdown";
import TeacherDropdown from "../molecules/teacherDropdown"; // Import the TeacherDropdown
import { addFeedback } from "../../features/dashboardSharedApi/studentDashboardFeedbackReducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getTeachersForStudent } from "../../features/dashboardSharedApi/studentDashboardFeedbackReducer";
import ButtonText from "../atoms/buttonText";
import { Rating } from "primereact/rating";
import Pagination from "./pagination";
// import axios from "axios";

const StudentFeedback = ({ filteredFeedback }) => {
  const [formData, setFormData] = useState({
    Class: "",
    subject: "",
    teacherId: "",
    teacherName: "",
    rating: "",
  });

  const [teacherOptions, setTeacherOptions] = useState([]);
  const dispatch = useDispatch();
  const studentClass = JSON.parse(localStorage.getItem("data"));
  console.log("teacherOptions:", teacherOptions);

  // Fetch teacher options
  useEffect(() => {
    const fetchTeachers = async () => {
        try {
            const response = await dispatch(getTeachersForStudent()).unwrap();
            console.log("getTeacher:", response);
            
            const formattedOptions = response.map((teacher) => ({
                value: teacher.id, // Unique identifier
                label: teacher.name, // Teacher's name
            }));
            setTeacherOptions(formattedOptions || []);
        } catch (error) {
            toast.error(error.message || "Failed to fetch teachers");
        }
    };
    fetchTeachers();
}, [dispatch]);


  const handleAdd = async () => {
    try {
      // Ensure all necessary fields are in the formData before submitting
      const payload = {
        Class: `${studentClass?.Class}-${studentClass?.section}`,
        subject: formData.subject,
        teacherId: formData.teacherId,
        teacherName: formData.teacherName,
        rating: formData.rating,
      };

      console.log(payload);

      await dispatch(addFeedback({ payload })).unwrap();
      toast.success("Feedback added successfully!");

      // Reset the form data
      setFormData({
        Class: "",
        subject: "",
        teacherId: "",
        teacherName: "",
        rating: "",
      });
    } catch (error) {
      toast.error(
        error || "Failed to add feedback. Please fix errors."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTeacherChange = (e) => {
    const selectedTeacher = e.target.value;
    const selectedTeacherData = teacherOptions.find(
      (teacher) => teacher.value === selectedTeacher
    );
    setFormData({
      ...formData,
      teacherId: selectedTeacherData?.value || "",
      teacherName: selectedTeacherData?.label || "",
    });
  };

  return (
    <div className="w-full mx-auto pt-4">
      {/* Feedback List */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {filteredFeedback?.map((faq, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg border">
            <div className="font-semibold flex items-center justify-between mb-2">
              <h1>{faq?.teacherName}</h1>
            </div>
            <Rating
              value={faq.rating}
              cancel={false}
              readOnly
              onIcon={
                <i
                  className="pi pi-star-fill"
                  style={{ fontSize: "25px", color: "#007bff" }}
                ></i>
              }
              offIcon={
                <i className="pi pi-star" style={{ fontSize: "25px" }}></i>
              }
            />

            {/* <p>{faq.rating}</p> */}
            <div className="font-semibold flex items-center justify-between mt-2 gap-5">
              <h1>{faq.Class}</h1>
              <h1>{new Date(faq?.createdAt).toLocaleDateString()}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <Pagination />
      </div>
      {/* Feedback Stars */}
      <div className="mt-8 bg-gray-50 p-8 ">
        <div className="text-lg font-semibold mb-2">
          Enter your feedback here...
        </div>

        <div className="card flex justify-start border rounded-lg	mb-8 p-4 ">
          <Rating
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.value })}
            cancel={false}
            onIcon={
              <i
                className="pi pi-star-fill"
                style={{ fontSize: "25px", color: "#007bff" }}
              ></i>
            }
            offIcon={
              <i className="pi pi-star" style={{ fontSize: "25px" }}></i>
            }
            style={{ outline: 'none', boxShadow: 'none' }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between mt-4">
          {/* Teacher Dropdown */}
          <div className="flex flex-col items-start justify-start gap-2 md:mb-4">
            <h2 className="font-semibold">Select Teacher</h2>
            <TeacherDropdown
              label="Teacher"
              id="teacherDropdown"
              options={teacherOptions} // Pass teacherOptions here
              onChange={handleTeacherChange}
              selectedOption={formData.teacherId}
              className="border-slate-300 shadow-lg p-4 rounded-lg"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col items-start justify-start gap-2">
            <h2 className="font-semibold">Select Subject</h2>
            <SubjectTypeDropdown
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex items-center justify-end">
        <ButtonText
          label="Submit"
          backgroundColor="#00A943"
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default StudentFeedback;
