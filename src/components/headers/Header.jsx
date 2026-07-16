import { House, Menu, UserRound } from 'lucide-react';
import BrandMark from '../footer/BrandMark';

export default function Header() {
  return (
    <header className="relative h-36 w-full shrink-0 bg-white px-6 pt-6">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Open navigation" className="w-14 h-14 rounded-full bg-neutral-300 flex items-center justify-center">
          <Menu className="w-8 h-8 text-black" strokeWidth={1.5} />
        </button>
        <a href="#" aria-label="Home" className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
          <House className="w-6 h-6 text-white fill-white" strokeWidth={2.5} />
        </a>
      </div>
      <div className="absolute top-11 left-1/2 -translate-x-1/2 scale-110 origin-top">
        <BrandMark />
      </div>
      <button type="button" aria-label="Account" className="absolute top-9 right-8">
        <UserRound className="w-8 h-8 text-black fill-black" strokeWidth={1.5} />
      </button>
    </header>
  );
}
