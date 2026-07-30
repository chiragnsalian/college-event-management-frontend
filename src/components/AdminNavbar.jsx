const AdminNavbar = ({
  setSidebarOpen,
}) => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <header className="sticky top-0 bg-white shadow-md z-30">

      <div className="flex justify-between items-center px-4 sm:px-8 py-5">

        <div className="flex items-center gap-4">

          <button
            className="lg:hidden text-3xl font-bold"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">

            Admin Panel

          </h1>

        </div>

        <div className="hidden md:block">

          <span className="font-semibold">

            Welcome, {user?.name}

          </span>

        </div>

      </div>

    </header>

  );

};

export default AdminNavbar;