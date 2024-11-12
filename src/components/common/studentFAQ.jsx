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
    <div className="w-full mx-auto pt-4 bg-gray-50">
  
      {/* FAQ Section */}
      <div className="space-y-4">
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
