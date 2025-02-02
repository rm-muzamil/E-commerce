import Sidebar from "../../components/admin/Sidebar";
import Overview from "../../components/admin/Overview";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Overview />
      </div>
    </div>
  );
};

export default Dashboard;
