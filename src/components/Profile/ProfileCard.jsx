import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { GraduationCap, BookOpen, Edit3 } from "lucide-react";
const ProfileCard = ({onEdit}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [completedOrders, setCompletedOrders] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        const data = response.data;
        setProfileData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    const getCompletedOrders = async () => {
      try {
        const response = await axios.get(BASE_URL + "/order/completed", {
          withCredentials: true,
        });
        const data = response.data;
        setCompletedOrders(data.length);
        console.log(data);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };
    fetchProfileData();
    getCompletedOrders();
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-gray-600/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Glow Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        </div>
        <div className="flex justify-end mb-4 relative z-10">
          <button
            onClick={onEdit}
            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
              isHovered
                ? "bg-blue-600/20 text-blue-400 border border-blue-400/30"
                : "bg-gray-800/60 text-gray-400 border border-gray-700/30"
            } hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-400/30 backdrop-blur-sm`}
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
        {/* Profile Picture */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <img
              src={profileData.profilePicture}
              alt={`${profileData.firstName} ${profileData.lastName}`}
              className="relative w-32 h-32 rounded-full object-cover ring-4 ring-gray-800 shadow-2xl transition-all duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-6 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {profileData.firstName} {profileData.lastName}
          </h1>
        </div>

        {/* Department and Books Shared */}
        <div className="space-y-4 relative z-10">
          {/* Department */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Department
                  </p>
                  <p className="text-white text-lg font-semibold capitalize">
                    {profileData.department === "comps"
                      ? "Computer Science"
                      : profileData.department}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Books Shared */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Books Shared
                  </p>
                  <p className="text-white text-2xl font-bold">
                    {completedOrders}
                  </p>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
