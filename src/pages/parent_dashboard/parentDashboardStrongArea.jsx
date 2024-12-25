import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChildReportsForParent } from "../../features/dashboardSharedApi/parentDashboardReducer";
import StrongAreaTable from "../../components/organisms/tables/strongAreaTable";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Calender from "../../components/atoms/calender";
import { useDownloadCsv } from "../../hooks/useDownload";


const ParentDashboardStrongArea = () => {
  const [strongReports, setStrongReports] = useState([]);
  const downloadCsv = useDownloadCsv();
  
  const dispatch = useDispatch();
  const handleDownload = () => {
    if (strongReports.length === 0) {
      alert("No strong area data available to download.");
      return;
    }
    downloadCsv(strongReports, "strong_area_reports.csv");
  };
  useEffect(() => {
      dispatch(getChildReportsForParent())
          .unwrap()
          .then((response) => {
              // Filter reports based on level
              const strong = response.reports.filter((report) => report.level === "Strong");
              // const weak = response.reports.filter((report) => report.level === "Weak");

              setStrongReports(strong);
              // setWeakReports(weak);
          })
          .catch((err) => {
              console.error("Failed to fetch reports:", err);
          });
  }, [dispatch]);
  return (
    <>
      <div className="admin-dashboard m-6 dashboard z-1">
        <div className="my-4">
          <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
            <div>
              <h2 className="font-bold text-2xl">Strong Area</h2>
            </div>
            <div className="flex justify-evenly items-center md:">
              {/* <div>
                <Calender />
              </div> */}
              <div>
                <Button
                  icon={Icons.downloadIcon}
                  onClick={handleDownload}
                  />
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        <div>
          <div className="md:overflow-none overflow-x-auto mb-16">
            <StrongAreaTable strongReports={strongReports}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default ParentDashboardStrongArea;
