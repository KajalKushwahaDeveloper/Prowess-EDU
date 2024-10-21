import { useState } from "react";
import { Calendar } from "primereact/calendar";

const Calender = () => {
  const [date, setDate] = useState(null);

  return (
    <div>
      <span className="p-input-icon-right w-full">
        <Calendar
          id="birth_date"
          value={date}
          onChange={(e) => setDate(e.value)}
          placeholder="Select Date"
        />
        <i className="pi pi-calendar" />
      </span>
    </div>
  );
};

export default Calender;
