import { useState } from 'react';
import { CreationsMenu } from '../CreationsMenu';
import { useNavigation } from '../../context/NavigationContext';
import BrandMark from './BrandMark';

const categoryTargets = {
  'Casual wear': 'casual',
  'Office wear': 'office',
  'Suit wear': 'suit',
  'Street wear': 'street',
  Jersey: 'jersey',
  'Traditional Outfit': 'traditional',
  Underwear: 'underwear',
  Socks: 'socks',
};

export default function FooterHistory() {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const navigate = useNavigation();

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 pt-4 pb-24 flex flex-col items-center text-center">
        <BrandMark />
        <h3 className="text-lg md:text-xl text-gray-800 mb-2">
          iconic Minimalism. Effortless lewdness.
        </h3>
        <button
          type="button"
          className="text-sm md:text-base underline underline-offset-4 hover:text-gray-600 transition-colors"
          onClick={() => setIsCollectionOpen(true)}
        >
          Explore
        </button>
      </div>
      <CreationsMenu
        isOpen={isCollectionOpen}
        onClose={() => setIsCollectionOpen(false)}
        onNavigate={(category) => {
          navigate?.(categoryTargets[category]);
          setIsCollectionOpen(false);
        }}
      />
    </>
  );
}
