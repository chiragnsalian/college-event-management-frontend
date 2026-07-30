import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Events",
      path: "/events",
      icon: "📅",
    },
    {
      name: "My Registrations",
      path: "/registrations",
      icon: "📝",
    },
    {
      name: "Certificates",
      path: "/certificates",
      icon: "📜",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col shadow-xl z-50 transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-blue-500">

          <div>
            <h1 className="text-2xl font-bold">
              Event Portal
            </h1>

            <p className="text-blue-200 text-sm mt-1">
              College Event Management
            </p>
          </div>

          <button
            className="lg:hidden text-3xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 mt-6">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-6 py-4 text-lg transition

              ${
                location.pathname === item.path
                  ? "bg-white text-blue-700 font-bold"
                  : "hover:bg-blue-600"
              }`}
            >
              <span className="mr-3">
                {item.icon}
              </span>

              {item.name}
            </Link>

          ))}

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="m-6 bg-red-500 hover:bg-red-600 rounded-lg py-3 font-semibold"
        >
          🚪 Logout
        </button>

      </aside>
    </>
  );
}

export default Sidebar;