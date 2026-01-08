import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    if (!validator.isEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setError("Invalid password");
      return;
    }
    const res = await axios.post(
      BASE_URL + "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    if (!res.data) {
      setError("Invalid credentials");
      return;
    }
    // console.log(res.data)
    dispatch(addUser(res.data));
    toast.success("Login successful");
    navigate("/home");
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    if (!firstName || firstName === "") {
      setError("First name is required");
      return;
    }
    if (!lastName || lastName === "") {
      setError("Last name is required");
      return;
    }
    if (!department || department === "") {
      setError("Department is required");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setError("Invalid password");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        { email, password, firstName, lastName, department },
        { withCredentials: true }
      );
      if (!res.data) {
        setError("Invalid credentials");
        return;
      }
      // console.log(res.data);
      dispatch(addUser(res.data));
      toast.success("Signup successful");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error signing");
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome</h2>
            <p className="text-gray-400 mt-2 text-2xl">
              {isLoginForm ? "Sign in" : "Signup "}
            </p>
          </div>

          <div className="space-y-6">
            {!isLoginForm && (
              <>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select your department</option>
                    <option value="comps">COMPS</option>
                    <option value="it">IT</option>
                    <option value="mech">MECH</option>
                    <option value="extc">EXTC</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-16">
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-error text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent to-warning hover:from-warning hover:to-accent text-white font-semibold py-3 px-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={isLoginForm ? handleSubmit : handleSignup}
            >
              {loading ? <Loader2 className="animate-spin" /> : isLoginForm ? "Sign in" : "Signup "}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Signup" : "Sign in "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
