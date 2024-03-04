import { Link, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.scss";

type Links = {
  title: string;
  href: string;
};

const Dashboard = () => {
  const location = useLocation();

  const linkArray: Links[] = [
    {
      title: "Location",
      href: "/location",
    },
    { title: "My Favorite", href: "/favorites" },
  ];

  return (
    <div className="dashboard_container">
      <div className="navbar">
        <div>Rick and Morty</div>
        <nav className="navbar_links">
          {" "}
          {linkArray.map((item) => (
            <Link
              className={location.pathname == item.href ? "active" : ""}
              key={item.href}
              to={item.href}
            >
              {" "}
              {item.title}{" "}
            </Link>
          ))}{" "}
        </nav>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
