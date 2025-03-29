
import React, { useState } from 'react';
import { ArrowLeft, Clock, Star, Heart, Share2, ShoppingCart, CircleX, PencilIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import BottomNav from '@/components/BottomNav';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

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
  
  // This is a star rating component
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${
              i < fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : i === fullStars && hasHalfStar 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
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
      
      {/* Store Content */}
      <div className="mt-4 px-4">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-32 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover" 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-1 right-1 bg-white/70 hover:bg-white rounded-full h-6 w-6"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-medium">₹{product.price.toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <CategoryCard title="Fruits" count={2} image="/placeholder.svg" />
              <CategoryCard title="Bakery" count={1} image="/placeholder.svg" />
              <CategoryCard title="Dairy" count={2} image="/placeholder.svg" />
              <CategoryCard title="Meat" count={1} image="/placeholder.svg" />
              <CategoryCard title="Vegetables" count={1} image="/placeholder.svg" />
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            {mockReviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium">{review.user}</h3>
                      <div className="flex items-center">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <CircleX className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-2">{review.comment}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  count: number;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count, image }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs">{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Store;
