import React from 'react'
import { useNavigate } from 'react-router';

const Book = ({book}) => {
  const navigate = useNavigate()
  // console.log(book);
  const getConditionColor = (condition) => {
    switch(condition.toLowerCase()) {
      case 'good': return 'badge-success';
      case 'fair': return 'badge-info';
      case 'poor': return 'badge-warning';
      default: return 'badge-error';
    }
  };
  const handleBookClick = (book) => {
    navigate('/book-details', { state: { book } });
  };

  return (
 <div className="min-h-screen p-8">
      <div className="max-w-sm mx-auto">
        <div className="relative group">
          {/* Subtle glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-slate-900 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-slate-700 overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-700/20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(71,85,105,0.1),transparent_50%)]"></div>
            
            {/* Book Image */}
            <div className="relative px-6 pt-6">
              <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center overflow-hidden shadow-lg border border-slate-600">
                <img 
                  src={book.bookImg}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="relative p-6">
              {/* Title and Subject */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-slate-100 capitalize leading-tight">
                  {book.title.replace('-', ' ')}
                </h2>
                <div className="px-3 py-1 bg-blue-900/60 text-blue-200 text-xs font-semibold rounded-full border border-blue-700/50">
                  {book.subject}
                </div>
              </div>
              
              {/* Author */}
              <p className="text-slate-400 mb-4">
                by <span className="font-medium text-slate-300">{book.author}</span>
              </p>
              
              {/* Semester and Condition */}
              <div className="flex justify-between items-center mb-4">
                <div className="px-3 py-2 bg-indigo-900/60 text-indigo-200 text-sm font-medium rounded-full border border-indigo-700/50">
                  <span>{book.semester} sem</span> 
                </div>
                <div className={`px-3 py-1 text-xs font-semibold rounded-full ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </div>
              </div>
              
              {/* Price */}
              <div className="text-4xl font-bold text-green-400 mb-5">
                ₹{book.price}
              </div>
              
              {/* Seller Info */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4"></div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-600 shadow-md">
                    <img 
                      src={book.sellerId.profilePicture}
                      alt={`${book.sellerId.firstName} ${book.sellerId.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-200">
                    {book.sellerId.firstName} {book.sellerId.lastName}
                  </p>
                  <p className="text-sm text-slate-400 uppercase tracking-wide">
                    {book.sellerId.department}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end mt-6">
                <button 
                  className="relative px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                  onClick={() => handleBookClick(book)}
                >
                  <span className="relative z-10">View Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book
