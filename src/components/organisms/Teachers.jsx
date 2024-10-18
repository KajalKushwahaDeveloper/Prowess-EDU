import React from 'react';
import 'primeicons/primeicons.css';
        

function Teachers() {
    const teachers = [
        {
            id: 1,
            name: 'Vikas',
            email: 'vikas@gmail.com',
            phone: '9985562365',
            qualification: 'MCA',
        },
        {
            id: 2,
            name: 'Saurabh',
            email: 'saurabh@gmail.com',
            phone: '9187654321',
            qualification: '5th Fail',
        },
    ];

  return (
    <div>
      <div className='flex justify-between m-5'>
        <h1 className='text-2xl font-semibold'>Teachers</h1>
        <button className='w-[238px] h-[50px] sm:min-w-[180px] min-h-[40px] text-white bg-[#004871] rounded-lg'><i className="pi pi-check"></i>Add new Teacher</button>
      </div>
      <hr />
      <h3 className='text-lg font-bold m-5'>Teachers list</h3>
      <div>
      <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Id</th>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Teacher Name</th>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Email</th>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Phone</th>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Qualification</th>
                        <th className="px-6 py-3 border-b font-medium bg-gray-100 text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{teacher.id}</td>
                            <td className="px-6 py-4 border-b">{teacher.name}</td>
                            <td className="px-6 py-4 border-b">{teacher.email}</td>
                            <td className="px-6 py-4 border-b">{teacher.phone}</td>
                            <td className="px-6 py-4 border-b">{teacher.qualification}</td>
                            <td className="px-6 py-4 border-b">
                                <button className="text-blue-600 hover:underline mr-2"><i className="pi pi-plus"></i>Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Teachers