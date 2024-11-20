import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Home Content</h1>

          {/* First Grid - Larger cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold mb-3">Grid Item {item}</h2>
                <p className="text-gray-600">
                  This is a brief description for grid items {item}.
                </p>
              </div>
            ))}
          </div>

          {/* Second Grid - Smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Second Grid Item {item}
                </h3>
                <p className="text-gray-600 text-sm">
                  This is a smaller grid item in the second grid.
                </p>
              </div>
            ))}
          </div>

          {/* Large Content Area */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-2xl font-bold mb-4">Large Content Area</h2>
            <p className="text-gray-600 mb-6">
              This is a large div at the bottom of the page. It can contain more
              detailed information, a call to action, or any other content that
              needs more space.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
              Call to Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
