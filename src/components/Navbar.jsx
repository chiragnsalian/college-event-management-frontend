function Navbar({ setSidebarOpen }) {

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

          <div>

            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">

              Welcome, {user?.name} 👋

            </h1>

            <p className="text-gray-500 text-sm sm:text-base">

              Have a productive day!

            </p>

          </div>

        </div>

        <div className="hidden md:block text-right">

          <p className="font-semibold">

            {user?.email}

          </p>

          <p className="text-gray-500 capitalize">

            {user?.role}

          </p>

        </div>

      </div>

    </header>

  );

}

export default Navbar;