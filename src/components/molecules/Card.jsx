const Card = ({ cardStyle, cardHeading, totalNumber,iconClass, date_time, totalNumberClass, iconBorderClass }) => {
  return (
    <>
      <div
        className="relative flex flex-col mt-6 mb-6 shadow-sm border border-slate-200 rounded-lg  lg:max-w-[300px] w-full cursor-pointer"
        style={cardStyle}
      >
        <div className="px-4 py-8 flex items-center justify-center flex-col">
          <h5 className="mb-2 text-slate-800 text-xl font-semibold">
            {cardHeading}
          </h5>
          <h1 className={`mb-2 text-slate-800 font-bold text-2xl ${totalNumberClass}`}>
          {totalNumber}
        </h1>
          <h1 className="mb-2 text-slate-800 text-base font-normal">{date_time}</h1>
        </div>
        
         {/* Icon Overlay */}
         {iconClass && (
               <div className={`absolute bg-blue-500 right-0 bottom-0 px-3 py-1 rounded-br-xl rounded-tl-xl ${iconBorderClass}`}>
                    <i className={`${iconClass} text-white`} /> {/* Render icon here */}
                </div>
            )}
      </div>
    </>
  );
};

export default Card;
