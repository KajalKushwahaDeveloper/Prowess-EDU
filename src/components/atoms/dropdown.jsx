import { useState } from "react";

const Dropdown = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = [
    { name: "John Doe", code: "JD" },
    { name: "Jane Smith", code: "JS" },
    { name: "Emily Clark", code: "EC" },
    { name: "Michael Johnson", code: "MJ" },
  ];
  return (
    <Dropdown
      value={selectedTeacher}
      onChange={(e) => setSelectedTeacher(e.value)}
      options={teachers}
      optionLabel="name"
      placeholder="Select Teacher"
      className="w-full"
    />
  );
};

export default Dropdown;
