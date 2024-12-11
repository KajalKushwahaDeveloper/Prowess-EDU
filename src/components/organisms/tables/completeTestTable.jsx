import Table from "../../common/Table";

const CompletedTestTable = ({ filteredTest }) => {
    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1, // Dynamically generate serial number
        },
        { field: "subject", header: "Subject" },
        { field: "topic", header: "Topic" },
        { field: "startDate", header: "Start Date" },
        { field: "startTime", header: "Start Time" },
        { field: "endTime", header: "End Time" },
        { field: "status", header: "Status" },
    ];

    return (
        <>
            <div>
                <h1 className="text-black font-bold text-xl mb-4">
                    Completed Test
                <hr className="mt-2" />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-8">
                    <Table
                        data={filteredTest}
                        columns={columns}
                        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
                    />
                </div>
            </div>
        </>
    );
};


export default CompletedTestTable;
