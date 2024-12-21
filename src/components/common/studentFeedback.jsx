import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Button from "../atoms/button";
import { Icons } from "../../assets/icons";
import Dropdown from "../molecules/dropdown";
import { addFeedback , getTeachersForStudent} from "../../features/dashboardSharedApi/studentDashboardFeedbackReducer";

const StudentFeedback = ({ filteredFeedback }) => {
  const [open, setOpen] = useState(null);
  const [formData, setFormData] = useState({
    Class: "",
    subject: "",
    teacherId: "",
    teacherName: "",
    feedbackText: "",
  })
  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index); // Toggle FAQ open/close
  };

  const handleAdd = async () => {
    try {
      await dispatch(addFeedback({ payload: formData })).unwrap();
      toast.success(data?.data?.message || "Feedback added successfully!");

      // Validate the form data
      setFormData({
        Class: "",
        subject: "",
        teacherId: "",
        teacherName: "",
        feedbackText: "",
      });
      setVisible(false);

    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log("Validation errors:", formattedErrors);
      setErrors(formattedErrors);
      toast.error(error || "Failed to add Feedback. Please fix errors.");
      console.log("Validation or API errors:", error);
    }
  };

  // const faqs = [
  //   {
  //     question: "What is Lorem Ipsum?",
  //     answer:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry An unknown printer took a galley of type and scrambled it to make a type specimen book .",
  //   },
  //   {
  //     question: "Why do we use it?",
  //     answer:
  //       "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
  //   },

  // ];

  return (
    <div className="w-full mx-auto pt-4">
      <div className=" flex items-center justify-between gap-2  lg:flex-row">
        {filteredFeedback.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-lg rounded-lg border"
          >
            <div className="font-semibold flex items-center justify-between mb-2">
              <h1>{faq?.teacherName}</h1>
              <h1>{faq.Class}</h1>
            </div>
            <p>{faq.feedbackText}</p>
            <div className="font-semibold flex items-center justify-between mt-2">
              <h1>{faq?.studentName}</h1>
              <h1>{new Date(faq?.createdAt).toLocaleDateString()}</h1>

            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-16">
        <Pagination />
      </div>
      {/* {/ Query Section /} */}
      <div className="mt-8">
        <div className="text-lg font-semibold mb-2">Enter your Query here...</div>
        <div className="relative">
          <textarea
            className="w-full h-24 p-2 border shadow-lg rounded-lg resize-none focus:outline-none"
            placeholder="Enter your Query here..."
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start justify-start gap-2">
            <h2 className="font-semibold">Select Teacher</h2>
            <Dropdown className="border-slate-300 shadow-lg p-4 rounded-lg" label="Teacher" />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <h2 className="font-semibold">Select Subject</h2>
            <Dropdown className="border-slate-300 shadow-lg p-4 rounded-lg" label="Subject" />
          </div>
        </div>

        {/* </div> */}
      </div>
      <div className="mt-8 flex items-center justify-end">
        <Button label="Submit" backgroundColor="#00A943" onClick={handleAdd} />
      </div>
    </div>
  );
};

export default StudentFeedback;

