
import React from 'react';
import { CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StarRating from './StarRating';

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
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
  );
};

export default ReviewCard;
