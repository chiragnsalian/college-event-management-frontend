import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>

      {/* Welcome Card */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <h2 className="text-4xl font-bold text-blue-600">
          Welcome, {user.name} 👋
        </h2>

        <p className="text-gray-600 mt-3 text-lg">
          We're glad to have you back.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <div className="bg-gray-100 rounded-xl p-5">

            <h3 className="text-gray-500 font-semibold">
              Email
            </h3>

            <p className="text-lg mt-2">
              {user.email}
            </p>

          </div>

          <div className="bg-gray-100 rounded-xl p-5">

            <h3 className="text-gray-500 font-semibold">
              Role
            </h3>

            <p className="text-lg mt-2 capitalize">
              {user.role}
            </p>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="text-3xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/events")}
          className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div className="text-5xl mb-4">
            📅
          </div>

          <h3 className="text-2xl font-bold">
            Events
          </h3>

          <p className="text-gray-500 mt-3">
            Browse all upcoming college events.
          </p>

        </div>

        <div
          onClick={() => navigate("/registrations")}
          className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div className="text-5xl mb-4">
            📝
          </div>

          <h3 className="text-2xl font-bold">
            My Registrations
          </h3>

          <p className="text-gray-500 mt-3">
            View your registered events.
          </p>

        </div>

        <div
          onClick={() => navigate("/certificates")}
          className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          <div className="text-5xl mb-4">
            📜
          </div>

          <h3 className="text-2xl font-bold">
            Certificates
          </h3>

          <p className="text-gray-500 mt-3">
            Download participation certificates.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;