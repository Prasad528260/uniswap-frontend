
import { BookOpen, DollarSign } from 'lucide-react';
import {Link, Links} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state)=>state.user)
  // console.log(user)
  return (
     <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">College Book Marketplace</h1>

      {/* Two Cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Buy Books Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 cursor-pointer">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Buy </h2>
            <Link to='/get-books'>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Browse Books/Notes
            </button>
            </Link>
          </div>
        </div>

        {/* Sell Books Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-green-500 transition-all duration-300 cursor-pointer">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Sell </h2>
            <Link  to='/sell'  >
            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              List Your Books/Notes
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
