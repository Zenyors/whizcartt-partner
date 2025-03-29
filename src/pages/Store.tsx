
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import BottomNav from '@/components/BottomNav';
import StoreHeader from '@/components/store/StoreHeader';
import ProductsTab from '@/components/store/ProductsTab';
import CategoriesTab from '@/components/store/CategoriesTab';
import ReviewsTab from '@/components/store/ReviewsTab';
import { Product } from '@/components/store/ProductCard';
import { Review } from '@/components/store/ReviewCard';

const mockProducts: Product[] = [
  { id: 1, name: 'Organic Bananas', price: 3.99, rating: 4.5, reviewCount: 25, image: '/placeholder.svg' },
  { id: 2, name: 'Whole Grain Bread', price: 2.49, rating: 4.2, reviewCount: 18, image: '/placeholder.svg' },
  { id: 3, name: 'Fresh Milk 1L', price: 1.99, rating: 4.7, reviewCount: 32, image: '/placeholder.svg' },
  { id: 4, name: 'Eggs (Dozen)', price: 4.49, rating: 4.4, reviewCount: 15, image: '/placeholder.svg' },
  { id: 5, name: 'Chicken Breast', price: 7.99, rating: 4.3, reviewCount: 22, image: '/placeholder.svg' },
  { id: 6, name: 'Tomatoes 1kg', price: 2.29, rating: 4.1, reviewCount: 17, image: '/placeholder.svg' },
];

const mockReviews: Review[] = [
  { id: 1, user: 'Alice Johnson', rating: 5, comment: 'Great products and quick delivery. Will order again!', date: '2023-05-15' },
  { id: 2, user: 'Bob Smith', rating: 4, comment: 'Good quality items, but delivery was a bit delayed.', date: '2023-05-10' },
  { id: 3, user: 'Carol Davis', rating: 5, comment: 'Excellent service and fresh products. Highly recommended.', date: '2023-05-08' },
  { id: 4, user: 'David Wilson', rating: 3, comment: 'Products were okay, but some items were missing from my order.', date: '2023-05-05' },
];

const Store: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useUser();
  const [storeStats] = useState({
    followers: 245,
    following: 18,
    rating: 4.3,
    reviewCount: 87,
    isOpen: true
  });
  
  const handleShare = () => {
    toast({
      title: "Share Store",
      description: "Store link copied to clipboard",
    });
  };
  
  const handleFollow = () => {
    toast({
      title: "Follow Store",
      description: "This feature will be available soon",
    });
  };
  
  const handleEditStore = () => {
    toast({
      title: "Edit Store",
      description: "This feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <StoreHeader 
        userProfile={userProfile}
        storeStats={{...storeStats, followers: storeStats.followers, following: storeStats.following}}
        handleShare={handleShare}
        handleFollow={handleFollow}
        handleEditStore={handleEditStore}
      />
      
      {/* Store Content */}
      <div className="mt-4 px-4">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <ProductsTab products={mockProducts} />
          <CategoriesTab />
          <ReviewsTab reviews={mockReviews} />
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Store;
