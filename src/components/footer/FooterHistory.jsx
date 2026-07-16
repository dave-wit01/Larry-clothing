import BrandMark from "./BrandMark";
import { Link } from 'react-router-dom'

export default function FooterHistory() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-4 pb-24 flex flex-col items-center text-center">
      <BrandMark />
      <h3 className="text-lg md:text-xl text-gray-800 mb-2">History of the House....</h3>
      <Link to="/" className="text-sm md:text-base underline underline-offset-4 hover:text-gray-600 transition-colors">
        Explore
      </Link>
    </div>
  );
}