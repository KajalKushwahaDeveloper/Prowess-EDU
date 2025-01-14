import Table from "../../common/Table";

const StrongAreaTable = ({ strongReports }) => {
  const columns = [
    { field: "sID", header: "Id" },
    { field: "subject", header: "Subject" },
    { field: "assignName", header: "Assign Name" },
    { field: "assignMarks", header: "Assign Marks" },
    { field: "testName", header: "Test Name" },
    { field: "testMarks", header: "Test Marks" },
    { field: "recommendation", header: "Recommendation" },
    { field: "comment", header: "Comments" },
  ];

  return (
    <Table
      data={strongReports}
      columns={columns}
      tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
    />
  );
};

export default StrongAreaTable;
