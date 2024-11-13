import WeakAreaTable from "../../components/organisms/tables/weakAreaTable";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Calender from "../../components/atoms/calender";
const ParentDashboardWeakArea = () => {
  return (
    <>
      <div className="admin-dashboard m-6 dashboard z-1">
        <div className="my-4">
          <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
            <div>
              <h2 className="font-bold text-2xl">Weak Area</h2>
            </div>
            <div className="flex justify-evenly items-center md:">
              <div>
                <Calender />
              </div>
              <div>
                <Button
                  icon={Icons.downloadIcon}
                  // onClick={handleDownload}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        <div>
          <div className="md:overflow-none overflow-x-auto mb-16">
            <WeakAreaTable />
          </div>
        </div>
      </div>
    </>
  );
};
export default ParentDashboardWeakArea;
