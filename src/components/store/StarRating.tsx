
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
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

export default StarRating;
