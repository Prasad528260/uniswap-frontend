import React, { useState } from "react";
import { MapPin, Clock, User } from "lucide-react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "accepted":
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleOrderClick = (order) => {
    navigate("/order-details", { state: { order } });
  };

  // --- NEW: Mark as complete ---
  const markAsComplete = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/order/complete/${order._id}`,
        {},
        { withCredentials: true } // use session cookie
      );
      toast.success("Order marked as complete!");
      // Optionally, refresh the page or update state
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to complete order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-gray-700 group">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Seller info and book */}
        <div className="flex-1">
          {/* Seller info */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <img
                src={
                  order.sellerId?.profilePicture ||
                  "https://img.freepik.com/free-vector/man-profile-account-picture_24908-81754.jpg"
                }
                alt={`${order.sellerId?.firstName || "User"} ${
                  order.sellerId?.lastName || ""
                }`}
                className="w-24 h-32 rounded-lg object-cover ring-2 ring-gray-700 group-hover:ring-blue-500/50 transition-all duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-2xl mb-1">
                {order.sellerId?.firstName || "User"}{" "}
                {order.sellerId?.lastName || ""}
              </h3>
              <p className="text-gray-400 text-lg capitalize flex items-center">
                <User className="w-5 h-5 mr-2" />
                {order.sellerId?.department || "N/A"} Department
              </p>
              <span
                className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Book info */}
          <div className="flex space-x-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-24 h-36 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                {order.productId?.bookImg ? (
                  <img
                    src={`${BASE_URL}/uploads/${order.productId.bookImg}`}
                    alt={order.productId.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80 flex items-center justify-center p-2">
                    <div className="text-white text-sm font-bold text-center leading-tight">
                      {order.productId?.title || "Book Title"}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-2xl mb-2 group-hover:text-blue-400 transition-colors">
                {order.productId?.title || "No Title"}
              </h4>
              <p className="text-gray-400 text-lg mb-1">
                by {order.productId?.author || "Unknown Author"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Exchange details & actions */}
        <div className="md:w-1/3 space-y-6">
          {/* Exchange details */}
          <div className="bg-gray-800/50 p-5 rounded-xl">
            <h3 className="text-white font-semibold text-xl mb-4">
              Exchange Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-400 mr-3" />
                <div>
                  <p className="text-gray-400 text-sm">Meet at</p>
                  <p className="text-white font-medium text-lg capitalize">
                    {order.location || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white font-medium text-lg">
                    {order.time || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-6">
            <button
              className="relative px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              onClick={() => handleOrderClick(order)}
            >
              <span className="relative z-10">View Details</span>
            </button>
          </div>

          {order.status === "pending" && (
            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 text-lg mt-4"
              onClick={markAsComplete}
            >
              {loading ? "Completing..." : "Mark as Complete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
