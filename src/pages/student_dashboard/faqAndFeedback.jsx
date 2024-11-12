import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentFAQ from "../../components/common/studentFAQ";
import StudentFeedback from "../../components/common/studentFeedback";
import Calender from "../../components/atoms/calender";

const FAQFeedback = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("FAQ"); // State to manage active tab

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-3xl md:text-2xl">FAQ/Feedback</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />

            {/* Tab Header */}
            <div className="w-full mx-auto p-2 ">
                <div className="flex space-x-6 border-b-2 pb-4">
                    <button 
                        onClick={() => setActiveTab("FAQ")} 
                        className={`text-xl font-semibold ${activeTab === "FAQ" ? "text-[#004871] border-b-2 border-[#004871]" : "text-gray-500"}`}
                    >
                        FAQ    
                    </button>
                    <button 
                        onClick={() => setActiveTab("Feedback")} 
                        className={`text-xl font-semibold ${activeTab === "Feedback" ? "text-[#004871] border-b-2 border-[#004871]" : "text-gray-500"}`}
                    >
                        Feedback
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="w-full mx-auto p-6 bg-gray-50">
                {activeTab === "FAQ" && <StudentFAQ />}
                {activeTab === "Feedback" && <StudentFeedback />}
            </div>
        </div>
    );
};

export default FAQFeedback;
