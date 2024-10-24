import Calender_Download_Component from "../../components/common/calender_download";
import StrongAreaTable from "../../components/organisms/tables/strongAreaTable";
import WeakAreaTable from "../../components/organisms/tables/weakAreaTable";

const ParentDashboardWeakArea = () => {
    return(
        <>
       <div className="admin-dashboard m-6 dashboard z-1">
                <div className="my-4">
                    <Calender_Download_Component />
                </div>
                <hr />
                <div>
                    <div className="md:overflow-none overflow-x-auto mb-16">
                        <WeakAreaTable/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ParentDashboardWeakArea;