import { Icons } from "../../assets/icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          className="m-2"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className={Icons.doubleAngleLeft}></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-[#004871]  text-white" : ""
            }`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
           className="m-2"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className={Icons.doubleAngleRight}></i>
        </button>
      </div>
    );
  };
  
  export default Pagination;
  



