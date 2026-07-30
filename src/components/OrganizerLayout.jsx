import { useState } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import OrganizerSidebar from "./OrganizerSidebar";

const OrganizerLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="relative min-h-screen bg-gray-100">

      <OrganizerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-64">

        <OrganizerNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>

  );

};

export default OrganizerLayout;