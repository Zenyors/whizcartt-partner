
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ReviewCard, { Review } from './ReviewCard';

interface ReviewsTabProps {
  reviews: Review[];
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews }) => {
  return (
    <TabsContent value="reviews" className="mt-4">
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </TabsContent>
  );
};

export default ReviewsTab;
