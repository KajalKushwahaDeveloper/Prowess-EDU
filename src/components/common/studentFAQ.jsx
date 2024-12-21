import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../common/pagination";
import Button from "../atoms/button";
import { Icons } from "../../assets/icons";
import { addFaq } from "../../features/dashboardSharedApi/studentDashboardFaqReducer";

const StudentFAQ = ({ filteredFaq }) => {
  const [open, setOpen] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState("");
  const dispatch = useDispatch();

  const studentClass = JSON.parse(localStorage.getItem("data")); // Assuming class and section are in localStorage

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  const handleAdd = async () => {
    if (!faqQuestion.trim()) {
      toast.error("Please enter a question.");
      return;
    }
  
    // Prepare the payload
    const payload = {
      Class: `${studentClass?.Class}-${studentClass?.section}`,
      subject: studentClass.subject, // You can change this to be dynamic if needed
      faqQuestion: faqQuestion,
    };
  
    // Get the token from localStorage (or wherever it's stored)
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  
    if (!token) {
      toast.error("Authorization token is missing.");
      return;
    }
  
    // Prepare the headers with Authorization token
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    try {
      // Dispatch the addFaq action with headers
      const response = await dispatch(addFaq({ payload, headers })).unwrap();
      toast.success(response?.message || "FAQ added successfully!");
  
      // Reset the textarea after successful submission
      setFaqQuestion("");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ. Please try again.");
    }
  };
  

  return (
    <div className="w-full mx-auto pt-4 bg-gray-50">
      {/* FAQ Section */}
      <div className="space-y-4">
        {filteredFaq?.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg border cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg text-gray-800">
                Q.{index + 1} {faq.faqQuestion}
              </div>
              <div>
                {open === index ? (
                  <i className={Icons.angleDown} />
                ) : (
                  <i className={Icons.angleRight} />
                )}
              </div>
            </div>
            {open === index && (
              <div className="mt-2 text-gray-600">
                {faq.faqAnswer ? faq.faqAnswer : "Answer not provided."}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-10">
        <Pagination />
      </div>

      {/* Add FAQ Section */}
      <div className="mt-10">
        <div className="text-lg font-semibold mb-2 text-gray-800">
          Enter your FAQ Question
        </div>
        <textarea
          className="w-full h-24 p-3 border shadow-lg rounded-lg resize-none focus:outline-none"
          placeholder="Enter your FAQ question here..."
          value={faqQuestion}
          onChange={(e) => setFaqQuestion(e.target.value)}
        />
        <div className="mt-6 flex justify-end">
          <Button label="Submit" backgroundColor="#00A943" onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default StudentFAQ;
