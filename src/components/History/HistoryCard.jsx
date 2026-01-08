import React from "react";
import { CheckCircle, MapPin, User, Book } from "lucide-react";
import { BASE_URL } from "../../utils/constants";

const HistoryCard = ({ data }) => {
//   console.log(data);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-4 hover:shadow-xl transition-shadow duration-200">
      {/* Header with Status */}
      <div className="px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 bg-green-900 text-green-100">
        <CheckCircle className="w-5 h-5 text-green-400" />
        Completed
      </div>

      {/* Product Information */}
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-5 h-5 text-blue-400" />
          <h4 className="font-semibold text-white">Product</h4>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={`${BASE_URL}/uploads/` + data.productId.bookImg}
            alt={data.productId.title}
            className="w-16 h-20 object-cover rounded-md border border-gray-600"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/64x80?text=Book";
            }}
          />
          <div>
            <h5 className="font-medium text-white">{data.productId.title}</h5>
            <p className="text-gray-300 text-sm">by {data.productId.author}</p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Seller */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Seller</span>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={data.sellerId.profilePicture}
              alt={`${data.sellerId.firstName} ${data.sellerId.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48x48?text=User";
              }}
            />
            <div>
              <h5 className="font-medium text-white">
                {data.sellerId.firstName} {data.sellerId.lastName}
              </h5>
              <p className="text-gray-300 text-sm capitalize">
                {data.sellerId.department}
              </p>
            </div>
          </div>
        </div>

        {/* Receiver */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Receiver</span>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={data.recieverId.profilePicture}
              alt={`${data.recieverId.firstName} ${data.recieverId.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48x48?text=User";
              }}
            />
            <div>
              <h5 className="font-medium text-white">
                {data.recieverId.firstName} {data.recieverId.lastName}
              </h5>
              <p className="text-gray-300 text-sm capitalize">
                {data.recieverId.department}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="border-t border-gray-600 pt-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">{data.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{data.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HistoryCard;
