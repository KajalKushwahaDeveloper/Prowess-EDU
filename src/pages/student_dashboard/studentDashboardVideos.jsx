import { useState } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import ChapterModal from "../../components/organisms/modals/chapterModal"; 

function StudentDashboardVideos() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const cardDetails = [
        { chapter: "Chapter 1", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 2", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 3", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 4", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 5", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 6", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 7", cardStyle: { backgroundColor: "#EEDFF7" } },
        { chapter: "Chapter 8", cardStyle: { backgroundColor: "#EEDFF7" } },
    ];

    const handleCardClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalVisible(true);
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
                <h2 className="font-semiBold text-xl md:text-2xl text-[#0069A4] mb-4">Hindi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-4 md:gap-4 sm:gap-2">
                    {cardDetails.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData.chapter)}>
                            <Card
                                cardHeading={currentData.chapter}
                                cardStyle={currentData.cardStyle}
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
                    chapterName={selectedChapter}
                />
            )}
        </div>
    );
}

export default StudentDashboardVideos;
