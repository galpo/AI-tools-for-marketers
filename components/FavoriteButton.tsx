import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <SolidStarIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <StarIcon className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
};

export default FavoriteButton;

