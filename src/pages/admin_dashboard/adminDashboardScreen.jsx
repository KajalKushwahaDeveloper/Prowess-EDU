import Table from "../../components/organisms/Table";
import { useState } from "react";

function AdminDashboard() {
    const [products, setProducts] = useState("")
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
      ];

  return (
    <div className="admin-dashboard m-6 dashboard">
      <div>
        <h1 className="text-black font-bold text-2xl mb-4">
          New joining (Teacher)
        <hr />
        </h1>
       <div className="md:overflow-none overflow-x-auto mb-16">
       <Table data={products} columns={columns} tableStyle={{ minWidth: '40rem' , fontSize:"1.3rem"}}  />
       </div>
      </div>
      <div>
        <h1 className="text-black font-bold text-2xl mb-4">
          New joining (Student)
        <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
       <Table data={products} columns={columns} tableStyle={{ minWidth: '40rem' , fontSize:"1.3rem"}}  />
       </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
