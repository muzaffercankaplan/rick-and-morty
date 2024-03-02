import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <nav>a</nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
