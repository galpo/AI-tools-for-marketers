import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    onSubmit(newRating, comment);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    if (rating > 0) {
      onSubmit(rating, newComment);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add your review comments here..."
        ></textarea>
      </div>
    </div>
  );
};

export default ReviewForm;
