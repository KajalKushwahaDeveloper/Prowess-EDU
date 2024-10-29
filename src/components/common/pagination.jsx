import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    // Generate page numbers dynamically
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Left Arrow */}
            <button
                className={`p-2 ${currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
            >
                <FaArrowLeft />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none hover:text-gray-400 ${currentPage === page ? 'bg-blue-500 text-white' : ''
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Right Arrow */}
            <button
                className={`p-2 ${currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
