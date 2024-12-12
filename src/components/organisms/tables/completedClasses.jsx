
import Table from "../../common/Table";

const CompletedClassesTable = ({ onlineClass }) => {

    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1,
        },
        { header: "Subject", body: (rowData) => (rowData.subject) || "N/A" },
        { header: "Teacher", body: (rowData) => (rowData?.teacherDetail?.name) || "N/A" },
        { header: "Start Date", body: (rowData) => (rowData.date) || "N/A" },
        { header: "Start Time", body: (rowData) => (rowData.time) || "N/A" },
        { header: "Status", body: (rowData) => (rowData.studentStatus) || "N/A" },
    ];

    return (
        <Table
            data={onlineClass}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
        />
    );
};

export default CompletedClassesTable;
