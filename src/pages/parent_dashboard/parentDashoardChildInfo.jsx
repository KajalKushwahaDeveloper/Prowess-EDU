import { useState, useEffect } from "react";
import { getChildInfoForParent } from "../../features/dashboardSharedApi/parentDashboardReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ParentDashboardStudentDetailTable from "../../components/organisms/tables/studentDetailTablePD";

const ParentDashboardChildInfo = () => {
  const [studentData, setStudentData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChildInfoForParent())
      .unwrap()
      .then((response) => {
        setStudentData(response || []);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  return (
    <div className="admin-dashboard m-6 dashboard z-1">
      <div className="my-4">
        <h2 className="font-bold text-3xl">Student Detail</h2>
      </div>
      <hr className="mb-4" />
      <div className="md:overflow-none overflow-x-auto mb-16">
        <ParentDashboardStudentDetailTable studentData={studentData} />
      </div>
    </div>
  );
};

export default ParentDashboardChildInfo;
