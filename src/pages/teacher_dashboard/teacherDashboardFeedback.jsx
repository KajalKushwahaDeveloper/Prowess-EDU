import { useState, useEffect } from "react";
import StudentFAQ from "../../components/common/studentFAQ";
import StudentFeedback from "../../components/common/studentFeedback";
import Calender from "../../components/atoms/calender";
import { getFaqsForStudent } from "../../features/dashboardSharedApi/studentDashboardFaqReducer";
import { getFeedbackForTeacher } from "../../features/dashboardSharedApi/teacherDashboardFeedbackReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/atoms/Loader"; // Assuming you have a Spinner component

const FAQFeedback = () => {
  const [filteredFaq, setFilteredFaq] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const dispatch = useDispatch();

  const studentClass = JSON.parse(localStorage.getItem("data"));
  console.log("filteredFaq:", filteredFaq);

  const { error, loading } = useSelector(
    (state) => state.studentDashboardFaqSharedApi
  );
  // useEffect(() => {
  //     // Fetch reports on mount
  //     dispatch(getFaqsForStudent(`${studentClass?.Class}-${studentClass?.section}`))
  //         .unwrap()
  //         .then((response) => {
  //             setFilteredFaq(response || []);
  //         })
  //         .catch((error) => {
  //             toast.error(error || "Failed to fetch FAQs");
  //         });
  //     console.log("getAssign1") // Log the response to check its structure

  // }, [dispatch]);

  useEffect(() => {
    // Fetch reports on mountgetFeedbackForTeacher
    dispatch(getFeedbackForTeacher())
      .unwrap()
      .then((response) => {
        setFilteredFeedback(response?.feedback || []);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
    console.log("getAssign1"); // Log the response to check its structure
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
              <h2 className="font-bold text-3xl md:text-2xl">Feedback</h2>
              <div className="flex justify-evenly items-center space-x-4">
                <Calender />
              </div>
            </div>
          </div>
          <hr className="mb-6" />
          <div className="w-full mx-auto pt-4">
            {/* Feedback List */}
            <div className="flex items-center justify-between gap-2 lg:flex-row">
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
          </div>
        </div>
      )}
    </>
  );
};

export default FAQFeedback;
