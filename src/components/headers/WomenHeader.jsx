import { Menu, Search, User } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function WomenHeader() {
  return (
    <header className="w-full flex items-center justify-between px-6 md:px-10 py-5">
      <div className="flex items-center gap-5 md:gap-6">
        <button type="button" aria-label="Open navigation"><Menu className="w-6 h-6 md:w-7 md:h-7 cursor-pointer" strokeWidth={1.5} /></button>
        <button type="button" aria-label="Search"><Search className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" strokeWidth={1.5} /></button>
      </div>
      <img src={logo} alt="Larry logo" className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover" />
      <button type="button" aria-label="Account"><User className="w-6 h-6 md:w-7 md:h-7 cursor-pointer" strokeWidth={1.5} /></button>
    </header>
  );
}
