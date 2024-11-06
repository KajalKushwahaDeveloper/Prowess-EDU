import StudentFAQ from "../../components/common/studentFAQ";
import StudentFeedback from "../../components/common/studentFAQ";
import Calender from "../../components/atoms/calender";
import { Link, useNavigate } from "react-router-dom";

const FAQFeedback = () => {
    const navigate =  useNavigate();
    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col ">
                    <h2 className="font-bold text-3xl md:text-2xl">FAQ/Feedback</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            {/* <div className="w-full mx-auto p-6">
                <div className="flex space-x-4"> */}
                    {/* <StudentFAQ onClick={()=>navigate("/studentFaq")}/>
                    <StudentFeedback onClick={()=>navigate("/studentFeedback")}/> */}
                    {/* <Link to="/studentFaq" className="text-xl font-regular text-[#004871]">
                        FAQ
                    </Link>
                    <Link to="/studentFeedback" className="text-xl font-regular text-gray-500">
                        Feedback
                    </Link>
                </div>
            </div> */}
        </div>
    )
}
export default FAQFeedback;