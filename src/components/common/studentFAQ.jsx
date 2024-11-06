import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Button from "../atoms/button";
import { Icons } from "../../assets/icons";

const StudentFAQ = () => {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index); // Toggle FAQ open/close
  };

  const faqs = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. An unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Why do we use it?",
      answer:
        "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
    },
    {
      question: "Where does it come from?",
      answer:
        "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gray-50">
      {/* Header Tabs */}
      <div className="flex space-x-6 border-b-2 pb-4">
        <Link to="/studentFaq" className="text-xl font-semibold text-blue-900">
          FAQ
        </Link>
        <Link to="/studentFeedback" className="text-xl font-semibold text-gray-500">
          Feedback
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 mt-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg border cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg text-gray-800">
                Q.{index + 1} {faq.question}
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
              <div className="mt-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-10">
        <Pagination />
      </div>

      {/* Query Section */}
      <div className="mt-10">
        <div className="text-lg font-semibold mb-2 text-gray-800">Enter your Query here...</div>
        <textarea
          className="w-full h-24 p-3 border shadow-lg rounded-lg resize-none focus:outline-none"
          placeholder="Enter your Query here..."
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <Button label="Submit" backgroundColor="#00A943" />
      </div>
    </div>
  );
};

export default StudentFAQ;
