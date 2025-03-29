
import React from 'react';
import { ArrowLeft, Share2, PencilIcon, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from './StarRating';
import { Product } from './ProductCard';

interface StoreHeaderProps {
  userProfile: {
    name: string;
    avatarUrl: string;
  };
  storeStats: {
    followers: number;
    following: number;
    rating: number;
    reviewCount: number;
    isOpen: boolean;
  };
  handleShare: () => void;
  handleFollow: () => void;
  handleEditStore: () => void;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  userProfile,
  storeStats,
  handleShare,
  handleFollow,
  handleEditStore
}) => {
  const navigate = useNavigate();
  // This is needed to display the product count in the header
  const mockProducts: Product[] = [
    { id: 1, name: 'Organic Bananas', price: 3.99, rating: 4.5, reviewCount: 25, image: '/placeholder.svg' },
    { id: 2, name: 'Whole Grain Bread', price: 2.49, rating: 4.2, reviewCount: 18, image: '/placeholder.svg' },
    { id: 3, name: 'Fresh Milk 1L', price: 1.99, rating: 4.7, reviewCount: 32, image: '/placeholder.svg' },
    { id: 4, name: 'Eggs (Dozen)', price: 4.49, rating: 4.4, reviewCount: 15, image: '/placeholder.svg' },
    { id: 5, name: 'Chicken Breast', price: 7.99, rating: 4.3, reviewCount: 22, image: '/placeholder.svg' },
    { id: 6, name: 'Tomatoes 1kg', price: 2.29, rating: 4.1, reviewCount: 17, image: '/placeholder.svg' },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg">Store View</h1>
        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Store Header */}
      <div className="bg-white pb-4">
        <div className="h-40 bg-gray-200 relative">
          <img 
            src="/placeholder.svg" 
            alt="Store Cover" 
            className="w-full h-full object-cover"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/70 hover:bg-white"
            onClick={handleEditStore}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="px-4 relative">
          <Avatar className="h-20 w-20 border-4 border-white rounded-full absolute -top-10">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="pt-12 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium">{userProfile.name}'s Shop</h2>
                <div className="flex items-center mt-1">
                  <StarRating rating={storeStats.rating} />
                  <span className="text-sm ml-1">{storeStats.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500 ml-1">({storeStats.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <div className={`h-2 w-2 rounded-full mr-1 ${storeStats.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs">{storeStats.isOpen ? 'Open Now' : 'Closed'}</span>
                </div>
                <Button size="sm" variant="outline" onClick={handleFollow}>
                  <Heart className="h-4 w-4 mr-1" />
                  Follow
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <p className="font-medium">{storeStats.followers}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{storeStats.following}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{mockProducts.length}</p>
                <p className="text-xs text-gray-500">Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreHeader;
