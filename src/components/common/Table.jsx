import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Table = ({ data = [], columns = [] }) => {
  return (
    <div className="table-wrapper p-2">
      <DataTable
        value={data}
        responsiveLayout="scroll" // Ensures that the table is scrollable on small screens
        style={{
        //   minWidth: "40rem",
          fontSize: "1.1rem",
          textAlign: "center",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        className="p-datatable-gridlines"
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.body} // Allow custom body renderers for actions
            headerClassName="p-2 text-center bg-gray-200"
            className="text-center p-2 border-b"
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;