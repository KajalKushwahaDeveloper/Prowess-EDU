import { useState, useEffect } from "react";
// import TeacherDropdown from "../../components/molecules/teacherDropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import ChapterModal from "../../components/organisms/modals/chapterModal";
import { useSelector } from "react-redux";
import { getNewVideosForStudent } from "../../features/dashboardSharedApi/studentDashboardvideosReducer";
import { useDispatch } from "react-redux";
import  Spinner  from "../../components/atoms/Loader"; // Assuming you have a Spinner component

function StudentDashboardVideos() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const dispatch = useDispatch();


  const { videoData, loading, error } = useSelector(
    (state) => state.studentDashboardNewVideosSharedApi
  );
  const studentClass = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    // Fetch reports on mount
    dispatch(getNewVideosForStudent({ classId: `${studentClass?.Class}-${studentClass?.section}` }))
      .unwrap()
      .then((response) => setFilteredVideos(response.videos)) // Initialize local state
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);
  console.log("videoData:", filteredVideos?.subject);

  const handleCardClick = (chapterData) => {
    console.log("chapterData:", chapterData);

    setSelectedChapter(chapterData?.chapter); // Store the selected chapter name
    setSelectedTopics(chapterData?.topic || []); // Store the topics related to the chapter
    setSelectedUrl(chapterData?.videoFile || []); // Store the video file URLs
    setIsModalVisible(true); // Show the modal
  };

  return (
    <>
    {loading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-45">
        <Spinner /> {/* Replace with your actual spinner component */}
      </div>
    ) : (
    <div className="admin-dashboard mx-6 mt-6 dashboard z-1">
      <div className="my-4">
        <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
          <h2 className="font-bold text-xl md:text-2xl">Videos</h2>
          <div className="flex justify-evenly items-center space-x-4">
            {/* <Dropdown label="Teacher" /> */}
            <Calender />
          </div>
        </div>
      </div>
      <hr className="mb-6" />
      <div>
        <h2 className="font-semiBold text-xl md:text-2xl text-[#0069A4] mb-4">
        {filteredVideos?.[0]?.subject || 'No subject available'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {filteredVideos?.map((currentData, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(currentData)}
              className="w-full"
            >
              <Card
                cardHeading={`Chapter ${currentData?.chapter}`}
                cardStyle={{ backgroundColor: "#EEDFF7" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Modal */}
      {selectedChapter && (
        <ChapterModal
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          chapterNo={selectedChapter} // Pass the selected chapter
          topics={selectedTopics}    // Pass the topics of the selected chapter
          selectedUrl={selectedUrl}  // Pass the video URLs of the selected chapter
        />
      )}

    </div>
    )}
    </>
  );
}

export default StudentDashboardVideos;
