import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";
import ViewAll from "../../common/viewAllFunctionality"
import ViewTDVideoModal from "../modals/viewTDVideoModal";

const TeacherDashboardNewVideoTable = ({ videos }) => {
    const [selectedVideos, setSelectedVideo] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [visible, setVisible] = useState(false);
    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1,
        },
        {
            field: "subject",
            header: "Subject Name",
            body: (rowData) => rowData.subject || "N/A",
        },
        {
            header: "Class",
            body: (rowData) => rowData?.Class || "N/A",
        },
        { header: "Chapter", body: (rowData) => rowData.chapter || "N/A" },
        { header: "Topic", body: (rowData) => rowData.topic || "N/A" },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => {
                return (
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => {
                                setSelectedVideo(rowData); // Set the selected assignment
                                setVisible(true); // Show the modal
                            }}
                            backgroundColor="#00A943"
                            icon={Icons.viewIcon}
                        />
                        
                    </div>
                );
            },
        },
    ];
    const displayedData = showAll ? videos : videos.slice(0, 2)

    return (
        <>
            <Table
                data={displayedData}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            <ViewAll showAll={showAll} setShowAll={setShowAll} />
            {visible && (
        <ViewTDVideoModal
          setVisible={setVisible}
          visible={visible}
          vedioData={selectedVideos} // Pass the selected assignment
        />
      )}
        </>
    );
};

export default TeacherDashboardNewVideoTable;
