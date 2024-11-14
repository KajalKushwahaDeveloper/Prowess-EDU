import { Icons } from "../../assets/icons";

const ViewAll = ({showAll, setShowAll}) => {
    
    return (
        <>
            <div 
                className="flex items-center justify-end space-x-1 cursor-pointer"
                onClick={() => setShowAll(!showAll)}
                >
                <i className={showAll ? Icons.leftArrow : Icons.rightArrow} style={{ color: '#FF8A00' }}></i>
                <p className="text-[#004871]">
                {showAll ? "View Less" : "View All"}
                </p>
            </div>
      </>
    );
};

export default ViewAll;
