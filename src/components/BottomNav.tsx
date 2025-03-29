
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useToast } from './ui/use-toast';

const BottomNav: React.FC = () => {
  const { toast } = useToast();

  const handleOrdersClick = () => {
    toast({
      title: "Orders",
      description: "Viewing all orders functionality coming soon",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 shadow-md">
      <div className="max-w-md mx-auto flex justify-center">
        <button 
          className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-700 shadow-sm"
          onClick={handleOrdersClick}
        >
          <ShoppingCart size={18} />
          <span className="font-normal">Orders</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
