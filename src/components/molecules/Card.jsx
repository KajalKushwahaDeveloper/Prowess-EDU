const Card = ({ cardStyle, newJoiningName, totalNumber }) => {
  return (
    <>
      <div
        className="relative flex flex-col mt-6 mb-6 shadow-sm border border-slate-200 rounded-lg  w-full md:w-96"
        style={cardStyle}
      >
        <div className="px-4 py-8 flex items-center justify-center flex-col">
          <h5 className="mb-2 text-slate-800 text-3xl font-medium">
            {newJoiningName}
          </h5>
          <h1 className="mb-2 text-slate-800 text-3xl font-bold md:text-2xl">{totalNumber}</h1>
        </div>
      </div>
    </>
  );
};

export default Card;
