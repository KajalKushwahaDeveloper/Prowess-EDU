import Table from "../../common/Table";

const CompletedAssignmentsTable = ({ filteredAssignment }) => {
    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1, // Dynamically generate serial number
        },
        { field: "subject", header: "Subject" },
        { field: "startDate", header: "Start Date" },
        { field: "endDate", header: "End Date" },
        { field: "topic", header: "Topic" },
        {
            field: "assignFile",
            header: "Upload Assignment",
            body: (rowData) => (
                <button
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => window.open(rowData.assignFile, "_blank")}
                >
                    Download
                </button>
            )
        },
        { field: "status", header: "Status" },
    ];

    return (
        <>
            <div>
                <h1 className="text-black font-bold text-xl mb-4">
                    Completed Assignments
                    <hr className="mt-2" />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-8">
                    <Table
                        data={filteredAssignment}
                        columns={columns}
                        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
                    />
                </div>
            </div>
            {/* Table rendering */}

        </>
    );
};


export default CompletedAssignmentsTable;
