import Calender_Download_Component from "../../components/common/calender_download";
import StrongAreaTable from "../../components/organisms/tables/strongAreaTable";

const ParentDashboardStrongArea = () => {
    return (
        <>
            <div className="admin-dashboard m-6 dashboard z-1">
                <div className="my-4">
                    <Calender_Download_Component />
                </div>
                <hr />
                <div>
                    <div className="md:overflow-none overflow-x-auto mb-16">
                        <StrongAreaTable/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ParentDashboardStrongArea;