import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Table = ({ data = [], columns = [] }) => {
  return (
    <div className="table-wrapper p-2">
      <DataTable
        value={data}
        responsiveLayout="scroll"
        style={{
          fontSize: "1rem",
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
            body={col.body}
            headerClassName="p-2 text-center bg-gray-200" // Centers header text
            className="p-2 text-center" // Centers body text
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;
