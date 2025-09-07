import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectName = "ProjectManager"; // Replace with your project name

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />

      {/* Glassmorphic 404 Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl text-center transform transition-transform hover:-translate-y-1 hover:shadow-3xl">
        
        {/* Project Name */}
        <h2 className="text-xl font-semibold text-teal-300 mb-2">{projectName}</h2>

        {/* 404 Heading */}
        <h1 className="text-6xl font-extrabold text-teal-400 drop-shadow-lg mb-4">404</h1>

        {/* Polite Message */}
        <p className="text-lg text-gray-200 mb-4">
          Oops! The page <span className="font-semibold text-white">{location.pathname}</span> could not be found.
        </p>
        <p className="text-gray-300 mb-6">
          It seems you may have taken a wrong turn. No worries! Let’s get you back on track.
        </p>

        {/* Return Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-teal-500 hover:to-blue-600 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
