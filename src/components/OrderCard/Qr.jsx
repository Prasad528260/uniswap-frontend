import React from 'react';
import {  User, ShoppingBag } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import QrCode from 'react-qr-code';
const Qr = () => {
  const {order} = useLocation().state;
  const value = order._id;
  // console.log(order);
  

  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="text-indigo-400 mr-2" size={28} />
            <h1 className="text-2xl font-bold text-white">Order Scanner</h1>
          </div>
          <p className="text-gray-400">Scan to complete your order</p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/80 rounded-3xl shadow-xl p-8 backdrop-blur-sm border border-gray-700/50">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <img
                src={order.sellerId?.profilePicture}
                alt={`${order.sellerId.firstName} ${order.sellerId.lastName}`}
                className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-indigo-500/30"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-full shadow-lg">
                <User size={16} />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-1">
              {order.sellerId.firstName} {order.sellerId.lastName}
            </h2>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
              {order.sellerId.department.charAt(0).toUpperCase() + order.sellerId.department.slice(1)} Department
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400 font-medium">Scan QR Code</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-inner mb-4">
             <QrCode value={order._id} size={200} />
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Present this QR code to complete your transaction with{' '}
              <span className="font-medium text-indigo-400">
                {order.sellerId.firstName}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Keep this screen active during the transaction</p>
        </div>
      </div>
    </div>
  );
};

export default Qr;