import { useState, useEffect } from "react";
import StudentFAQ from "../../components/common/studentFAQ";
import StudentFeedback from "../../components/common/studentFeedback";
import Calender from "../../components/atoms/calender";
import { getFaqsForStudent } from "../../features/dashboardSharedApi/studentDashboardFaqReducer";
import { getFeedbackForStudent } from "../../features/dashboardSharedApi/studentDashboardFeedbackReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import  Spinner  from "../../components/atoms/Loader"; // Assuming you have a Spinner component

const FAQFeedback = () => {
    const [activeTab, setActiveTab] = useState("FAQ");
    const [filteredFaq, setFilteredFaq] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const dispatch = useDispatch();
    
    const studentClass = JSON.parse(localStorage.getItem("data"));
    console.log("filteredFaq:", filteredFaq)

    const { loading } = useSelector(
        (state) => state.studentDashboardFaqSharedApi
      );
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getFaqsForStudent(`${studentClass?.Class}-${studentClass?.section}`))
            .unwrap()
            .then((response) => {
                setFilteredFaq(response || []);
            })
            .catch((error) => {
                toast.error(error || "Failed to fetch FAQs");
            });
        console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getFeedbackForStudent(`${studentClass?.Class}-${studentClass?.section}`))
            .unwrap()
            .then((response) => {
                setFilteredFeedback(response?.feedback || []);

            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");

            });
        console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);
    return (
        <>
        {loading ? ( // Show loader while loading
            <div className="flex justify-center items-center h-45">
            <Spinner /> {/* Replace with your actual spinner component */}
          </div>
        ) : (
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
            <div className="w-full mx-auto p-6 ">
                {activeTab === "FAQ" && <StudentFAQ filteredFaq={filteredFaq} />}
                {activeTab === "Feedback" && <StudentFeedback filteredFeedback={filteredFeedback} />}
            </div>
        </div>
         )}
              </>
    );
};

export default FAQFeedback;
