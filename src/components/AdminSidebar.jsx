import { NavLink } from "react-router-dom";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
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
        className={`fixed top-0 left-0 h-full w-72 bg-blue-700 text-white flex flex-col shadow-xl z-50 transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      >

        <div className="flex justify-between items-center p-8 border-b border-blue-500">

          <h1 className="text-3xl font-bold">

            Admin

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
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-blue-600"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/students"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-blue-600"
          >
            Students
          </NavLink>

          <NavLink
            to="/admin/organizers"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-blue-600"
          >
            Organizers
          </NavLink>

          <NavLink
            to="/admin/events"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-blue-600"
          >
            Events
          </NavLink>

          <NavLink
            to="/admin/certificates"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-blue-600"
          >
            Certificates
          </NavLink>

        </nav>

        <button
          onClick={logout}
          className="m-4 bg-red-600 py-3 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </aside>

    </>
  );
};

export default AdminSidebar;