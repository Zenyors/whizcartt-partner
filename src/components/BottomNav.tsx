
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 shadow-md">
      <div className="max-w-md mx-auto flex justify-center">
        <Link 
          to="/orders"
          className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-700 shadow-sm"
        >
          <ShoppingCart size={18} />
          <span className="font-normal">Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
