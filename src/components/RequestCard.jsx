import React from 'react';
import { Clock, MapPin, BookOpen, ArrowRight, User } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const RequestCard = ({ request }) => {
  if (!request) return null;
  // console.log('Request data:', request);
  
  const receiver = request.recieverId || {};
  const product = request.productId || {};

  const handleRequest=async(status)=>{
   try{
    const res = await axios.put(BASE_URL+`/request/${status}/${request._id}`,{},{withCredentials:true})
    // console.log(res);
    toast.success("Request updated successfully");
   }catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to update request");
   }
  }
  

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl shadow-xl bg-gray-800 border border-gray-700 transition-all duration-300 hover:shadow-2xl overflow-hidden">
      {/* Header with Location and Status */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300 capitalize">
              {request.location || 'Location not specified'}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            request.status === 'accepted' ? 'bg-green-900/30 text-green-300 border-green-600' :
            request.status === 'declined' ? 'bg-red-900/30 text-red-300 border-red-600' :
            'bg-yellow-900/30 text-yellow-300 border-yellow-600'
          }`}>
            {request.status || 'pending'}
          </span>
        </div>
      </div>

      {/* Book Information */}
      <div className="p-4">
        <div className="flex space-x-4">
          {/* Book Image */}
          <div className="flex-shrink-0">
            <div className="w-28 h-36 rounded-lg overflow-hidden bg-gray-700">
              <img
                src={product.bookImg ? `${BASE_URL}/uploads/${product.bookImg}` : ''}
                alt={product.title || 'Book Cover'}
                className="w-full h-full object-cover"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white">
                  {request.productId?.title 
                    ? request.productId.title.replace(/-/g, ' ')
                    : 'Untitled Book'}
                </h3>
                <p className="text-sm mt-1 text-gray-400">
                  {request.productId?.author 
                    ? `by ${request.productId.author}` 
                    : 'Author not specified'}
                </p>
              </div>
              <BookOpen className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Requester Information */}
      <div className="p-5 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-28 h-36 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
              {request.recieverId?.profilePicture ? (
                <img
                  src={receiver.profilePicture}
                  alt={`${receiver.firstName || ''} ${receiver.lastName || ''}`.trim() || 'User'}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-600 text-gray-400">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            <div>
              <div className="font-medium text-sm text-gray-200">
                {receiver.firstName} {receiver.lastName}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400">
                {receiver.department || 'N/A'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="px-4 py-3 border-t border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400">
            {request.time || 'Time not specified'}
          </span>
        </div>
        
        {request.status === 'pending' && (
          <div className="flex space-x-2">
            <button 
              className="px-5 py-2.5 text-sm font-medium rounded-lg transition-colors bg-red-900/30 text-red-300 hover:bg-red-900/50 border border-red-800 flex items-center justify-center min-w-[100px]"
              onClick={()=>handleRequest("rejected")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Reject
            </button>
            <button 
              className="px-5 py-2.5 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
              onClick={()=>handleRequest("accepted")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;