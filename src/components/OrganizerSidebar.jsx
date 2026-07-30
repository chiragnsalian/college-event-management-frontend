import { NavLink, useNavigate } from "react-router-dom";

const OrganizerSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (
    <>

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col shadow-xl z-50 transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      >

        <div className="flex justify-between items-center px-6 py-6 border-b border-blue-500">

          <h1 className="text-2xl font-bold">

            Organizer

          </h1>

          <button
            className="lg:hidden text-3xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

        </div>

        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/organizer/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded hover:bg-blue-600"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/organizer/create-event"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded hover:bg-blue-600"
          >
            Create Event
          </NavLink>

          <NavLink
            to="/organizer/manage-events"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded hover:bg-blue-600"
          >
            Manage Events
          </NavLink>

          <NavLink
            to="/organizer/attendance"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded hover:bg-blue-600"
          >
            Attendance
          </NavLink>

        </nav>

        <button
          onClick={logout}
          className="m-4 bg-red-500 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </aside>

    </>
  );

};

export default OrganizerSidebar;