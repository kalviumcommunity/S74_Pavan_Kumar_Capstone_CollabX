import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms && !isLogin) {
      alert("You must accept the terms and conditions.");
      return;
    }
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      alert(isLogin ? "Login successful!" : "Registration successful!");
      console.log(response.data);
    } catch (error) {
      alert("Error: " + error?.response?.data?.error || "Unknown error");
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log(`${provider} login clicked`);
    alert(`${provider} login not implemented yet.`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen text-white overflow-hidden">
      {/* Left Panel with Image and Branding */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-purple-700 to-blue-900 items-center justify-center p-12">
        <div className="text-center">
          <img
            src="../assets/auth.png" // Place your image in the public folder
            alt="CollabX Illustration"
            className="w-3/4 mx-auto mb-6 max-h-[300px] object-contain"
          />
          <h1 className="text-4xl font-bold">CollabX</h1>
          <p className="mt-4 text-lg">EVENTS MADE EFFORTLESS. TEAMS MADE STRONGER.</p>
        </div>
      </div>

      {/* Right Panel with Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black p-6 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "JOIN & CONNECT TO THE COLLABX PLATFORM" : "CREATE YOUR ACCOUNT"}
          </h2>

          {/* OAuth Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6 w-full justify-center">
            <button
              onClick={() => handleOAuthLogin("Google")}
              className="flex items-center justify-center px-4 py-2 bg-white text-black rounded-lg shadow-md hover:shadow-lg w-full md:w-auto"
            >
              <FcGoogle className="mr-2" /> Sign up with Google
            </button>
            <button
              onClick={() => handleOAuthLogin("GitHub")}
              className="flex items-center justify-center px-4 py-2 bg-white text-black rounded-lg shadow-md hover:shadow-lg w-full md:w-auto"
            >
              <FaGithub className="mr-2" /> Sign up with GitHub
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
              required
            />
            {!isLogin && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="mr-2"
                />
                <label className="text-sm">I accept the terms & conditions</label>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition shadow-lg text-white font-semibold"
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <p className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-blue-400 ml-1 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "SIGN UP" : "SIGN IN"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}