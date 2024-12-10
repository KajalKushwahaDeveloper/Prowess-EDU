import { useState } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import ChapterModal from "../../components/organisms/modals/chapterModal";
import { useSelector } from "react-redux";

function StudentDashboardVideos() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState([]);

  const { videoData, loading, error } = useSelector(
    (state) => state.studentDashboardNewVideosSharedApi
  );
  console.log("videoData:", videoData.videos);

  const handleCardClick = (chapterData) => {
    console.log("chapterData:", chapterData);
    
    setSelectedChapter(chapterData?.chapter); // Store the selected chapter name
    setSelectedTopics(chapterData?.topic || []); // Store the topics related to the chapter
    setIsModalVisible(true);
    setSelectedUrl(chapterData?.videoFile || []);
  };

  return (
    <div className="admin-dashboard mx-6 mt-6 dashboard z-1">
      <div className="my-4">
        <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
          <h2 className="font-bold text-xl md:text-2xl">Videos</h2>
          <div className="flex justify-evenly items-center space-x-4">
            <Dropdown label="Teacher" />
            <Calender />
          </div>
        </div>
      </div>
      <hr className="mb-6" />
      <div>
        <h2 className="font-semiBold text-xl md:text-2xl text-[#0069A4] mb-4">
          Hindi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {videoData?.videos?.map((currentData, index) => (
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
          chapterNo={selectedChapter}
          topics={selectedTopics} 
          selectedUrl={selectedUrl}
        />
      )}
    </div>
  );
}

export default StudentDashboardVideos;
