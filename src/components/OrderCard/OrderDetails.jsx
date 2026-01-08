import React from 'react'
import { useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Package, User } from 'lucide-react';


const OrderDetails = () =>  {

    const location = useLocation();
    const { order } = location.state || {};
    console.log(order);

  if (!order) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Enhanced Header with Gradient */}
      <div className="navbar bg-gray-900/90 backdrop-blur-md shadow-2xl sticky top-0 z-20 border-b border-gray-700/50">
        <div className="navbar-center">
          <a className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Book Details
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Main Content with Dark Glass Effect */}
        <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-gray-700/30 transition-all hover:shadow-3xl hover:scale-[1.01] duration-500">
          <div className="grid lg:grid-cols-5 gap-8 p-8">
            {/* Enhanced Left Column - Image */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <figure className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={order.productId.bookImg}
                    alt={order.productId.title}
                    className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                  />
                </figure>
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Available
                </div>
              </div>
            </div>

            {/* Enhanced Right Column - Core Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* Title, Author, Price, and Tags */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                    {order.productId.title?.replace("-", " ")}
                  </h1>
                  <p className="text-2xl text-gray-300 font-light">
                    by <span className="font-semibold text-gray-200">{order.productId.author}</span>
                  </p>
                </div>

                {/* Price with Enhanced Styling */}
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      ₹{order.productId.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">₹{Math.round(order.productId.price * 1.4)}</span>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg">
                    {order.productId.subject}
                  </div>
                </div>

                {/* Enhanced Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-blue-300 rounded-full border border-gray-600 font-medium text-base">
                    📚 {order.productId.semester} semester
                  </div>
                  <div className={`px-4 py-2  rounded-full font-medium text-base shadow-md`}>
                    ✨ {order.productId.condition}
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full border border-gray-600 font-medium text-base">
                    📖 {order.productId.category}
                  </div>
                </div>
              </div>

              {/* Enhanced Action Button */}
            
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="bg-gradient-to-r from-gray-800/70 to-slate-800/70 border-t border-gray-700/50 p-8 space-y-8">
            {/* Book Information */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <span>Book Information</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-700/70 rounded-xl border border-gray-600/50 shadow-sm">
                  <div className="p-2 bg-blue-900/50 rounded-lg">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm font-medium">Author</span>
                    <p className="font-semibold text-gray-100">{order.productId.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-700/70 rounded-xl border border-gray-600/50 shadow-sm">
                  <div className="p-2 bg-purple-900/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm font-medium">Semester</span>
                    <p className="font-semibold text-gray-100">{order.productId.semester}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-700/70 rounded-xl border border-gray-600/50 shadow-sm">
                  <div className="p-2 bg-green-900/50 rounded-lg">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm font-medium">Condition</span>
                    <p className="font-semibold text-gray-100">{order.productId.condition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Seller Information */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <User className="w-7 h-7 text-white" />
                </div>
                <span>Seller Information</span>
              </h2>
              <div className="flex items-center gap-6 p-6 bg-gray-700/70 rounded-2xl border border-gray-600/50 shadow-lg">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-gradient-to-r from-blue-400 to-purple-400 ring-offset-4 ring-offset-gray-800 shadow-xl">
                    <img
                      src={order.sellerId?.profilePicture}
                      alt={`${order.sellerId?.firstName} ${order.sellerId?.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    {order.sellerId?.firstName} {order.sellerId?.lastName}
                  </h3>
                  <p className="text-gray-300 font-medium text-lg">
                    🎓 {order.sellerId?.department} Department
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                <span className="text-4xl">📝</span>
                <span>Description</span>
              </h2>
              <div className="p-6 bg-gray-700/70 rounded-2xl border border-gray-600/50 shadow-lg">
                <p className="text-lg leading-relaxed text-gray-200 font-medium">
                  {order.productId.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails
