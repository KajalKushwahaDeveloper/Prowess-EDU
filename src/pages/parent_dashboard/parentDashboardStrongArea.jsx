import StrongAreaTable from "../../components/organisms/tables/strongAreaTable";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Calender from "../../components/atoms/calender";

const ParentDashboardStrongArea = () => {
    return (
        <>
            <div className="admin-dashboard m-6 dashboard z-1">
                <div className="my-4">
                    <div className="flex justify-between items-center ">
                        <h2 className="font-bold text-3xl">Student Report</h2>
                        <div className="flex justify-evenly items-center space-x-4"> {/* Added space-x-4 for spacing */}

                            <Calender />
                            <Button
                                icon={Icons.downloadIcon}
                            // onClick={handleDownload}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div className="md:overflow-none overflow-x-auto mb-16">
                        <StrongAreaTable />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ParentDashboardStrongArea;