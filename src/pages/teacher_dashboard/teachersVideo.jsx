import { useState, useEffect } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import TodayTopicVideoTable from "../../components/organisms/tables/todaysTopicVideo";
import AddNewVideoModal from "../../components/organisms/modals/addNewVideomodal";

const TeacherDashboardVideos = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add");
  const [currentStudent, setCurrentStudent] = useState(null);
  const [videos, setVideos] = useState([]); // State to store video list
  const pageSize = 10;

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleAddStudent = () => {
    setModalMode("add");
    setCurrentStudent(null);
    setVisible(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Callback to handle new or updated video
  const handleVideoSuccess = (video) => {
    setVideos((prevVideos) => {
      if (modalMode === "add") {
        return [video, ...prevVideos]; // Add new video to the list
      } else if (modalMode === "edit") {
        return prevVideos.map((v) => (v.id === video.id ? video : v)); // Update the edited video
      }
      return prevVideos;
    });
  };

  const paginatedVideos = videos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="admin-dashboard m-6 dashboard">
      {/* Header Section */}
      <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row pb-2">
        <h1 className="text-black font-bold text-2xl mb-2">Videos</h1>
        <div className="flex items-center justify-center">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            label="Upload new video"
          />
        </div>
      </div>
      <hr />

      {/* Table Section */}
      <div className="mt-8">
        <h1 className="text-black font-bold text-xl mb-4">
          Today's Topic Videos
          <hr className="mt-2" />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TodayTopicVideoTable
            students={paginatedVideos}
            setModalMode={setModalMode}
            modalMode={modalMode}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(videos.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add New Video Modal */}
      <AddNewVideoModal
        visible={visible}
        setVisible={handleModalClose}
        mode={modalMode}
        initialData={currentStudent}
        onSuccess={handleVideoSuccess} // Pass callback to handle success
      />
    </div>
  );
};
export default TeacherDashboardVideos;